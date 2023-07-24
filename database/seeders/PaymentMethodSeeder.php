<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payment_methods = [
            [
                'name' => 'Cash',
                'status' => 1,
                'account_number' => ''
            ],
            [
                'name' => 'Mobile Money',
                'status' => 1,
                'account_number' => ''
            ],
            [
                'name' => 'Bank Transfer',
                'status' => 1,
                'account_number' => ''
            ],
        ];

        PaymentMethod::insert($payment_methods);
    }
}
