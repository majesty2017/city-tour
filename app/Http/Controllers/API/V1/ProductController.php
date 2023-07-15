<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\UpdateProductResource;
use App\Manager\ImageManager;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request): AnonymousResourceCollection
    {
        $product = (new Product())->getProducts($request->all());
        return ProductResource::collection($product);
    }

    /**
     *
     */
    final public function store(StoreProductRequest $request)
    {
        try {
            DB::beginTransaction();
            $product = (new Product())->storeProduct($request->all(), auth()->id());
            if ($request->has('attributes')) {
                (new ProductAttribute())->storeAttributeData($request->input('attributes'), $product);
            }
            DB::commit();

            return response()->json(['message' => 'Product saved successfully!']);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * @param Product $product
     * @return UpdateProductResource
     */
    final public function show(Product $product): UpdateProductResource
    {
        return new UpdateProductResource($product);
    }

    /**
     * @param UpdateProductRequest $request
     * @param Product $product
     * @return JsonResponse
     */
    final public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $product_data = $request->except('photo');

        if($request->has('photo')) {
            $product_data['photo'] = $this->processImageUpload($request->photo, Str::random(32), $product->photo);
        }
        $product->update($product_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if (!empty($product->photo)) {
            ImageManager::deletePhoto(Product::IMAGE_PATH, $product->photo);
            ImageManager::deletePhoto(Product::IMAGE_THUMB_PATH, $product->photo);
        }
        $product->delete();
        return response()->json(['message' => 'Category deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = Product::IMAGE_PATH;
        $path_thumb = Product::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(Product::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(Product::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
