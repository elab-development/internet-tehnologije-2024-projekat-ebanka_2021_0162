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
        Schema::create('tekuci_racuns', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->double('dozvoljeni_minus', 8, 2);
            $table->double('kamata', 5, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tekuci_racuns');
    }
};
