<?php

use App\Http\Controllers\BankController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountInfoController;
use App\Http\Controllers\AuthController;
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

Route::post('/login', [AuthController::class, 'login']);    

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::middleware('isAdmin')->group(function() {

Route::middleware('auth:sanctum')->group( function() {
    Route::resource('banke', BankController::class);    
    Route::resource('korisnici', UserController::class);
    Route::get('informacije-o-nalogu', [AccountInfoController::class, 'show']);
    Route::get('bankovni-racuni', [UserController::class, 'prikazi_racune']);
    Route::post('logout', [AuthController::class, 'logout']);
});

//});

// Za neautentifikovane korisnike
Route::middleware('guest')->group( function() {

});

