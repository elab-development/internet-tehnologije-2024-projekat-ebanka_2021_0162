<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('racuns', function (Blueprint $table) {
            $table->id();
            $table->morphs('racunTip');
            $table->string('broj_racuna')->unique();
            $table->double('stanje_racuna', 10, 2);
            $table->double('odrzavanje', 10, 2);

            $table->timestamps();

            $table->unsignedBigInteger('korisnik_id');
            $table->foreign('korisnik_id')->references('id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            
            $table->unsignedBigInteger('banka_id');
            $table->foreign('banka_id')->references('id')->on('banka')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('racuns');
    }
};
