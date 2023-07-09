<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Manager\ImageManager;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    final public function index(Request $request): AnonymousResourceCollection
    {
        $categories = (new Category())->categories($request->all());
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = $request->except('photo');
        $category['user_id'] = auth()->id();
        if($request->has('photo')) {
            $file = $request->input('photo');
            $path = Category::IMAGE_PATH;
            $path_thumb = Category::IMAGE_THUMB_PATH;
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::random(32);
            $category['photo'] = ImageManager::uploadImage($name, $width, $height, $path, $file);
            ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }
        (new Category())->storeCategory($category);
        return response()->json(['message' => 'Category saved successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
