<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevizniRacun extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function account() {
        return 
        $this->morphOne(Racun::class, 'racunTip');
    }
}
