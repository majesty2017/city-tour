<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpdateProductResource extends JsonResource
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
            'id'                   => $this->id,
            'name'                 => $this->name,
            'slug'                 => $this->slug,
            'description'          => $this->description,
            'serial'               => $this->serial,
            'status'               => $this->status,
            'photo_preview'        => ImageManager::prepareImageUrl(Product::IMAGE_THUMB_PATH, $this->photo),
        ];
    }
}
