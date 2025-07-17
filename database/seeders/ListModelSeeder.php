<?php

namespace Database\Seeders;

use Database\Factories\ListModelFactory;
use Illuminate\Database\Seeder;

class ListModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ListModelFactory::new()->count(50)->create();
    }
}
