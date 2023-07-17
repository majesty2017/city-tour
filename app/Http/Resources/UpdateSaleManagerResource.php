<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SaleManager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpdateSaleManagerResource extends JsonResource
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
            'name'           => $this->name,
            'address'        => $this->address,
            'phone'          => $this->phone,
            'email'          => $this->email,
            'nid_number'     => $this->nid_number,
            'status'         => $this->status,
            'photo_preview'     => ImageManager::prepareImageUrl(SaleManager::IMAGE_PATH, $this->photo),
            'nid_photo_preview' => ImageManager::prepareImageUrl(SaleManager::IMAGE_PATH, $this->nid_photo),
            'shop_id'           => $this->shop_id,
            'password'           => '',
        ];
    }
}
