<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('client_id')->references('clients')->on('uuid')->onDelete('cascade');
            $table->foreignUuid('product_id')->references('products')->on('uuid')->onDelete('cascade');
            $table->foreignUuid('user_id')->references('users')->on('uuid')->onDelete('cascade');
            $table->foreignId('payment_method')->references('payment_methods')->on('id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
