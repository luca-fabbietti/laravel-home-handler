<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ListModelResource;
use App\Models\ListModel;
use Illuminate\Http\Request;

class ListModelController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ListModelResource::collection(ListModel::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30|unique:lists,name',
            'description' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
        ]);

        $list = ListModel::create($validated);

        return new ListModelResource($list);
    }

    /**
     * Display the specified resource.
     */
    public function show(ListModel $list)
    {
        return new ListModelResource($list);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ListModel $list)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30|unique:lists,name',
            'description' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
        ]);

        $list->update($validated);

        return new ListModelResource($list);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ListModel $list)
    {
        $list->delete();
        return response()->noContent();
    }
}
