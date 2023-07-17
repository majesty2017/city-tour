<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleManagerRequest;
use App\Http\Requests\UpdateSaleManagerRequest;
use App\Http\Resources\SaleManagerResource;
use App\Http\Resources\UpdateSaleManagerResource;
use App\Manager\ImageManager;
use App\Models\SaleManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class SaleManagerController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request): AnonymousResourceCollection
    {
        return SaleManagerResource::collection((new SaleManager())->salesManager($request->all()));
    }

    /**
     * @return JsonResponse
     */
    final public function get_sale_manager_list(): JsonResponse
    {
        return response()->json((new SaleManager())->getSaleManagerIdAndName());
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
            $sales_manager['photo'] = $this->processImageUpload($request->input('photo'), Str::random().'-photo');
        }
        if($request->has('nid_photo')) {
            $sales_manager['nid_photo'] = $this->processImageUpload($request->input('nid_photo'), Str::random().'-nid_photo');
        }
        (new SaleManager())->storeSalesManager($sales_manager);
        return response()->json(['message' => 'Sales manager saved successfully!']);
    }

    /**
     * @param SaleManager $sales_manager
     * @return UpdateSaleManagerResource
     */
    final public function show(SaleManager $sales_manager): UpdateSaleManagerResource
    {
        return new UpdateSaleManagerResource($sales_manager);
    }

    /**
     * @param UpdateSaleManagerRequest $request
     * @param SaleManager $sales_manager
     * @return JsonResponse
     */
    final public function update(UpdateSaleManagerRequest $request, SaleManager $sales_manager): JsonResponse
    {
        $sales_manager__data = $request->except(['photo', 'nid_photo']);
        $sales_manager__data['user_id'] = auth()->id();
        if($request->has('photo')) {
            $sales_manager__data['photo'] = $this->processImageUpload($request->input('photo'), Str::random().'-photo');
        }
        if($request->has('nid_photo')) {
            $sales_manager__data['nid_photo'] = $this->processImageUpload($request->input('nid_photo'), Str::random().'-nid_photo');
        }
        $sales_manager->update($sales_manager__data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * @param SaleManager $sales_manager
     * @return JsonResponse
     */
    final public function destroy(SaleManager $sales_manager): JsonResponse
    {
        if (!empty($sales_manager->photo)) {
            ImageManager::deletePhoto(SaleManager::IMAGE_PATH, $sales_manager->photo);
            ImageManager::deletePhoto(SaleManager::IMAGE_THUMB_PATH, $sales_manager->photo);
        }
        $sales_manager->delete();
        return response()->json(['message' => 'Sales manager deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = SaleManager::IMAGE_PATH;
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
        return $filename;
    }
}
