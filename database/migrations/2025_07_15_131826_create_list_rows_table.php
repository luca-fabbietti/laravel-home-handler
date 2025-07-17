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
        Schema::create('list_rows', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedBigInteger('list_id');
            $table->unsignedBigInteger('product_id');
            $table->string('qty_value')->nullable();
            // uom -> unit of measure
            $table->string('qty_uom')->nullable();
            $table->boolean('completed')->default(false);
            $table->unsignedBigInteger('created_by');

            $table->foreign('list_id')->references('id')->on('lists')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_rows');
    }
};
