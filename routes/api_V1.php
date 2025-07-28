<?php

use App\Http\Controllers\Api\V1\ListRowController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ListModelController;
use App\Http\Controllers\Api\V1\ProductController;

Route::prefix('v1')->group(function () {
    Route::apiResources([
        'lists' => ListModelController::class,
        'products' => ProductController::class,
    ]);
    Route::get('lists/{list_id}/rows', [ListRowController::class, 'index']);
    Route::post('lists/{list_id}/rows', [ListRowController::class, 'store']);
    Route::put('lists/{list_id}/rows/{row_id}', [ListRowController::class, 'update']);
    Route::delete('lists/{list_id}/rows/{row_id}', [ListRowController::class, 'destroy']);
});
