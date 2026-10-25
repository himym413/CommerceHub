<?php

use App\Enums\PermissionName;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('permission seeder can run repeatedly without creating duplicates', function () {
    $this->seed(PermissionSeeder::class);
    $this->seed(PermissionSeeder::class);

    foreach (PermissionName::cases() as $permission) {
        $this->assertDatabaseHas('permissions', [
            'name' => $permission->value,
            'label' => $permission->label(),
        ]);
    }
});
