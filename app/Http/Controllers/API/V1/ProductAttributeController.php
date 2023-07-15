<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductAttributeRequest;
use App\Http\Requests\UpdateProductAttributeRequest;
use App\Http\Resources\ProductAttributeResource;
use App\Http\Resources\UpdateProductAttributeResource;
use App\Models\ProductAttribute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductAttributeController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    final public function index(): AnonymousResourceCollection
    {
        return ProductAttributeResource::collection((new ProductAttribute())->getAttributeList());
    }

    /**
     * @param StoreProductAttributeRequest $request
     * @return JsonResponse
     */
    final public function store(StoreProductAttributeRequest $request): JsonResponse
    {
        $request['user_id'] = auth()->id();
        ProductAttribute::create($request->all());
        return response()->json(['message' => 'Attribute saved successfully']);
    }

    /**
     * @param ProductAttribute $productAttribute
     * @return UpdateProductAttributeResource
     */
    final public function show(ProductAttribute $productAttribute): UpdateProductAttributeResource
    {
        return new UpdateProductAttributeResource($productAttribute);
    }

    /**
     * @param UpdateProductAttributeRequest $request
     * @param ProductAttribute $productAttribute
     * @return JsonResponse
     */
    final public function update(UpdateProductAttributeRequest $request, ProductAttribute $productAttribute): JsonResponse
    {
        $request['user_id'] = auth()->id();
        $productAttribute->update($request->all());
        return response()->json(['message' => 'Changes saved successfully']);
    }

    /**
     * @param ProductAttribute $productAttribute
     * @return JsonResponse
     */
    final public function destroy(ProductAttribute $productAttribute): JsonResponse
    {
        $productAttribute->delete();
        return response()->json(['message' => 'Attribute deleted successfully!']);
    }
}
