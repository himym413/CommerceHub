<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'manage-products' => 'Manage products',
            'manage-categories' => 'Manage categories',
            'manage-stock' => 'Manage stock',
            'manage-prices' => 'Manage prices',
            'manage-orders' => 'Manage orders',
            'manage-customers' => 'Manage customer accounts',
            'manage-staff' => 'Manage staff accounts',
            'manage-roles' => 'Manage roles and assign permissions',
        ];

        foreach ($permissions as $name => $label) {
            Permission::firstOrCreate([
                'name' => $name,
            ],
                [
                    'label' => $label,
                ]);
        }
    }
}
