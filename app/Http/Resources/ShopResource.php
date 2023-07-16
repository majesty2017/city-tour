<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'address'      => $this->address,
            'phone'        => $this->phone,
            'email'        => $this->email,
            'status'       => $this->status == 1 ? 'Active' : 'Inactive',
            'logo'         => ImageManager::prepareImageUrl(Shop::IMAGE_THUMB_PATH, $this->logo),
            'logo_full'    => ImageManager::prepareImageUrl(Shop::IMAGE_PATH, $this->logo),
            'created_by'   => $this->user?->name,
            'created_at'   => $this->created_at->toDayDateTimeString(),
            'updated_at'   => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
