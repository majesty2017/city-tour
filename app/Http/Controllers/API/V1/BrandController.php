<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\UpdateBrandResource;
use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return BrandResource::collection((new Brand())->brands($request->all()));
    }

    /**
     * @return JsonResponse
     */
    final public function get_brand_list(): JsonResponse
    {
        return response()->json((new Brand())->getBrandIdAndName());
    }

    /**
     * @param StoreBrandRequest $request
     * @return JsonResponse
     */
    final public function store(StoreBrandRequest $request): JsonResponse
    {
        $brand = $request->except('logo');
        $brand['user_id'] = auth()->id();
        if($request->has('logo')) {
            $brand['logo'] = $this->processImageUpload($request->input('logo'), Str::random());
        }
        (new Brand())->storeBrand($brand);
        return response()->json(['message' => 'Brand saved successfully!']);
    }

    /**
     * @param Brand $brand
     * @return UpdateBrandResource
     */
    final public function show(Brand $brand): UpdateBrandResource
    {
        return new UpdateBrandResource($brand);
    }

    /**
     * @param UpdateBrandRequest $request
     * @param Brand $brand
     * @return JsonResponse
     */
    final public function update(UpdateBrandRequest $request, Brand $brand): JsonResponse
    {
        $brand_data = $request->except('logo');

        if($request->has('logo')) {
            $brand_data['logo'] = $this->processImageUpload($request->logo, Str::random(32), $brand->logo);
        }
        $brand->update($brand_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * @param Brand $brand
     * @return JsonResponse
     */
    final public function destroy(Brand $brand): JsonResponse
    {
        if (!empty($brand->logo)) {
            ImageManager::deletePhoto(Brand::IMAGE_PATH, $brand->logo);
            ImageManager::deletePhoto(Brand::IMAGE_THUMB_PATH, $brand->logo);
        }
        $brand->delete();
        return response()->json(['message' => 'Brand deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = Brand::IMAGE_PATH;
        $path_thumb = Brand::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(Brand::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(Brand::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
