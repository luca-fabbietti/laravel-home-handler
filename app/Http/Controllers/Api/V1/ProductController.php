<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30|unique:products,name',
            'description' => 'nullable|string',
            'created_by' => 'required|integer|exists:users,id',
        ]);

        $product = Product::create($validated);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30|unique:products,name',
            'description' => 'nullable|string',
            'created_by' => 'required|integer|exists:users,id',
        ]);

        $product->update($validated);

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }

    /**
     * Return products based on its searched name.
     */
    public function searchByName(Request $request)
    {
        $searchTerm = $request->name;

        if (!$searchTerm) {
            return response()->json(['error' => 'Name query parameter is required'], 400);
        }

        $products = Product::whereFullText('name', $searchTerm)->get();

        return ProductResource::collection($products);
    }


}
