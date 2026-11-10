<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

test('rejects products with duplicate SKUs', function () {
    $category = Category::factory()->create();
    Product::factory()->for($category)->create([
        'sku' => 'MILK-001',
    ]);

    expect(fn () => Product::factory()->for($category)->create([
        'sku' => 'MILK-001',
    ]))->toThrow(QueryException::class);
});

test('returns product prices as string with two decimal places', function () {
    $product = Product::factory()->create([
        'price' => '3.5',
    ]);

    $product->refresh();

    expect($product->price)->toBe('3.50');
});

test('sets correct defaults for available_stock and is_active', function () {
    $product = Product::factory()->make();

    unset($product['available_stock'], $product['is_active']);

    $product->save();

    $product->refresh();

    expect($product->available_stock)->toBe(0);
    expect($product->is_active)->toBe(false);
});

test('rejects negative available stock', function () {
    expect(fn () => Product::factory()->create([
        'available_stock' => -1,
    ]))->toThrow(QueryException::class);
})->skip(
    fn () => DB::getDriverName() !== 'mysql',
    'Unsigned stock enforcement requires MySQL.',
);
