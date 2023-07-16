<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpdateShopResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'company_name' => $this->company_name,
            'address' => $this->address,
            'phone'     => $this->phone,
            'email' => $this->email,
            'status' => $this->status,
            'logo_preview' => ImageManager::prepareImageUrl(Shop::IMAGE_THUMB_PATH, $this->logo),
        ];
    }
}
