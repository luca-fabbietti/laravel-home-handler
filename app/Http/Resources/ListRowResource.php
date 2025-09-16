<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListRowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'List Row',
            'id' => (string) $this->id,
            'attributes' => [
                'product' => [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'description' => $this->product->description,
                ],
                'list_id' => $this->list_id,
                'quantity' => $this->qty_value,
                'quantity_unit' => $this->qty_uom,
                'created_by' => $this->created_by,
                'completed' => (bool) $this->completed,
            ],
        ];
    }
}
