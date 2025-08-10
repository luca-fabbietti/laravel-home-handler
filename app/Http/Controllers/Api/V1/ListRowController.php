<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\ListRowRequest;
use App\Http\Resources\ListRowResource;
use App\Models\ListModel;
use App\Models\ListRow;

class ListRowController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $list_id)
    {
        request()->validate([
            'created_by' => 'sometimes|integer|exists:users,id',
        ]);

        $list = ListModel::findOrFail($list_id);

        if ($list->createdBy->id !== auth()->id()) {
            return response()->json([
                'error' => 'Unauthorized access to this list.'
            ], 403);
        }

        $listRows = ListRow::with('product')
            ->where('list_id', $list_id)
            ->get();

        return ListRowResource::collection($listRows);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(int $list_id)
    {
        $validated = request()->validate([
            'product_id' => 'required|integer|exists:products,id',
            'qty_value' => 'required|string',
            'qty_uom' => 'required|string',
        ]);

        $list = ListModel::findOrFail($list_id);

        if ($list->createdBy->id !== auth()->id()) {
            return response()->json([
                'error' => 'Unauthorized access to this list.'
            ], 403);
        }

        $listRow = ListRow::create([...$validated, 'list_id' => $list_id, 'created_by' => auth()->id()]);
        return ListRowResource::make($listRow);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ListRowRequest $request)
    {
        ListRow::where('id', $request->row_id)->update($request->validated());
        return back()->with('success', 'Row successfully edited.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ListRowRequest $request)
    {
        ListRow::where('list_id', $request->list_id)
            ->where('id', $request->row_id)
            ->delete();
        return back()->with('success', 'Row successfully deleted.');
    }
}
