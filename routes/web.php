<?php

use App\Http\Controllers\Api\V1\ListModelController;
use App\Http\Controllers\Api\V1\ListRowController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Resources\ListModelResource;
use App\Http\Resources\ListRowResource;
use App\Models\ListModel;
use App\Models\ListRow;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $listsPaginated = ListModel::where('created_by', auth()->id())
            ->with(['rows' => function ($query) {
                $query->select('id', 'list_id', 'product_id', 'qty_value', 'qty_uom', 'completed')
                    ->orderBy('completed', 'asc');
            }, 'rows.product' => function ($query) {
                $query->select('id', 'name', 'description');
            }])
            ->select('id', 'name', 'description')
            ->paginate();

        return Inertia::render('dashboard',
            [
                'lists' => ListModelResource::collection($listsPaginated),
            ]);
    })->name('dashboard');

    Route::get('list/{list_id}', function ($list_id) {
        if (! is_numeric($list_id)) {
            abort(422, 'Invalid list ID');
        }
        $list = ListModel::where('id', $list_id)
            ->first();
        if (! $list) {
            abort(404, 'List not found');
        }
        if ($list->created_by !== auth()->id()) {
            abort(403, 'Unauthorized access to this list');
        }
        $listRows = ListRow::where('list_id', $list->id)
            ->with(['product' => function ($query) {
                $query->select('id', 'name');
            }])->get();

        return Inertia::render('list/index', [
            'list' => ListModelResource::make($list),
            'listRows' => ListRowResource::collection($listRows),
        ]);

    })->name('list.index');
});

Route::prefix('api/v1')->middleware(['auth', 'verified'])->group(function () {
    Route::apiResources([
        'lists' => ListModelController::class,
        'products' => ProductController::class,
    ]);
    Route::prefix('lists/{list_id}/rows')->group(function () {
        Route::get('/', [ListRowController::class, 'index']);
        Route::post('/', [ListRowController::class, 'store']);
        Route::put('/{row_id}', [ListRowController::class, 'update']);
        Route::delete('/{row_id}', [ListRowController::class, 'destroy']);
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
