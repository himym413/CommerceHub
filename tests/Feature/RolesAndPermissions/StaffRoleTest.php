<?php

use App\Models\Role;
use App\Models\Staff;

test('retrieves the role assigned to a staff account', function () {
    $role = Role::factory()->create();
    $staffMember = Staff::factory()->for($role)->create();

    $assignedRole = $staffMember->role;
    expect($assignedRole->is($role))->toBeTrue();
});
