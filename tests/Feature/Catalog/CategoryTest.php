<?php

use App\Models\Category;
use Illuminate\Database\QueryException;

test('rejects categories with duplicate names', function () {
    Category::factory()->create([
        'name' => 'Dairy and Eggs',
    ]);

    expect(fn () => Category::factory()->create([
        'name' => 'Dairy and Eggs',
    ]))->toThrow(QueryException::class);
});
