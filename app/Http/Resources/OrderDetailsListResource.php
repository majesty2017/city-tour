<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Manager\PriceManager;
use App\Models\ProductPhoto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailsListResource extends JsonResource
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
            'photo' => ImageManager::prepareImageUrl(ProductPhoto::IMAGE_THUMB_PATH, $this->photo),
            'sku' => $this->sku,
            'quantity' => $this->quantity,
            'cost' => PriceManager::CURRENCY . $this->cost,
            'price' => PriceManager::CURRENCY . number_format($this->price),
            'selling_price'    => PriceManager::calculate_selling_price(
                $this->price,
                $this->discount_percent,
                $this->discount_fixed,
                $this->discount_start,
                $this->discount_end
            ),
            'brand' => $this->brand?->name,
            'category' => $this->category?->name,
            'sub_category' => $this->sub_category?->name,
            'order' => $this->order?->name,
            'supplier' => $this->supplier?->name,
            'discount_start' => $this->discount_start ? Carbon::create($this->discount_start)->toDayDateTimeString() : '',
            'discount_end' => $this->discount_end ? Carbon::create($this->discount_end)->toDayDateTimeString() : '',
            'discount_percent' => $this->discount_percent,
            'discount_fixed' => $this->discount_fixed,
        ];
    }
}
