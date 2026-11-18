<?php

use App\Models\Staff;
use App\Models\User;

test('denies guests access to the admin dashboard', function () {
    $this->get(route('admin.dashboard'))
        ->assertRedirect(route('login'));
});

test('denies customers access to the admin dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user, 'web')
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});

test('allows staff to access the admin dashboard', function () {
    $staff = Staff::factory()->create([
        'is_active' => true,
    ]);

    $this->actingAs($staff, 'staff')
        ->get(route('admin.dashboard'))
        ->assertOk();
});

test('denies inactive staff access to the admin dashboard', function () {
    $staff = Staff::factory()->create([
        'is_active' => false,
    ]);

    $this->actingAs($staff, 'staff')
        ->get(route('admin.dashboard'))
        ->assertForbidden();
});
