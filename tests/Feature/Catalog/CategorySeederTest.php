<?php

use App\Models\Category;
use Database\Seeders\CategorySeeder;

test('seeding categories repeatedly preserves records without duplicates', function () {
    $this->seed(CategorySeeder::class);

    $catDairyAndEggs = Category::where('name', 'Dairy and Eggs')->firstOrFail();

    $this->seed(CategorySeeder::class);

    $this->assertDatabaseCount('categories', 12);

    $this->assertDatabaseHas('categories', [
        'id' => $catDairyAndEggs->id,
        'name' => 'Dairy and Eggs',
    ]);
});
