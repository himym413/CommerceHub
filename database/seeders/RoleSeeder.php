<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Admin' => 'admin',
            'Manager' => 'manager',
            'Employee' => 'employee',
        ];

        foreach ($roles as $name => $slug) {
            Role::firstOrCreate([
                'slug' => $slug,
            ],
            [
                'name' => $name,
            ]);
        }
    }
}
