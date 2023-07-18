<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SaleManager;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'name'                => $this->name,
            'email'               => $this->email,
            'group'               => $this->group,
            'phone'               => $this->phone,
            'region'              => $this->region,
            'city'                => $this->city,
            'address'             => $this->address,
            'nationality_status'  => $this->nationality_status,
            'next_place_of_visit' => $this->next_place_of_visit,
            'designation'         => $this->designation,
            'gender'              => $this->gender,
            'nid_number'          => $this->nid_number,
            'status'              => $this->status == 1 ? 'Active' : 'Inactive',
            'photo'               => ImageManager::prepareImageUrl(User::USER_IMAGE_THUMB_PATH, $this->photo),
            'photo_full'          => ImageManager::prepareImageUrl(User::USER_IMAGE_PATH, $this->photo),
            'nid_photo'           => ImageManager::prepareImageUrl(User::USER_IMAGE_THUMB_PATH, $this->nid_photo),
            'nid_photo_full'      => ImageManager::prepareImageUrl(User::USER_IMAGE_PATH, $this->nid_photo),
            'created_by'          => $this->user?->name,
            'created_at'          => $this->created_at->toDayDateTimeString(),
            'updated_at'          => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
