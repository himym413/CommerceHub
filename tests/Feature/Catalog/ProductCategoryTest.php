<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\QueryException;

test('retrieves a category assigned to a product', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->for($category)->create();

    expect($product->category->is($category))->toBeTrue();
});

test('retrieves the products assigned to a category', function () {
    $category1 = Category::factory()->create();
    $category2 = Category::factory()->create();

    $product1 = Product::factory()->for($category1)->create();
    $product2 = Product::factory()->for($category1)->create();
    $product3 = Product::factory()->for($category2)->create();

    expect($category1->products->modelKeys())->toEqualCanonicalizing([$product1->id, $product2->id]);
});

test('prevents deleting a category with products', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->for($category)->create();

    expect(fn () => $category->delete())->toThrow(QueryException::class);

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
    ]);

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'category_id' => $category->id,
    ]);
});
