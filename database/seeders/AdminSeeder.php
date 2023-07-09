<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => env('EMAIL'),
            'is_superadmin' => env('SUPERADMIN'),
            'is_visitor' => env('VISITOR'),
            'password' => bcrypt(env('PASSWORD')),
            'email_verified_at' => now(),
        ]);
    }
}
