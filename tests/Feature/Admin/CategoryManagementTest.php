<?php

use App\Models\Category;
use App\Models\Permission;
use App\Models\Product;
use App\Models\Staff;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('lists categories with their product counts', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);

    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);

    $staffMember->role->permissions()->attach($permission);

    $category2 = Category::factory()->create(['name' => 'Frozen Food']);
    $category1 = Category::factory()->create(['name' => 'Beverages']);

    Product::factory(2)->create(['category_id' => $category1->id]);

    $this->actingAs($staffMember, 'staff')
        ->get(route('admin.categories'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/categories')
            ->has('categories', 2)
            ->where('categories.0.id', $category1->id)
            ->where('categories.0.products_count', 2)
            ->where('categories.1.id', $category2->id)
            ->where('categories.1.products_count', 0)
        );
});

test('denies category access to staff without permission', function () {
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);

    $this->actingAs($staffMember, 'staff')
        ->get(route('admin.categories'))
        ->assertForbidden();
});

test('staff with permission can create a category', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $this->actingAs($staffMember, 'staff')
        ->post(route('admin.categories.store'), [
            'name' => 'New Category',
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.categories'));

    $this->assertDatabaseHas('categories', [
        'name' => 'New Category',
    ]);
});

test('invalid names are rejected on create', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $this->actingAs($staffMember, 'staff');

    $invalidPayloads = [
        [],
        ['name' => ''],
        ['name' => '        '],
        ['name' => str_repeat('a', 101)],
    ];

    foreach ($invalidPayloads as $payload) {
        $this->post(route('admin.categories.store'), $payload)
            ->assertSessionHasErrors('name');
    }

    $this->assertDatabaseCount('categories', 0);
});

test('duplicate names are rejected', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    Category::factory()->create(['name' => 'New Category']);

    $this->actingAs($staffMember, 'staff')
        ->post(route('admin.categories.store'), [
            'name' => 'New Category',
        ])
        ->assertSessionHasErrors('name');

    expect(Category::where('name', 'New Category')->count())->toBe(1);
});

test('staff without permission receives 403 when trying to create a category', function () {
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);

    $this->actingAs($staffMember, 'staff')
        ->post(route('admin.categories.store'), ['name' => 'New Category'])
        ->assertForbidden();

    $this->assertDatabaseMissing('categories', [
        'name' => 'New Category',
    ]);
});

test('customer receives 403 when trying to create a category', function () {
    $customer = User::factory()->create([
        'is_active' => true,
    ]);

    $this->actingAs($customer, 'web')
        ->post(route('admin.categories.store'), ['name' => 'New Category'])
        ->assertForbidden();

    $this->assertDatabaseMissing('categories', [
        'name' => 'New Category',
    ]);
});

test('guests are redirected to login when trying to create a category', function () {
    $this->post(route('admin.categories.store'), ['name' => 'New Category'])
        ->assertRedirect(route('login'));

    $this->assertDatabaseMissing('categories', [
        'name' => 'New Category',
    ]);
});

test('staff with permission can update a category', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->actingAs($staffMember, 'staff')
        ->patch(route('admin.categories.update', ['category' => $category]),
            ['name' => 'Updated Category'])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.categories'));

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Updated Category',
    ]);
});

test('keeping the existing name is possible', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->actingAs($staffMember, 'staff')
        ->patch(
            route('admin.categories.update', ['category' => $category]),
            ['name' => $category->name]
        )
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.categories'));

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => $category->name,
    ]);
});

test('existing category name is rejected', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $category1 = Category::factory()->create([
        'name' => 'Category',
    ]);
    $category2 = Category::factory()->create([
        'name' => 'Another Category',
    ]);

    $this->actingAs($staffMember, 'staff')
        ->patch(
            route('admin.categories.update', ['category' => $category1]),
            ['name' => $category2->name]
        )
        ->assertSessionHasErrors('name');

    $this->assertDatabaseHas('categories', [
        'id' => $category1->id,
        'name' => 'Category',
    ]);
    $this->assertDatabaseHas('categories', [
        'id' => $category2->id,
        'name' => 'Another Category',
    ]);
});

