<?php

namespace App\Http\Controllers;

use App\Models\Transakcija;
use Illuminate\Http\Request;
use App\Models\Racun;
use App\Http\Resources\TransakcijaCollection;

class TransakcijaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate=$request->validate([
            'iznos'=>'required|numeric|max:100000|min:0',
            'datum'=>'required|date',
            'vreme'=>'required|date_format:H:M:S',
            'opis'=>'required|string|max:255',
            'broj_racuna_primaoca'=>'required|regex:/^\d{3}-\d{8}-\d{3}$/',
            'racun_id'=>'required|exists:racuns,id',
            'id'=>'required|regex:/^\d{6}$/'
        ]);

        $transakcija=Transakcija::create([
            'iznos'=>$validate['iznos'],
            'datum'=>$validate['datum'],
            'vreme'=>$validate['vreme'],
            'opis'=>$validate['opis'],
            'broj_racuna_primaoca'=>$validate['broj_racuna_primaoca'],
            'racun_id'=>$validate['racun_id'],
            'id'=>$validate['id']
        ]);

        return response()->json($transakcija,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transakcija  $transakcija
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $trans=Transakcija::findOrFail($id);
        return new TransakcijaResource($trans);
        //return response()->json($trans);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transakcija  $transakcija
     * @return \Illuminate\Http\Response
     */
    public function edit(Transakcija $transakcija)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transakcija  $transakcija
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transakcija $transakcija)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transakcija  $transakcija
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transakcija $transakcija)
    {
        //
    }

    public function prikaz_transakcija($racun_id){
        $racun=Racun::findOrFail($racun_id);
        $t=$racun->transakcija;
        return new TransakcijaCollection($t);
        //return response()->json($t);
    }
}
