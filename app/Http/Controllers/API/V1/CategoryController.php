<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\EditCategoryResource;
use App\Manager\ImageManager;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    final public function index(Request $request): AnonymousResourceCollection
    {
        $categories = (new Category())->categories($request->all());
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreCategoryRequest $request
     * @return JsonResponse
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $request->except('photo');
        $category['user_id'] = auth()->id();
        if($request->has('photo')) {
            $category['photo'] = $this->processImageUpload($request->input('photo'), Str::random());
        }
        (new Category())->storeCategory($category);
        return response()->json(['message' => 'Category saved successfully!']);
    }

    /**
     * @param Category $category
     * @return EditCategoryResource
     */
    final public function show(Category $category): EditCategoryResource
    {
        return new EditCategoryResource($category);
    }

    /**
     * @param UpdateCategoryRequest $request
     * @param Category $category
     * @return JsonResponse
     */
    final public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $category_data = $request->except('photo');

        if($request->has('photo')) {
            $category_data['photo'] = $this->processImageUpload($request->photo, Str::random(32), $category->photo);
        }
        $category->update($category_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    final public function get_category_list()
    {
        return response()->json((new Category())->getCategoryIdAndName());
    }

    /**
     * @param Category $category
     * @return JsonResponse
     */
    final public function destroy(Category $category): JsonResponse
    {
        if (!empty($category->photo)) {
            ImageManager::deletePhoto(Category::IMAGE_PATH, $category->photo);
            ImageManager::deletePhoto(Category::IMAGE_THUMB_PATH, $category->photo);
        }
        $category->delete();
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
        $path = Category::IMAGE_PATH;
        $path_thumb = Category::IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(Category::IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(Category::IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
