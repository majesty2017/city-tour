<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitorRequest;
use App\Http\Requests\UpdateVisitorRequest;
use App\Http\Resources\UpdateVisitorResource;
use App\Http\Resources\VisitorResource;
use App\Manager\ImageManager;
use App\Models\Visitor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class VisitorController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request): AnonymousResourceCollection
    {
        return VisitorResource::collection((new Visitor())->visitors($request->all()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitorRequest $request)
    {
        $visitor = $request->except('photo');
        $visitor['user_id'] = auth()->id();
        if($request->has('photo')) {
            $visitor['photo'] = $this->processImageUpload($request->input('photo'), Str::random());
        }
        (new Visitor())->storeVisitor($visitor);
        return response()->json(['message' => 'Supplier saved successfully!']);
    }

    /**
     * @param Visitor $visitor
     * @return UpdateVisitorResource
     */
    public function show(Visitor $visitor): UpdateVisitorResource
    {
        return new UpdateVisitorResource($visitor);
    }

    /**
     * @param UpdateVisitorRequest $request
     * @param Visitor $visitor
     * @return JsonResponse
     */
    final public function update(UpdateVisitorRequest $request, Visitor $visitor): JsonResponse
    {
        $visitor_data = $request->except(['photo', 'nid_photo']);

        if($request->has('photo')) {
            $visitor_data['photo'] = $this->processImageUpload($request->photo, Str::random(32), $visitor->photo);
        }

        if($request->has('nid_photo')) {
            $visitor_data['nid_photo'] = $this->processImageUpload($request->nid_photo, Str::random(32), $visitor->nid_photo);
        }
        $visitor->update($visitor_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * @param Visitor $visitor
     * @return JsonResponse
     */
    final public function destroy(Visitor $visitor): JsonResponse
    {
        if (!empty($visitor->photo)) {
            ImageManager::deletePhoto(Visitor::IMAGE_PATH, $visitor->photo);
            ImageManager::deletePhoto(Visitor::IMAGE_THUMB_PATH, $visitor->photo);
        }

        if (!empty($visitor->nid_photo)) {
            ImageManager::deletePhoto(Visitor::IMAGE_PATH, $visitor->nid_photo);
            ImageManager::deletePhoto(Visitor::IMAGE_THUMB_PATH, $visitor->nid_photo);
        }
        $visitor->delete();
        return response()->json(['message' => 'Visitor deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = Visitor::IMAGE_PATH;
        $path_thumb = Visitor::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(Visitor::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(Visitor::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
