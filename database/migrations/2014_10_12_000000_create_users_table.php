<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('shop_id')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('phone')->nullable();
            $table->string('photo')->nullable();
            $table->string('region')->nullable();
            $table->string('city')->nullable();
            $table->text('address')->nullable();
            $table->boolean('nationality_status')->default(0)->comment('0=local,1=foreign');
            $table->string('nid_number')->nullable();
            $table->string('nid_photo')->nullable();
            $table->string('next_place_of_visit')->nullable();
            $table->string('designation')->nullable();
            $table->string('gender')->nullable();
            $table->boolean('is_lead')->default(0)->comment('0=No,1=Yes');
            $table->boolean('is_visitor')->default(1)->comment('0=No,1=Yes');
            $table->boolean('is_manager')->default(0)->comment('0=No,1=Yes');
            $table->boolean('is_admin')->default(0)->comment('0=No,1=Yes');
            $table->boolean('is_superadmin')->default(0)->comment('0=No,1=Yes');
            $table->tinyInteger('status')->default(1)->comment('0=inactive,1=active');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
