<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Racun extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function racunTip() {
        return $this->morphTo();
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
