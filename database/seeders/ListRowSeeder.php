<?php

namespace Database\Seeders;

use Database\Factories\ListRowFactory;
use Illuminate\Database\Seeder;

class ListRowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ListRowFactory::new()->count(2000)->create();
    }
}
