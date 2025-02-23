<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $u1=\App\Models\User::factory()->create();
        $b1=\App\Models\Banka::factory()->create();
        \App\Models\Banka::factory(5)->create();
        $tekuci=\App\Models\TekuciRacun::factory()->create();

        $r1=\App\Models\Racun::factory()->create([
            'user_id'=>$u1->id,
            'banka_id'=>$b1->id,
            'racunTip_type'=>$tekuci,
            'racunTip_id'=>$tekuci->id,
        ]);

        \App\Models\Transakcija::factory(5)->create([
            'racun_id'=>$r1->id,
        ]);

        $devizni=\App\Models\DevizniRacun::factory()->create();

        $r2=\App\Models\Racun::factory()->create([
            'user_id'=>$u1->id,
            'banka_id'=>$b1->id,
            'racunTip_type'=>$devizni,
            'racunTip_id'=>$devizni->id,
        ]);

        \App\Models\Transakcija::factory(2)->create([
            'racun_id'=>$r2->id,
        ]);



        /*
        $this->call([
            $user=\Database\Seeders\UserSeeder::class,
            $banka=\Database\Seeders\BankaSeeder::class,
            $tekuci=\Database\Seeders\TekuciRacunSeeder::class,
            $studentski=\Database\Seeders\StudentskiRacunSeeder::class,
            $stedni=\Database\Seeders\StedniRacunSeeder::class,
            $devizni=\Database\Seeders\DevizniRacunSeeder::class,

            $racun=\Database\Seeders\RacunSeeder::class=>(['user'=>'$user','banka'=>'$banka','tekuci'=>'$tekuci', 'stedni'=>'null','devizni'=>'null','studentski'=>'null']),
            $t=\Database\Seeders\TransakcijaSeeder::class=>(['racun'=>'$racun']),


        ]);*/

       
         

    }
}
