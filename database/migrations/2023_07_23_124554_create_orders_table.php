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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('visitor_id')->nullable();
            $table->foreignId('payment_method_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('quantity')->nullable();
            $table->integer('order_status')->nullable(1);
            $table->integer('payment_status')->nullable(1);
            $table->decimal('paid_amount')->nullable();
            $table->decimal('due_amount')->nullable();
            $table->decimal('sub_total')->nullable();
            $table->integer('discount')->nullable();
            $table->decimal('total')->nullable();
            $table->string('order_number')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
