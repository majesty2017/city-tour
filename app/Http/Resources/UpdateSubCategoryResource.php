<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $photo
 * @property mixed $id
 * @property mixed $name
 * @property mixed $slug
 * @property mixed $description
 * @property mixed $serial
 * @property mixed $status
 * @property mixed $category_id
 */
class UpdateSubCategoryResource extends JsonResource
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
            'category_id'     => $this->category_id,
            'name'                 => $this->name,
            'slug'                 => $this->slug,
            'description'          => $this->description,
            'serial'               => $this->serial,
            'status'               => $this->status,
            'photo_preview'        => ImageManager::prepareImageUrl(SubCategory::IMAGE_THUMB_PATH, $this->photo),
        ];
    }
}
