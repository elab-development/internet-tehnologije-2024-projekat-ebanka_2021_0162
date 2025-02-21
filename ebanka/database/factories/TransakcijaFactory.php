<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transakcija>
 */
class TransakcijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'id'=>fake()->unique()->bothify('###############'),
            'iznos'=>fake()->randomFloat(2,10,10000),
            'datum'=>fake()->date(),
            'vreme'=>fake()->time(),
            'opis_transakcije'=>fake()->sentence(),
            'broj_racuna_primaoca'=>fake()->numerify('###') .'-'. fake()->numerify('#########') .'-'. fake()->numerify('###'),
        ];
    }
}
