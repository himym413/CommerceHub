<?php

use App\Models\Staff;
use App\Models\User;

test('signs customer in through the web guard', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    $this->post('/login', [
        'email' => 'user@example.com',
        'password' => 'password',
    ])->assertRedirect(route('home'));

    $this->assertAuthenticatedAs($user, 'web');
    $this->assertGuest('staff');
});

test('signs staff in through the staff guard', function () {
    $staffMember = Staff::factory()->create([
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    $this->post('/login', [
        'email' => 'user@example.com',
        'password' => 'password',
    ])->assertRedirect(route('admin.dashboard'));

    $this->assertAuthenticatedAs($staffMember, 'staff');
    $this->assertGuest('web');
});

test('rejects incorrect password for user', function () {
    User::factory()->create([
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    $responseUser = $this->post('/login', [
        'email' => 'user@example.com',
        'password' => 'wrong-password',
    ]);

    $responseUser->assertSessionHasErrors('email');
    $this->assertGuest('web');
    $this->assertGuest('staff');
});

test('rejects incorrect password for staff member', function () {
    Staff::factory()->create([
        'email' => 'staff@example.com',
        'password' => 'password',
    ]);

    $responseStaff = $this->post('/login', [
        'email' => 'staff@example.com',
        'password' => 'wrong-password',
    ]);

    $responseStaff->assertSessionHasErrors('email');
    $this->assertGuest('staff');
    $this->assertGuest('web');
});

test('rejects inactive customer account', function () {
    $customer = User::factory()->create([
        'is_active' => false,
        'password' => 'password',
    ]);

    $this->post('/login', [
        'email' => $customer->email,
        'password' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest('web');
    $this->assertGuest('staff');
});

test('rejects inactive staff account', function () {
    $staffMember = Staff::factory()->create([
        'is_active' => false,
        'password' => 'password',
    ]);

    $this->post('/login', [
        'email' => $staffMember->email,
        'password' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest('staff');
    $this->assertGuest('web');
});

test('rejects an email present in both account tables', function () {
    User::factory()->create([
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    Staff::factory()->create([
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    $this->post('/login', [
        'email' => 'user@example.com',
        'password' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest('web');
    $this->assertGuest('staff');
});

test('throttles repeated login submissions', function () {
    $customer = User::factory()->create([
        'email' => 'user@example.com',
        'password' => 'password',
    ]);

    for ($attempt = 0; $attempt < 5; $attempt++) {
        $this->post('/login', [
            'email' => $customer->email,
            'password' => 'wrong-password',
        ])->assertSessionHasErrors('email');
    }

    $this->post('/login', [
        'email' => $customer->email,
        'password' => 'wrong-password',
    ])->assertTooManyRequests();
});
