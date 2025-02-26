<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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


    public function register(Request $request){
        $validate=$request->validate([
            'ime'=>'required|string|max:50',
            'prezime'=>'required|string|max:50',
            'datum_rođenja'=>'required|date',
            'adresa'=>'required|string',
            'grad'=>'required|string',
            'jmbg'=>'required|string|size:13',
            'email'=>'required|string|max:255',
            'password'=>'required|string|min:8'
        ]);

        $user=User::create([
            'ime'=>$validate['ime'],
            'prezime'=>$validate['prezime'],
            'datum_rođenja'=>$validate['datum_rođenja'],
            'adresa'=>$validate['adresa'],
            'grad'=>$validate['grad'],
            'jmbg'=>$validate['jmbg'],
            'email'=>$validate['email'],
            'password'=>bcrypt($validate['password'])
        ]);

        
        return response()->json(['data'=>$user,'access_token'=>$token,'token_type'=>'Bearer']);
    }
}
