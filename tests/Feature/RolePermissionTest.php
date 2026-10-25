<?php

use App\Enums\PermissionName;
use App\Models\Permission;
use App\Models\Role;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('roles and permissions support many to many assignments', function () {
    $this->seed(RoleSeeder::class);
    $this->seed(PermissionSeeder::class);

    $employee = Role::where('slug', 'employee')->firstOrFail();
    $manager = Role::where('slug', 'manager')->firstOrFail();

    $viewOrders = Permission::where('name', PermissionName::ViewOrders->value)->firstOrFail();
    $adjustInventory = Permission::where('name', PermissionName::AdjustInventory->value)->firstOrFail();

    $employee->permissions()->attach([$viewOrders->id, $adjustInventory->id]);
    $manager->permissions()->attach($viewOrders->id);

    $this->assertDatabaseHas('permission_role', [
        'role_id' => $employee->id,
        'permission_id' => $viewOrders->id,
    ]);

    $this->assertDatabaseHas('permission_role', [
        'role_id' => $employee->id,
        'permission_id' => $adjustInventory->id,
    ]);

    $this->assertDatabaseHas('permission_role', [
        'role_id' => $manager->id,
        'permission_id' => $viewOrders->id,
    ]);

    expect($employee->permissions->modelKeys())
        ->toEqualCanonicalizing([$viewOrders->id, $adjustInventory->id]);

    expect($viewOrders->roles->modelKeys())
        ->toEqualCanonicalizing([$employee->id, $manager->id]);
});

test('database rejects duplicate role-permission assignments', function () {
    $this->seed(RoleSeeder::class);
    $this->seed(PermissionSeeder::class);

    $employee = Role::where('slug', 'employee')->firstOrFail();
    $ordersView = Permission::where('name', PermissionName::ViewOrders->value)->firstOrFail();

    $employee->permissions()->attach($ordersView->id);

    expect(fn () => $employee->permissions()->attach($ordersView->id))
        ->toThrow(QueryException::class);
});
