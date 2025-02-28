<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TekuciRacun;
use App\Models\StedniRacun;
use App\Models\DevizniRacun;
use App\Models\StudentskiRacun;

class Racun extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function podracun_tekuci(){
        return $this->hasMany(TekuciRacun::class);
    }

    public function podracun_studentski(){
        return $this->hasMany(StudentskiRacun::class);
    }

    public function podracun_devizni(){
        return $this->hasMany(DevizniRacun::class);
    }

    public function podracun_stedni(){
        return $this->hasMany(StedniRacun::class);
    }

    public function banka(){
        return $this->belongsTo(Banka::class);
    }

    public function transakcija(){
        return $this->hasMany(Transakcija::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
