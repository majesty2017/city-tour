<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpdateUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'email'      => $this->email,
            'phone'      => $this->phone,
            'address'    => $this->address,
            'gender'     => $this->gender,
            'nid_number' => $this->nid_number,
            'status'     => $this->status,
            'photo'      => ImageManager::prepareImageUrl(User::USER_IMAGE_THUMB_PATH, $this->photo),
            'nid_photo'  => ImageManager::prepareImageUrl(User::USER_IMAGE_THUMB_PATH, $this->nid_photo),
        ];
    }
}
