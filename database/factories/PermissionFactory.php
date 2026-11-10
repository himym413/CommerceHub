<?php

namespace Database\Factories;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Permission>
 */
class PermissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /** @var string $permissionLabel */
        $permissionLabel = fake()->unique()->words(2, true);

        $permissionLabel = ucfirst($permissionLabel);
        $permissionName = Str::slug($permissionLabel);

        return [
            'name' => $permissionName,
            'label' => $permissionLabel,
        ];
    }
}
