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
            'id'                  => $this->id,
            'name'                => $this->name,
            'email'               => $this->email,
            'group'               => $this->group,
            'phone'               => $this->phone,
            'region'              => $this->region,
            'city'                => $this->city,
            'address'             => $this->address,
            'nationality_status'  => $this->nationality_status,
            'passport_id'         => $this->passport_id,
            'next_place_of_visit' => $this->next_place_of_visit,
            'designation'         => $this->designation,
            'gender'              => $this->gender,
            'nid_number'          => $this->nid_number,
            'status'              => $this->status,
            'photo'               => ImageManager::prepareImageUrl(User::SALESMANAGER_IMAGE_THUMB_PATH, $this->photo),
        ];
    }
}
