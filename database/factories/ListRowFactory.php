<?php

namespace Database\Factories;

use App\Models\ListModel;
use App\Models\ListRow;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<ListRow>
 */
class ListRowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'list_id' => ListModel::whereNotNull('id')->inRandomOrder()->first()->id,
            'created_by' => User::whereNotNull('id')->inRandomOrder()->first()->id,
            'product_id' => Product::whereNotNull('id')->inRandomOrder()->first()->id,
            'qty_value' => $this->faker->randomFloat(2, 1, 100),
            'qty_uom' => $this->faker->randomElement(['kg', 'g', 'lb', 'oz']),
            'completed' => $this->faker->boolean(),
        ];
    }
}
