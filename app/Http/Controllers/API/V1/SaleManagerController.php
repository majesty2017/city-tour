<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleManagerRequest;
use App\Http\Requests\UpdateSaleManagerRequest;
use App\Http\Resources\SaleManagerResource;
use App\Http\Resources\UpdateSaleManagerResource;
use App\Manager\ImageManager;
use App\Models\SaleManager;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SaleManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return SaleManagerResource::collection((new User())->salesManager($request->all()));
    }

    /**
     * @param StoreSaleManagerRequest $request
     * @return JsonResponse
     */
    final public function store(StoreSaleManagerRequest $request): JsonResponse
    {
        $sales_manager = $request->except(['photo', 'nid_photo']);
        $sales_manager['user_id'] = auth()->id();
        if($request->has('photo')) {
            $sales_manager['photo'] = $this->processImageUpload($request->input('logo'), Str::random(32));
            $sales_manager['image'] = $this->processImageUpload($request->input('logo'), Str::random(32));
        }
        if($request->has('nid_photo')) {
            $sales_manager['nid_photo'] = $this->processImageUpload($request->input('nid_photo'), Str::random(32));
        }
        (new User())->storeSalesManager($sales_manager);
        return response()->json(['message' => 'Sales Manager saved successfully!']);
    }

    /**
     * @param User $sales_manager
     * @return UpdateSaleManagerResource
     */
    final public function show(User $sales_manager): UpdateSaleManagerResource
    {
        return new UpdateSaleManagerResource($sales_manager);
    }

    /**
     * @param UpdateSaleManagerRequest $request
     * @param User $sales_manager
     * @return JsonResponse
     */
    final public function update(UpdateSaleManagerRequest $request, User $sales_manager): JsonResponse
    {
        $sales_manager_data = $request->except(['photo', 'nid_photo']);

        if($request->has('photo')) {
            $sales_manager_data['photo'] = $this->processImageUpload($request->input('photo'), Str::random(32), $sales_manager->photo);
            $sales_manager_data['image'] = $this->processImageUpload($request->input('photo'), Str::random(32), $sales_manager->image);
        }
        if($request->has('nid_photo')) {
            $sales_manager_data['nid_photo'] = $this->processImageUpload($request->input('nid_photo'), Str::random(32), $sales_manager->nid_photo);
        }
        $sales_manager->update($sales_manager_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * @param User $sales_manager
     * @return JsonResponse
     */
    final public function destroy(User $sales_manager): JsonResponse
    {
        if (!empty($saleManager->photo)) {
            ImageManager::deletePhoto(SaleManager::IMAGE_PATH, $saleManager->photo);
            ImageManager::deletePhoto(SaleManager::IMAGE_THUMB_PATH, $saleManager->photo);
        }
        $sales_manager->delete();
        return response()->json(['message' => 'Sales Manager deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @param string|null $user_path
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null, string $user_path = null): string
    {
        $path = SaleManager::IMAGE_PATH;
        $user_path = SaleManager::IMAGE_PATH;
        $path_thumb = SaleManager::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(SaleManager::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(SaleManager::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $user_path, $file);
        return $filename;
    }
}
