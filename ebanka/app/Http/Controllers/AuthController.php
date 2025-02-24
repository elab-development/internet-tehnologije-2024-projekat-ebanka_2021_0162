<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required'
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            // Ako su kredencijali tačni, dobijamo korisnika
            $korisnik = Auth::user();
            
            // Generišemo API token za korisnika
            $token = $korisnik->createToken('ebanka')->plainTextToken;

            // Vraćamo token kao odgovor
            return response()->json([
                'token' => $token,
            ]);
        }

        return response()->json('greska pri log in-u', 401);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['poruka' => 'Uspesno odjavljivanje iz aplikacije!'], 200);
    }
}
