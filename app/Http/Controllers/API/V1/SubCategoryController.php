<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryResource;
use App\Http\Resources\UpdateSubCategoryResource;
use App\Manager\ImageManager;
use App\Models\SubCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request): AnonymousResourceCollection
    {
        $categories = (new SubCategory())->sub_categories($request->all());
        return SubCategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreSubCategoryRequest $request
     * @return JsonResponse
     */
    final public function store(StoreSubCategoryRequest $request): JsonResponse
    {
        $category = $request->except('photo');
        $category['user_id'] = auth()->id();
        if($request->has('photo')) {
            $category['photo'] = $this->processImageUpload($request->input('photo'), Str::random());
        }
        (new SubCategory())->storeSubCategory($category);
        return response()->json(['message' => 'Sub category saved successfully!']);
    }

    /**
     * Display the specified resource.
     * @param SubCategory $subCategory
     * @return UpdateSubCategoryResource
     */
    final public function show(SubCategory $subCategory): UpdateSubCategoryResource
    {
        return new UpdateSubCategoryResource($subCategory);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateSubCategoryRequest $request
     * @param SubCategory $subCategory
     * @return JsonResponse
     */
    final public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory): JsonResponse
    {
        $category_data = $request->except('photo');

        if($request->has('photo')) {
            $category_data['photo'] = $this->processImageUpload($request->photo, Str::random(32), $subCategory->photo);
        }
        $subCategory->update($category_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     * @param SubCategory $subCategory
     * @return JsonResponse
     */
    final public function destroy(SubCategory $subCategory): JsonResponse
    {
        if (!empty($subCategory->photo)) {
            ImageManager::deletePhoto(SubCategory::IMAGE_PATH, $subCategory->photo);
            ImageManager::deletePhoto(SubCategory::IMAGE_THUMB_PATH, $subCategory->photo);
        }
        $subCategory->delete();
        return response()->json(['message' => 'Sub category deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = SubCategory::IMAGE_PATH;
        $path_thumb = SubCategory::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(SubCategory::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(SubCategory::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
