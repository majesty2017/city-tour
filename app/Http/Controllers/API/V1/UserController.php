<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UpdateUserResource;
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
        return UserResource::collection((new User())->getUsers($request->all()));
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
        $user_data = $request->except(['photo', 'nid_photo']);
        if ($request->has('photo')) {
            $user_data['photo'] = $this->processImageUpload($request->input('photo'), Str::random() . '-photo');
        }
        if ($request->has('nid_photo')) {
            $user_data['nid_photo'] = $this->processImageUpload($request->input('nid_photo'), Str::random() . '-nid_photo');
        }
        (new User())->storeUser($user_data);
        return response()->json(['message' => 'User saved successfully!']);
    }

    /**
     * @return Builder|Model|null
     */
    final public function user(): Model|Builder|null
    {
        return (new User())->getAuthUser();
    }

    /**
     * @param User $user
     * @return UpdateUserResource
     */
    final public function show(User $user): UpdateUserResource
    {
        return new UpdateUserResource($user);
    }

    /**
     * @param UpdateUserRequest $request
     * @param User $user
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $user_data = $request->except(['photo', 'nid_photo']);
        $user_data['user_id'] = auth()->id();
        if ($request->password) {
            $user_data['password'] = bcrypt($request->password);
        }
        if ($request->has('photo')) {
            $user_data['photo'] = $this->processImageUpload($request->input('photo'), Str::random() . '-photo');
        }
        if ($request->has('nid_photo')) {
            $user_data['nid_photo'] = $this->processImageUpload($request->input('nid_photo'), Str::random() . '-nid_photo');
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
        return response()->json(['message' => 'User deleted successfully!']);
    }

    /**
     * @param string $file
     * @param string $name
     * @param string|null $existing_photo
     * @return string
     */
    private function processImageUpload(string $file, string $name, string|null $existing_photo = null): string
    {
        $path = User::USER_IMAGE_PATH;
        $path_thumb = User::USER_IMAGE_THUMB_PATH;
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        if (!empty($existing_photo)) {
            ImageManager::deletePhoto(User::USER_IMAGE_PATH, $existing_photo);
            ImageManager::deletePhoto(User::USER_IMAGE_THUMB_PATH, $existing_photo);
        }
        $filename = ImageManager::uploadImage($name, $width, $height, $path, $file);
        ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
        return $filename;
    }
}
