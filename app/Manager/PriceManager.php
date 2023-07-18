<?php

namespace App\Manager;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;

class PriceManager
{
    public const CURRENCY = 'GHS';
    public const CURRENCY_SYMBOL = '₵';

    public static function calculate_selling_price(
        int         $price,
        int         $discount_percent,
        int         $discount_fixed,
        string|null $discount_start = null,
        string|null $discount_end = null)
    {
        $discount = 0;

        if (!empty($discount_start) && !empty($discount_end)) {
            if (Carbon::now()->isBetween(Carbon::create($discount_start), Carbon::create($discount_end))) {
                return self::calculate($price, $discount_percent, $discount_fixed);
            }
        }
        return ['price' => $price, 'discount' => $discount, 'currency' => self::CURRENCY];
    }


    /**
     * @param int $price
     * @param int $discount_percent
     * @param int $discount_fixed
     * @return array
     */
    private static function calculate(int $price, int $discount_percent, int $discount_fixed): array
    {
        $discount = 0;
        if ($discount_percent) {
            $discount = ($price * $discount_percent) / 100;
        }

        if ($discount_fixed) {
            $discount += $discount_fixed;
        }

        return ['price' => $price - $discount, 'discount' => $discount, 'currency' => self::CURRENCY];
    }
}
