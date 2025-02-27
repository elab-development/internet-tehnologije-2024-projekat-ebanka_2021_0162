<?php

use App\Http\Controllers\BankController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountInfoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExchangeRatesController;
use App\Http\Controllers\TransakcijaController;
use App\Http\Controllers\RacunController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});


// Rute za autentifikovane korisnike 
Route::middleware(['auth:sanctum', 'isRegularUser'])->group( function() {
    //nove rute
    Route::get("/korisnik/izvrsene-transakcije/{banka_id}",[TransakcijaController::class,"prikaz_transakcija"]);
    Route::get("/korisnik/transakcija/{id}",[TransakcijaController::class,"show"]);
    Route::post("/korisnik/nova-transakcija",[TransakcijaController::class,"store"]);

    Route::get("/korisnik/racun/{id}",[RacunController::class,"show"]);
    Route::delete("/korisnik/racun/{id}",[RacunController::class,"destroy"]);
    Route::post("/korisnik/kreiranje-racuna",[RacunController::class,"store"]);

    Route::get("/korisnik/bankovni-racuni", [UserController::class, "prikazi_racune"]);

    Route::get("/korisnik/kursna-lista", [ExchangeRatesController::class, "fetchRates"]);
    Route::get("/korisnik/informacije-o-nalogu", [AccountInfoController::class, "show"]);
    Route::post("/korisnik/logout", [AuthController::class, "logout"]);
});

// Adminska grupa ruta
Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::resource("/admin/banke", BankController::class);    
    Route::resource("/admin/korisnici", UserController::class);
    Route::get("/admin/informacije-o-nalogu", [AccountInfoController::class, "show"]);
    Route::get("/admin/kursna-lista", [ExchangeRatesController::class, "fetchRates"]);
    Route::post("/admin/logout", [AuthController::class, "logout"]);
});


// Za neautentifikovane korisnike
Route::middleware("guest")->group( function() {
    // log in ruta za logovanje korisnika
    Route::post("/korisnik/login", [AuthController::class, "login"]);
    
    //nezasticena ruta za logovanje admina
    Route::post('admin/login', [AuthController::class, "logInAdmin"]);
    
    // sign up ruta
    Route::post("/registracija",[AuthController::class,"register"]);    
    
    //ruta za ucitavanje kursnih lista
    Route::get("kursna-lista", [ExchangeRatesController::class, "fetchRates"]);
});
