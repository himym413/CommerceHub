<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');

Route::inertia('/admin/dashboard', 'admin/dashboard')->name('admin.dashboard');
Route::inertia('/admin/categories', 'admin/categories')->name('admin.categories');
Route::inertia('/admin/products', 'admin/products')->name('admin.products');
