<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * @param array $order_details
     * @param $order
     * @return void
     */
    public function storeOrderDetail(array $order_details, $order): void
    {
        foreach ($order_details as $product) {
            self::query()->create($this->prepareData($product, $order));
        }
    }

    /**
     * @param $product
     * @param $order
     * @return array
     */
    public function prepareData($product, $order): array
    {
        return [
          'order_id' => $order->id,
          'name' => $product->name,
          'brand_id' => $product->brand_id,
          'category_id' => $product->category_id,
          'sub_category_id' => $product->sub_category_id,
          'cost' => $product->cost,
          'discount_start' => $product->discount_start,
          'discount_end' => $product->discount_end,
          'discount_percent' => $product->discount_percent,
          'discount_fixed' => $product->discount_fixed,
          'price' => $product->price,
          'sku' => $product->sku,
          'supplier_id' => $product->supplier_id,
          'quantity' => $product->quantity,
          'photo' => $product->primary_photo?->photo,
        ];
    }
}
