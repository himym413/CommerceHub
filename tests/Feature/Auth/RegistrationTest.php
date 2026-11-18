<?php

use App\Models\Staff;
use App\Models\User;

test('registers and signs in a customer', function () {
    $response = $this->post('/register', [
        'first_name' => 'User',
        'last_name' => 'Example',
        'email' => 'user@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $customer = User::query()->where('email', 'user@example.com')->firstOrFail();
    $this->assertAuthenticatedAs($customer, 'web');
    $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    $response->assertRedirect('/');
});

test('rejects mismatched passwords', function () {
    $response = $this->post('/register', [
        'first_name' => 'User',
        'last_name' => 'Example',
        'email' => 'user@example.com',
        'password' => 'password',
        'password_confirmation' => 'different-password',
    ]);

    $response->assertSessionHasErrors('password');
    $this->assertGuest('web');
    $this->assertDatabaseMissing('users', ['email' => 'user@example.com']);
});

test('rejects an email already used by a customer', function () {
    User::factory()->create([
        'email' => 'user@example.com',
    ]);

    $response = $this->post('/register', [
        'first_name' => 'User',
        'last_name' => 'Example',
        'email' => 'user@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors('email');
    $this->assertGuest('web');
});

test('rejects an email already used by a staff member', function () {
    Staff::factory()->create([
        'email' => 'user@example.com',
    ]);

    $response = $this->post('/register', [
        'first_name' => 'User',
        'last_name' => 'Example',
        'email' => 'user@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors('email');
    $this->assertGuest('web');
    $this->assertDatabaseMissing('users', ['email' => 'user@example.com']);
});

test('throttles registration submissions', function () {
    for ($attempt = 0; $attempt < 5; $attempt++) {
        $this->post('/register', [])
            ->assertSessionHasErrors('email');
    }

    $this->post('/register', [])->assertTooManyRequests();

    $this->assertGuest('web');
});
