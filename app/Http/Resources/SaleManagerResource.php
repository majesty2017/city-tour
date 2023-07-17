<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SaleManager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleManagerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'name'           => $this->name,
            'address'        => $this->address,
            'phone'          => $this->phone,
            'email'          => $this->email,
            'nid_number'     => $this->nid_number,
            'status'         => $this->status == 1 ? 'Active' : 'Inactive',
            'photo'          => ImageManager::prepareImageUrl(SaleManager::IMAGE_THUMB_PATH, $this->photo),
            'photo_full'     => ImageManager::prepareImageUrl(SaleManager::IMAGE_PATH, $this->photo),
            'nid_photo'      => ImageManager::prepareImageUrl(SaleManager::IMAGE_THUMB_PATH, $this->nid_photo),
            'nid_photo_full' => ImageManager::prepareImageUrl(SaleManager::IMAGE_PATH, $this->nid_photo),
            'created_by'     => $this->user?->name,
            'shop'           => $this->shop?->name,
            'created_at'     => $this->created_at->toDayDateTimeString(),
            'updated_at'     => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
