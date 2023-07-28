<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductPhotoListResource extends JsonResource
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
            'id'             => $this->id,
            'photo'          => ImageManager::prepareImageUrl(ProductPhoto::IMAGE_THUMB_PATH, $this->photo),
            'original_photo' => ImageManager::prepareImageUrl(ProductPhoto::IMAGE_PATH, $this->photo),
            'product_id'     => $this->product_id,
        ];
    }
}
