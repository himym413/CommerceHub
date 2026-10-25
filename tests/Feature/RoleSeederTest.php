<?php

use App\Models\Role;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('role seeder preserves existing role names without creating duplicates', function () {
    $this->seed(RoleSeeder::class);

    $role = Role::where('slug', 'manager')->firstOrFail();
    $role->update(['name' => 'Store Manager']);

    $this->seed(RoleSeeder::class);

    $this->assertDatabaseCount('roles', 3);
    $this->assertDatabaseHas('roles', [
        'slug' => 'manager',
        'name' => 'Store Manager',
    ]);
});
