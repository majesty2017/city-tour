<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Manager\ImageManager;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return UserResource::collection((new User())->salesManager($request->all()));
    }

    /**
     * @return JsonResponse
     */
    final public function get_user_list(): JsonResponse
    {
        return response()->json((new User())->getUserIdAndName());
    }

    /**
     * @param StoreUserRequest $request
     * @return JsonResponse
     */
    final public function store(StoreUserRequest $request): JsonResponse
    {
        $sales_manager = $request->except('photo');
        if ($request->has('photo')) {
            $sales_manager['photo'] = $this->processImageUpload($request->input('photo'), Str::random() . '-photo');
        }
        (new User())->storeUser($sales_manager);
        return response()->json(['message' => 'Sales manager saved successfully!']);
    }

    /**
     * @return Builder|Model|null
     */
    final public function user(): Model|Builder|null
    {
        return (new User())->getUser();
    }

    /**
     * @param User $user
     * @return UserResource
     */
    final public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    /**
     * @param UpdateUserRequest $request
     * @param User $user
     * @return JsonResponse
     */
    final public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $user_data = $request->except('photo');
        $user_data['user_id'] = auth()->id();
        if ($request->has('photo')) {
            $user_data['photo'] = $this->processImageUpload($request->input('photo'), Str::random() . '-photo');
        }
        $user->update($user_data);
        return response()->json(['message' => 'Changes saved successfully!']);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    final public function destroy(User $user): JsonResponse
    {
        if (!empty($user->photo)) {
            ImageManager::deletePhoto(User::USER_IMAGE_PATH, $user->photo);
            ImageManager::deletePhoto(User::USER_IMAGE_THUMB_PATH, $user->photo);
        }
        $user->delete();
        return response()->json(['message' => 'Sales manager deleted successfully!']);
    }
}
