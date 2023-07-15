<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Http\Resources\UpdateAttributeResource;
use App\Models\Attribute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AttributeController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    final public function index(): AnonymousResourceCollection
    {
        return AttributeResource::collection((new Attribute())->getAttributeList());
    }

    /**
     * @return JsonResponse
     */
    final public function get_attribute_list(): JsonResponse
    {
        return response()->json((new Attribute())->getAttributeIdAndName());
    }

    /**
     * @param StoreAttributeRequest $request
     * @return JsonResponse
     */
    final public function store(StoreAttributeRequest $request): JsonResponse
    {
        $request['user_id'] = auth()->id();
        Attribute::create($request->all());
        return response()->json(['message' => 'Attribute saved successfully']);
    }

    /**
     * @param Attribute $productAttribute
     * @return UpdateAttributeResource
     */
    final public function show(Attribute $productAttribute): UpdateAttributeResource
    {
        return new UpdateAttributeResource($productAttribute);
    }

    /**
     * @param UpdateAttributeRequest $request
     * @param Attribute $productAttribute
     * @return JsonResponse
     */
    final public function update(UpdateAttributeRequest $request, Attribute $productAttribute): JsonResponse
    {
        $request['user_id'] = auth()->id();
        $productAttribute->update($request->all());
        return response()->json(['message' => 'Changes saved successfully']);
    }

    /**
     * @param Attribute $productAttribute
     * @return JsonResponse
     */
    final public function destroy(Attribute $productAttribute): JsonResponse
    {
        $productAttribute->delete();
        return response()->json(['message' => 'Attribute deleted successfully!']);
    }
}
