<?php

use App\Http\Controllers\API\V1\AttributeController;
use App\Http\Controllers\API\V1\AttributeValueController;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\BrandController;
use App\Http\Controllers\API\V1\CategoryController;
use App\Http\Controllers\API\V1\CountryController;
use App\Http\Controllers\API\V1\ProductController;
use App\Http\Controllers\API\V1\ProductPhotoController;
use App\Http\Controllers\API\V1\SaleManagerController;
use App\Http\Controllers\API\V1\ShopController;
use App\Http\Controllers\API\V1\SubCategoryController;
use App\Http\Controllers\API\V1\SupplierController;
use App\Http\Controllers\API\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::get('/countries', [ScriptManager::class, 'getCountries']);

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('categories/list', [CategoryController::class, 'get_category_list']);
    Route::get('sub_categories/list/{category_id}', [SubCategoryController::class, 'get_sub_category_list']);
    Route::get('brands/list', [BrandController::class, 'get_brand_list']);
    Route::get('shops/list', [ShopController::class, 'get_shop_list']);
    Route::get('attributes/list', [AttributeController::class, 'get_attribute_list']);
    Route::get('suppliers/list', [SupplierController::class, 'get_supplierlist']);
    Route::post('product-photo-upload/{id}', [ProductPhotoController::class, 'store']);

    Route::apiResource('users', UserController::class);
    Route::apiResource('countries', CountryController::class);
    Route::apiResource('attributes', AttributeController::class);
    Route::apiResource('value', AttributeValueController::class);
    Route::apiResource('suppliers', SupplierController::class);
    Route::apiResource('sales-managers', SaleManagerController::class);
    Route::apiResource('brands', BrandController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('shops', ShopController::class);
    Route::apiResource('sub-categories', SubCategoryController::class);
});

Route::prefix('v1')->controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});
