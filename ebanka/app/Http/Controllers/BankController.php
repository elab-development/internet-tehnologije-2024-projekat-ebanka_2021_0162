<?php

namespace App\Http\Controllers;

use App\Models\Banka;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\BankaResource;
use App\Http\Resources\BankaCollection;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $banke = Banka::all();
        return new BankaCollection($banke);
       // return response()->json($banke); // JSON odgovor za API
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
            'naziv' => 'required|string|max:100',
            'grad' => 'required|string|max:50',
            'broj_dozvole' => 'required|integer|digits:5'
        ]);

        $banka = Banka::create([
            'naziv' => $validated['naziv'],
            'grad' => $validated['grad'],
            'broj_dozvole' => $validated['broj_dozvole']
        ]);
        return response()->json($banka, 201); // Vraća novo kreiranu banku kao JSON
    }   

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $banka = Banka::findOrFail($id);
        return new BankaResource($banka);
        //return response()->json($banka); // JSON odgovor za detalje banke
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
        $banka = Banka::findOrFail($id);

        if(!$banka)
            return response()->json('greska pri promeni banke. banka nije pronadjena!', 404);

        $validated = $request->validate([
            'naziv' => 'string',
            'grad' => 'string',
            'broj_dozvole' => 'integer|digits:5',
        ]);

        // Ažuriraj podatke banke
        if(isset($validated['naziv']))
            $banka->naziv = $validated['naziv'];
        
        if(isset($validated['grad']))
            $banka->grad = $validated['grad'];

        if(isset($validated['broj_dozvole']))
            $banka->broj_dozvole = $validated['broj_dozvole'];

        // Sacuvaj promene u bazi
        $banka->save();

        // Vrati odgovor sa uspehom
        return response()->json(['poruka' => 'Banka promenjena!'],200);

        //$banka->update($request->all());
        //return response()->json($banka); // Vraća ažuriranu banku kao JSON
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $banka = Banka::findOrFail($id);
        $banka->delete();
        return response()->json(['message'=>'Uspesno obrisano'],200); // Vraća prazan odgovor nakon brisanja banke
    }

}
