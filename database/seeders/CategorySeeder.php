<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Fruit and Vegetables',
            'Dairy and Eggs',
            'Meat and Poultry',
            'Fish and Seafood',
            'Bread and Bakery',
            'Rice, Pasta and Grains',
            'Canned and Jarred Food',
            'Frozen Food',
            'Snacks and Sweets',
            'Beverages',
            'Condiments and Spices',
            'Household Supplies',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate([
                'name' => $category,
            ]);
        }
    }
}
