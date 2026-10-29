<?php

use App\Models\Role;
use App\Models\Staff;
use Database\Seeders\RoleSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('staff belongs to a role and appears in its staff collection', function () {
    $this->seed(RoleSeeder::class);

    $employeeRole = Role::where('slug', 'employee')->firstOrFail();

    $staff = Staff::factory()->create([
        'role_id' => $employeeRole->id,
    ]);

    expect($staff->role->id)->toBe($employeeRole->id);
    expect($employeeRole->staff->contains($staff))->toBe(true);
});

test('a role assigned to staff cannot be deleted', function () {
    $this->seed(RoleSeeder::class);

    $employeeRole = Role::where('slug', 'employee')->firstOrFail();

    Staff::factory()->create([
        'role_id' => $employeeRole->id,
    ]);

    expect(fn () => $employeeRole->delete())->toThrow(QueryException::class);
});
