<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListModelResource;
use App\Models\ListModel;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
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
    }
}
