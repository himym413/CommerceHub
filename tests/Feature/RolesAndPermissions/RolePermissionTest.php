<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\Staff;
use Illuminate\Database\QueryException;

test('retrieves the permissions assigned to a role', function () {
    $role = Role::factory()->create();
    $permissions = Permission::factory()->count(2)->create();
    
    $role->permissions()->attach($permissions);
    $assignedPermissions = $role->permissions;

    expect($assignedPermissions->modelKeys())->toEqualCanonicalizing($permissions->modelKeys());
});

test('retrieves the roles assigned to a permission', function () {
    $permission = Permission::factory()->create();
    $roles = Role::factory()->count(2)->create();

    $permission->roles()->attach($roles);
    $assignedRoles = $permission->roles;

    expect($assignedRoles->modelKeys())->toEqualCanonicalizing($roles->modelKeys());
});

test('rejects duplicate permission assignments to a role', function () {
    $role = Role::factory()->create();
    $permission = Permission::factory()->create();

    $role->permissions()->attach($permission);

    expect(fn () => $role->permissions()->attach($permission))
        ->toThrow(QueryException::class);
});

test('prevents deleting a role assigned to staff', function () {
    $role = Role::factory()->create();
    $staffMember = Staff::factory()->for($role)->create();

    expect(fn () => $role->delete())
        ->toThrow(QueryException::class);

    $this->assertDatabaseHas('roles', [
        'id' => $role->id,
    ]);

    $this->assertDatabaseHas('staff', [
        'id' => $staffMember->id,
    ]);
});

test('deleting an unused role removes its assignments but preserves permissions', function () {
    $role = Role::factory()->create();
    $permissions = Permission::factory()->count(2)->create();

    $role->permissions()->attach($permissions);

    $role->delete();

    $this->assertDatabaseMissing('roles', [
        'id' => $role->id,
    ]);

    $this->assertDatabaseMissing('permission_role', [
        'role_id' => $role->id,
    ]);

    foreach ($permissions as $permission) {
        $this->assertDatabaseHas('permissions', [
            'id' => $permission->id,
        ]);
    }
});
