<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductPhotoRequest;
use App\Http\Requests\UpdateProductPhotoRequest;
use App\Manager\ImageManager;
use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * @param StoreProductPhotoRequest $request
     * @param int $id
     * @return JsonResponse
     */
    final public function store(StoreProductPhotoRequest $request, int $id): JsonResponse
    {
        if ($request->has('photos')) {
            $product = (new Product())->getProductById($id);
            if ($product) {
                foreach ($request->photos as $photo) {
                    $name = Str::random(32);
                    $photo_data['product_id'] = $id;
                    $photo_data['is_primary'] = $photo['is_primary'];
                    $photo_data['photo'] = $this->processImageUpload($photo['photo'], $name);
                    (new ProductPhoto())->storeProductPhoto($photo_data);
                }
            }
        }
        return response()->json(['message' => 'Photo uploaded successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductPhotoRequest $request, ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = ProductPhoto::IMAGE_PATH;
        $path_thumb = ProductPhoto::IMAGE_THUMB_PATH;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(ProductPhoto::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(ProductPhoto::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, ProductPhoto::IMAGE_WIDTH, ProductPhoto::IMAGE_HEIGHT, $path, $file);
        ImageManager::uploadImage($name, ProductPhoto::IMAGE_THUMB_WIDTH, ProductPhoto::IMAGE_THUMB_HEIGHT, $path_thumb, $file);
        return $filename;
    }
}
