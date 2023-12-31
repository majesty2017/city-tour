<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpdateVisitorResource extends JsonResource
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
            'status'              => $this->status == 1,
            'image'               => ImageManager::prepareImageUrl(Visitor::IMAGE_PATH, $this->image),
            'photo'               => ImageManager::prepareImageUrl(Visitor::IMAGE_THUMB_PATH, $this->photo),
            'photo_full'          => ImageManager::prepareImageUrl(Visitor::IMAGE_PATH, $this->photo),
            'nid_photo'           => ImageManager::prepareImageUrl(Visitor::IMAGE_THUMB_PATH, $this->nid_photo),
            'nid_photo_full'      => ImageManager::prepareImageUrl(Visitor::IMAGE_PATH, $this->nid_photo),
        ];
    }
}
