<?php

use App\Models\Role;
use Database\Seeders\RoleSeeder;

test('seeding roles repeatedly avoids duplicates and preserves edited names', function () {
    $this->seed(RoleSeeder::class);

    $adminRole = Role::where('slug', 'admin')->firstOrFail();

    $adminRole->update(['name' => 'Store Administrator']);

    $this->seed(RoleSeeder::class);

    $this->assertDatabaseHas('roles', [
        'id' => $adminRole->id,
        'slug' => 'admin',
        'name' => 'Store Administrator',
    ]);

    foreach (['admin', 'manager', 'employee'] as $slug) {
        expect(Role::where('slug', $slug)->count())->toBe(1);
    }
});
