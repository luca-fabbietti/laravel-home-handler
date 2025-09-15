<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListModelResource;
use App\Http\Resources\ListRowResource;
use App\Models\ListModel;
use App\Models\ListRow;
use Inertia\Inertia;

class ListModelController extends Controller
{
    function index($list_id)
    {
        if (!is_numeric($list_id)) {
            abort(422, 'Invalid list ID');
        }
        $list = ListModel::where('id', $list_id)
            ->first();
        if (!$list) {
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
    }
}
