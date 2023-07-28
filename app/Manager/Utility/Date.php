<?php

namespace App\Manager\Utility;

use Carbon\Carbon;

class Date
{
    public static function calculate_discount_remaining_days($end): int
    {
        $discount_remaining_days = 0;
        if ($end != null) {
            $discount_remaining_days = Carbon::now()->diffInDays(Carbon::create($end));
        }
        return $discount_remaining_days;
    }
}