test('invalid names are rejected on update', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $this->actingAs($staffMember, 'staff');

    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $invalidPayloads = [
        [],
        ['name' => ''],
        ['name' => '        '],
        ['name' => str_repeat('a', 101)],
    ];

    foreach ($invalidPayloads as $payload) {
        $this->patch(route('admin.categories.update', ['category' => $category]), $payload)
            ->assertSessionHasErrors('name');
    }

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Category',
    ]);
});

test('staff without permission receives 403 when trying to update a category', function () {
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->actingAs($staffMember, 'staff')
        ->patch(route('admin.categories.update', ['category' => $category]), ['name' => 'Edited Category'])
        ->assertForbidden();

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Category',
    ]);
});

test('customer receives 403 when trying to update a category', function () {
    $customer = User::factory()->create([
        'is_active' => true,
    ]);
    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->actingAs($customer, 'web')
        ->patch(route('admin.categories.update', ['category' => $category]), ['name' => 'Edited Category'])
        ->assertForbidden();

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Category',
    ]);
});

test('guests are redirected to login when trying to update a category', function () {
    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->patch(route('admin.categories.update', ['category' => $category]), ['name' => 'Edited Category'])
        ->assertRedirect(route('login'));

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Category',
    ]);
});

test('staff with permission can delete an empty category', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->actingAs($staffMember, 'staff')
        ->delete(route('admin.categories.destroy', ['category' => $category]))
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('admin.categories'));

    $this->assertDatabaseMissing('categories', [
        'id' => $category->id,
    ]);
});

test('deleting a category containing products is rejected', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);
    $staffMember->role->permissions()->attach($permission);

    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $product = Product::factory()->create([
        'category_id' => $category->id,
    ]);

    $this->actingAs($staffMember, 'staff')
        ->delete(route('admin.categories.destroy', ['category' => $category]))
        ->assertSessionHasErrors('name');

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => $category->name,
    ]);

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'category_id' => $category->id,
        'name' => $product->name,
    ]);
});

test('staff without permission receives 403 when trying to delete a category', function () {
    $staffMember = Staff::factory()->create([
        'is_active' => true,
    ]);

    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->actingAs($staffMember, 'staff')
        ->delete(route('admin.categories.destroy', ['category' => $category]))
        ->assertForbidden();

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => $category->name,
    ]);
});

test('customer receives 403 when trying to delete a category', function () {
    $customer = User::factory()->create([
        'is_active' => true,
    ]);

    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->actingAs($customer, 'web')
        ->delete(route('admin.categories.destroy', ['category' => $category]))
        ->assertForbidden();

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => $category->name,
    ]);
});

test('guests are redirected to login when trying to delete a category', function () {
    $category = Category::factory()->create([
        'name' => 'Category',
    ]);

    $this->delete(route('admin.categories.destroy', ['category' => $category]))
        ->assertRedirect(route('login'));

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Category',
    ]);
});

test('denies category operations to inactive staff with permission', function () {
    $permission = Permission::factory()->create([
        'name' => 'manage-categories',
    ]);

    $staffMember = Staff::factory()->create([
        'is_active' => false,
    ]);

    $staffMember->role->permissions()->attach($permission);

    $category = Category::factory()->create([
        'name' => 'Original Category',
    ]);

    $this->actingAs($staffMember, 'staff');

    $this->get(route('admin.categories'))
        ->assertForbidden();

    $this->post(route('admin.categories.store'), [
        'name' => 'New Category',
    ])->assertForbidden();

    $this->patch(route('admin.categories.update', ['category' => $category]),
        ['name' => 'Updated Category'],
    )->assertForbidden();

    $this->delete(route('admin.categories.destroy', ['category' => $category]))
        ->assertForbidden();

    $this->assertDatabaseCount('categories', 1);

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Original Category',
    ]);
});
