<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Resources\UserResource;
use App\Http\Resources\RacunResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\RacunCollection;
use Illuminate\Support\Facades\Storage;

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
        return new UserCollection($korisnici);
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
            'maticni_broj' => 'required|string|size:13',
            'broj_licne_karte'=>'required|string|regex:/^\d{3}-\d{2}-\d{4}$/',
            'email' => 'required|string|max:255',
            'broj_telefona'=>'required|string|regex:/^\d{3}-\d{3} \d{4}$/',
            'drzava'=>'required|string|max:255',
            'password' => 'required|string|min:8'
        ]);

        $korisnik = User::create([
            'ime' => $validated['ime'],
            'prezime' => $validated['prezime'],
            'datum_rođenja' => $validated['datum_rođenja'],
            'adresa' => $validated['adresa'],
            'grad' => $validated['grad'],
            'maticni_broj' => $validated['maticni_broj'],
            'broj_licne_karte'=>$validated['broj_licne_karte'],
            'email' => $validated['email'],
            'broj_telefona'=>$validate['broj_telefona'],
            'drzava'=>$validate['drzava'],
            'password' => Hash::make($validated['password']),
            'remember_token' => Str::random(10),  // Generisanje random tokena
            'email_verified_at' => null,  // Početno postavljamo kao null dok ne verifikujemo email
        ]);

        return response()->json(new UserResource($korisnik), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $korisnikk = User::findOrFail($id);
        //return response()->json($korisnikk);
        return new UserResource($korisnikk);
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
    public function update(Request $request)
    {
        $korisnik = Auth::User();

        $validated = $request->validate([
            'adresa' => 'string',
            'grad' => 'string',
            'email' => 'string|max:255',
        ]);
        
        
        if(isset($validated['adresa']) ) 
            $korisnik->adresa = $validated['adresa'];
        if(isset($validated['grad'])) 
            $korisnik->grad = $validated['grad'];
        if(isset($validated['email']))
            $korisnik->email = $validated['email'];

        $korisnik->save();

        return response()->json(['poruka'=>'Uspesno izmenjen korisnik!','korisnik'=>new UserResource($korisnik)]);
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
        return response()->json(['message'=>'Uspesno obrisano'],200);
    }



    public function prikazi_racune() {
        $korisnik = Auth::user();
        $racuni = $korisnik->racun;

        return new RacunCollection($racuni);
    }


}
