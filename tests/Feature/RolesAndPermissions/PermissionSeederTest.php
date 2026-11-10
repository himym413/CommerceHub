<?php

use App\Models\Permission;
use Database\Seeders\PermissionSeeder;

test('seeding permissions repeatedly avoids duplicates and preserves edited labels', function () {
    $this->seed(PermissionSeeder::class);

    $manageStockPermission = Permission::where('name', 'manage-stock')->firstOrFail();

    $manageStockPermission->update(['label' => 'Manage inventory']);

    $this->seed(PermissionSeeder::class);

    $this->assertDatabaseHas('permissions', [
        'id' => $manageStockPermission->id,
        'name' => 'manage-stock',
        'label' => 'Manage inventory',
    ]);

    $permissionsNames = ['manage-products', 'manage-categories', 'manage-stock', 'manage-prices', 'manage-orders', 'manage-customers', 'manage-staff', 'manage-roles'];

    foreach ($permissionsNames as $name) {
        expect(Permission::where('name', $name)->count())->toBe(1);
    }
});
