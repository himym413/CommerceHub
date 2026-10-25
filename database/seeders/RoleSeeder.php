<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /** @var array<string, string> */
    protected array $roles = [
        'Admin' => 'admin',
        'Manager' => 'manager',
        'Employee' => 'employee',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        foreach ($this->roles as $name => $slug) {
            Role::firstOrCreate(
                ['slug' => $slug],
                ['name' => $name],
            );
        }
    }
}
