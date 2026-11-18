<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request): RedirectResponse
    {
        $credentials = $request->validated();
        $email = $credentials['email'];

        $existsInUsers = User::query()->where('email', $email)->exists();
        $existsInStaff = Staff::query()->where('email', $email)->exists();

        $guard = $existsInStaff ? 'staff' : 'web';

        if (
            $existsInUsers === $existsInStaff
            || ! Auth::guard($guard)->attempt([
                'email' => $email,
                'password' => $credentials['password'],
                'is_active' => true,
            ])
        ) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->route($guard === 'staff' ? 'admin.dashboard' : 'home');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
