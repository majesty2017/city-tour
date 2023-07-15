<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'slug'         => $this->slug,
            'description'  => $this->description,
            'serial'       => $this->serial,
            'status'       => $this->status == 1 ? 'Active' : 'Inactive',
            'photo'        => ImageManager::prepareImageUrl(Product::IMAGE_THUMB_PATH, $this->photo),
            'photo_full'   => ImageManager::prepareImageUrl(Product::IMAGE_PATH, $this->photo),
            'created_by'   => $this->user?->name,
            'created_at'   => $this->created_at->toDayDateTimeString(),
            'updated_at'   => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
