<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');

Route::middleware('guest:staff,web')->group(function () {
    Route::inertia('/login', 'auth/login')->name('login');
    Route::inertia('/register', 'auth/register')->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:login')->name('login.store');
    Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('throttle:register')->name('register.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:staff,web')->name('logout');

Route::middleware(['auth:staff,web', 'can:access-admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::inertia('/dashboard', 'admin/dashboard')->name('dashboard');
    Route::inertia('/categories', 'admin/categories')->name('categories');
    Route::inertia('/products', 'admin/products')->name('products');
});
