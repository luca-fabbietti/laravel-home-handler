<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListModelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'List',
            'id' => (string) $this->id,
            'attributes' => [
                'name' => $this->name,
                'description' => $this->description,
                'rows' => $this->when($request->routeIs('dashboard'), $this->rows->map(function ($row) {
                    return [
                        'id' => (string) $row->id,
                        'product_id' => (string) $row->product_id,
                        'qty_value' => $row->qty_value,
                        'qty_uom' => $row->qty_uom,
                        'completed' => $row->completed,
                        'product' => [
                            'id' => (string) $row->product->id,
                            'name' => $row->product->name,
                            'description' => $row->product->description,
                        ],
                    ];
                })),
            ],
        ];
    }
}
