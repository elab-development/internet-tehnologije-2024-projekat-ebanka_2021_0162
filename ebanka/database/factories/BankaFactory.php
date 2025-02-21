<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Banka>
 */
class BankaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'naziv'=>fake()->company(),
            'grad'=>fake()->city(),
            'broj_dozvole'=>fake()->numerify('#####'),
        ];
    }
}
