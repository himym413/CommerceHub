<?php

use App\Models\Staff;
use App\Models\User;

test('signs out a customer', function () {
    $customer = User::factory()->create();

    $this->actingAs($customer, 'web');

    $this->post('/logout')->assertRedirect(route('home'));

    $this->assertGuest('web');
});

test('signs out a staff member', function () {
    $staffMember = Staff::factory()->create();

    $this->actingAs($staffMember, 'staff');

    $this->post('/logout')->assertRedirect(route('home'));

    $this->assertGuest('staff');
});
