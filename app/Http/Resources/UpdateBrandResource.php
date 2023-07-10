<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $slug
 * @property mixed $serial
 * @property mixed $description
 * @property mixed $status
 * @property mixed $logo
 */

class UpdateBrandResource extends JsonResource
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
            'logo_preview'         => ImageManager::prepareImageUrl(Brand::IMAGE_THUMB_PATH, $this->logo),
        ];
    }
}
