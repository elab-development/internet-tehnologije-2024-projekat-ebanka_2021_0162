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
        Schema::create('transakcijas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_posiljaoca');
            $table->primary(['id', 'id_posiljaoca']);
            $table->foreign('id_posiljaoca')->references('id')->on('racun')->onDelete('cascade')->onUpdate('cascade');
            
            $table->string('broj_racuna_primaoca');
            $table->double('iznos', 10, 2);
            $table->date('datum');
            $table->time('vreme');
            $table->text('opis_transakcije');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transakcijas');
    }
};
