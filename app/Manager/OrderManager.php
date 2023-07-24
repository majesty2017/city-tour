<?php

namespace App\Manager;

use App\Models\Product;
use Carbon\Carbon;

class OrderManager
{
    private const ORDER__PREFIX = 'WLI';

    /**
     * @param int $min
     * @param int $max
     * @return string
     */
    public static function generateOrderNumber(int $min = 100000, int $max = 999999): string
    {
        return self::ORDER__PREFIX . mt_rand($min, $max);
    }

    public static function handle_order_data(array $input)
    {
        $quantity = 0;
        $sub_total = 0;
        $discount = 0;
        $total = 0;
        $order_details = [];

        if ($input['carts']) {
            foreach ($input['carts'] as $key => $cart) {
                $product = (new Product())->getProductById($key);
                if ($product && $product->stock >= $cart['quantity']) {
                    $price = PriceManager::calculate_selling_price(
                        $product->price,
                        $product->discount_percent,
                        $product->discount_fixed,
                        $product->discount_start,
                        $product->discount_end);
                    $discount += $price['discount'] * $cart['quantity'];
                    $quantity += $cart['quantity'];
                    $sub_total += $product->price * $cart['quantity'];
                    $total += $price['price'] * $cart['quantity'];
                    $product_data['stock'] = $product->stock - $cart['quantity'];
                    $product->update($product_data);
                    $product->quantity = $cart['quantity'];
                    $order_details[] = $product;
                } else {
                    info('PRODUCT_OUT_OF_STOCK',);
                    return ['error_description' => $product->name . ' out of stock', ['product' => $product, 'cart' => $cart]];
                }
            }
        }

        return [
            'quantity'      => $quantity,
            'sub_total'     => $sub_total,
            'discount'      => $discount,
            'total'         => $total,
            'order_details' => $order_details
        ];
    }

    public static function decidePaymentStatus(int $amount, int $paid_amount)
    {
        if ($amount <= $paid_amount)
            $payment_status = 1;
        elseif ($paid_amount <= 0)
            $payment_status = 3;
        else
            $payment_status = 2;
        return $payment_status;
    }
}
