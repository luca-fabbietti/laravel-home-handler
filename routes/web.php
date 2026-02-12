<?php

use App\Http\Controllers\Api\V1\ListModelApiController;
use App\Http\Controllers\Api\V1\ListRowApiController;
use App\Http\Controllers\Api\V1\ProductApiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ListModelController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('list/{list_id}', [ListModelController::class, 'index'])->name('list.index');
});

Route::prefix('api/v1')->middleware(['auth', 'verified'])->group(function () {
    Route::apiResources([
        'lists' => ListModelApiController::class,
        'products' => ProductApiController::class,
    ]);
    Route::prefix('lists/{list_id}/rows')->group(function () {
        Route::get('/', [ListRowApiController::class, 'index']);
        Route::post('/', [ListRowApiController::class, 'store']);
        Route::put('/{row_id}', [ListRowApiController::class, 'update']);
        Route::delete('/{row_id}', [ListRowApiController::class, 'destroy']);
    });
    Route::prefix('products')->group(function () {
        Route::get('/search/{name}', [ProductApiController::class, 'searchByName']);
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';