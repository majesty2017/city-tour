<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\UpdateAttributeValueRequest;
use App\Models\AttributeValue;
use Illuminate\Http\JsonResponse;

class AttributeValueController extends Controller
{

    /**
     * @param StoreAttributeValueRequest $request
     * @return JsonResponse
     */
    final public function store(StoreAttributeValueRequest $request): JsonResponse
    {
        $request['user_id'] = auth()->id();
        AttributeValue::create($request->all());
        return response()->json(['message' => 'Value saved successfully']);
    }

    /**
     * @param UpdateAttributeValueRequest $request
     * @param AttributeValue $value
     * @return JsonResponse
     */
    final public function update(UpdateAttributeValueRequest $request, AttributeValue $value): JsonResponse
    {
        $request['user_id'] = auth()->id();
        $value->update($request->all());
        return response()->json(['message' => 'Changes saved successfully']);
    }

    /**
     * @param AttributeValue $value
     * @return JsonResponse
     */
    final public function destroy(AttributeValue $value): JsonResponse
    {
        $value->delete();
        return response()->json(['message' => 'Value deleted successfully!']);
    }
}
