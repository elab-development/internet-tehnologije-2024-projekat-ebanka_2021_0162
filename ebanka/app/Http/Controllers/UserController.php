<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $korisnici = User::all();
        return response()->json($korisnici);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Ovaj metod je obično za prikaz forme u aplikaciji (ne koristi se za API)
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
            
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ime' => 'required|string|max:50',
            'prezime' => 'required|string|max:50',
            'datum_rođenja' => 'required|date',
            'adresa' => 'required|string',
            'grad' => 'required|string',
            'jmbg' => 'required|string|size:13',
            'email' => 'required|string|max:255',
            'password' => 'required|string|min:8'
        ]);

        $korisnik = User::create([
            'ime' => $validated['ime'],
            'prezime' => $validated['prezime'],
            'datum_rođenja' => $validated['datum_rođenja'],
            'adresa' => $validated['adresa'],
            'grad' => $validated['grad'],
            'jmbg' => $validated['jmbg'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'remember_token' => Str::random(10),  // Generisanje random tokena
            'email_verified_at' => null,  // Početno postavljamo kao null dok ne verifikujemo email
        ]);

        return response()->json($korisnik, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $korisnik = User::findOrFail($id);
        return response()->json($korisnik);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Ovaj metod je obično za prikaz forme u aplikaciji (ne koristi se za API)
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $korisnik = User::findOrFail($id);
        $korisnik->update($request->all());
        return response()->json($korisnik);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $korisnik = User::findOrFail($id);
        $korisnik->delete();
        return response()->json(null, 204);
    }

    public function prikazi_racune() {
        $korisnik = Auth::user();
        $racuni = $korisnik->racun;
    
        return response()->json($racuni);
    }
}
