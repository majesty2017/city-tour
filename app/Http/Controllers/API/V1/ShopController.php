<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;
use App\Http\Resources\ShopResource;
use App\Http\Resources\UpdateShopResource;
use App\Manager\ImageManager;
use App\Models\Shop;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return ShopResource::collection((new Shop())->shops($request->all()));
    }

    /**
     * @return JsonResponse
     */
    final public function get_shop_list(): JsonResponse
    {
        return response()->json((new Shop())->getShopIdAndName());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShopRequest $request)
    {
        $shop = $request->except('logo');
        $shop['user_id'] = auth()->id();
        if($request->has('logo')) {
            $shop['logo'] = $this->processImageUpload($request->input('logo'), Str::random());
        }
        (new Shop())->storeShop($shop);
        return response()->json(['message' => 'Shop saved successfully!']);
    }

    /**
     * @param Shop $shop
     * @return UpdateShopResource
     */
    final public function show(Shop $shop): UpdateShopResource
    {
        return new UpdateShopResource($shop);
    }

    /**
     * @param UpdateShopRequest $request
     * @param Shop $shop
     * @return JsonResponse
     */
    final public function update(UpdateShopRequest $request, Shop $shop): JsonResponse
    {
        $shop_data = $request->except('logo');

        if($request->has('logo')) {
            $shop_data['logo'] = $this->processImageUpload($request->logo, Str::random(32), $shop->logo);
        }
        $shop->update($shop_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    final public function destroy(Shop $shop)
    {
        if (!empty($shop->logo)) {
            ImageManager::deletePhoto(Shop::IMAGE_PATH, $shop->logo);
            ImageManager::deletePhoto(Shop::IMAGE_THUMB_PATH, $shop->logo);
        }
        $shop->delete();
        return response()->json(['message' => 'Shop deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = Shop::IMAGE_PATH;
        $path_thumb = Shop::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(Shop::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(Shop::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
