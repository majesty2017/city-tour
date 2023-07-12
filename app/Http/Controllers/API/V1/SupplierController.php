<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Http\Resources\UpdateSubCategoryResource;
use App\Http\Resources\UpdateSupplierResource;
use App\Manager\ImageManager;
use App\Models\Supplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class SupplierController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request): AnonymousResourceCollection
    {
        return SupplierResource::collection((new Supplier())->suppliers($request->all()));
    }

    /**
     * @param StoreSupplierRequest $request
     * @return JsonResponse
     */
    final public function store(StoreSupplierRequest $request): JsonResponse
    {
        $Supplier = $request->except('logo');
        $Supplier['user_id'] = auth()->id();
        if($request->has('logo')) {
            $Supplier['logo'] = $this->processImageUpload($request->input('logo'), Str::random());
        }
        (new Supplier())->storeSupplier($Supplier);
        return response()->json(['message' => 'Supplier saved successfully!']);
    }

    /**
     * @param Supplier $supplier
     * @return UpdateSupplierResource
     */
    final public function show(Supplier $supplier): UpdateSupplierResource
    {
        return new UpdateSupplierResource($supplier);
    }

    /**
     * @param UpdateSupplierRequest $request
     * @param Supplier $supplier
     * @return JsonResponse
     */
    final public function update(UpdateSupplierRequest $request, Supplier $supplier): JsonResponse
    {
        $Supplier_data = $request->except('logo');

        if($request->has('logo')) {
            $Supplier_data['logo'] = $this->processImageUpload($request->logo, Str::random(32), $supplier->logo);
        }
        $supplier->update($Supplier_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * @param Supplier $supplier
     * @return JsonResponse
     */
    final public function destroy(Supplier $supplier): JsonResponse
    {
        if (!empty($supplier->logo)) {
            ImageManager::deletePhoto(Supplier::IMAGE_PATH, $supplier->logo);
            ImageManager::deletePhoto(Supplier::IMAGE_THUMB_PATH, $supplier->logo);
        }
        $supplier->delete();
        return response()->json(['message' => 'Supplier deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = Supplier::IMAGE_PATH;
        $path_thumb = Supplier::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(Supplier::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(Supplier::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
