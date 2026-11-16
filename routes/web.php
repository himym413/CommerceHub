<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');

Route::inertia('/admin/dashboard', 'admin/dashboard')->name('admin.dashboard');
