<?php

use App\Models\ListModel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Resources\ListModelResource;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $listsPaginated = ListModel::where('created_by', auth()->id())
            ->with(['rows' => function($query) {
                $query->select('id', 'list_id', 'product_id', 'qty_value', 'qty_uom', 'completed')
                    ->orderBy('completed', 'asc');
            }, 'rows.product' => function($query) {
                $query->select('id', 'name', 'description');
            }])
            ->select('id', 'name', 'description')
            ->paginate();
        return Inertia::render('dashboard',
            [
                'lists' => ListModelResource::collection($listsPaginated),
            ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
