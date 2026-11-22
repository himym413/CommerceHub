<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');

Route::middleware('guest:staff,web')->group(function () {
    Route::inertia('/login', 'auth/login')
        ->name('login');
    Route::inertia('/register', 'auth/register')
        ->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:login')
        ->name('login.store');

    Route::post('/register', [RegisteredUserController::class, 'store'])
        ->middleware('throttle:register')
        ->name('register.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:staff,web')
    ->name('logout');

Route::middleware(['auth:staff,web', 'can:access-admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::inertia('/dashboard', 'admin/dashboard')
        ->name('dashboard');

    Route::middleware('can:manage-categories')->group(function () {
        Route::get('/categories', [CategoryController::class, 'index'])
            ->name('categories');

        Route::post('/categories', [CategoryController::class, 'store'])
            ->name('categories.store');

        Route::patch('/categories/{category}', [CategoryController::class, 'update'])
            ->name('categories.update');

        Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])
            ->name('categories.destroy');
    });

    Route::inertia('/products', 'admin/products')
        ->name('products');
});
