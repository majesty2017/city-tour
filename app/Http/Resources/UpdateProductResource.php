<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Manager\PriceManager;
use App\Manager\Utility\Date;
use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

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
        $price_manager = PriceManager::calculate_selling_price(
            $this->price,
            $this->discount_percent,
            $this->discount_fixed,
            $this->discount_start,
            $this->discount_end
        );
        return [
            'id'                      => $this->id,
            'name'                    => $this->name,
            'slug'                    => $this->slug,
            'stock'                   => $this->stock,
            'sku'                     => $this->sku,
            'cost'                    => PriceManager::CURRENCY . $this->cost,
            'original_price'          => number_format($this->price, 2),
            'price'                   => PriceManager::CURRENCY . number_format($this->price, 2),
            'selling_price'           => $price_manager,
            'discount_start'          => $this->discount_start != null ? Carbon::create($this->discount_start)->toDayDateTimeString() : null,
            'discount_end'            => $this->discount_end != null ? Carbon::create($this->discount_end)->toDayDateTimeString() : null,
            'discount_percent'        => $this->discount_percent . '%',
            'discount_remaining_days' => Date::calculate_discount_remaining_days($this->discount_end),
            'discount_fixed'          => PriceManager::CURRENCY . $this->discount_fixed,
            'brand'                   => $this->brand?->name,
            'profit'                  => PriceManager::CURRENCY . number_format($price_manager['price'] - $this->cost, 2),
            'profit_percent'          => number_format((($price_manager['price'] - $this->cost) / $price_manager['price']) * 100, 2),
            'category'                => $this->category?->name,
            'sub_category'            => $this->sub_category?->name,
            'supplier'                => $this->supplier ? $this->supplier?->name . ' ' . $this->supplier?->phone : null,
            'description'             => $this->description,
            'status'                  => $this->status == Product::ACTIVE_STATUS ? 'Active' : 'Inactive',
            'created_by'              => $this->created_by?->name,
            'updated_by'              => $this->updated_by?->name,
            'photos'                  => ProductPhotoListResource::collection($this->photos),
            'primary_photo'           => ImageManager::prepareImageUrl(ProductPhoto::IMAGE_THUMB_PATH, $this->primary_photo?->photo),
            'attributes'              => ProductAttributeResource::collection($this->product_attribute),
            'created_at'              => $this->created_at->toDayDateTimeString(),
            'updated_at'              => $this->created_at != $this->updated_at ? $this->updated_at?->toDayDateTimeString() : 'Not updated yet'
        ];
    }
}
