<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transakcija extends Model
{
    use HasFactory;

    protected $fillable = ['broj_racuna_primaoca', 'iznos', 'opis_transakcije'];


    public function racun(){
        return $this->belongsTo(Racun::class);
    }
}
