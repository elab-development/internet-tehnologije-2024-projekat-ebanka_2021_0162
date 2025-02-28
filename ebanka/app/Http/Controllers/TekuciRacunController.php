<?php

namespace App\Http\Controllers;

use App\Models\TekuciRacun;
use App\Models\Racun;
use App\Http\Resources\TekuciRacunResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TekuciRacunController extends Controller
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
            'user_id'=>'required|exists:users,id',
            'banka_id'=>'required|exists:bankas,id',
            'broj_racuna'=>'required|regex:/^\d{3}-\d{8}-\d{3}$/',
            'stanje_racuna'=>'required|max:100000|min:0',
            'odrzavanje'=>'required|max:500|min:0',
            'kamata'=>'required|max:100|min:0',
            'dozvoljeni_minus'=>'required|max:10000|min:0'
        ]);

        $r=Racun::create([
            'user_id'=>$validate['user_id'],
            'banka_id'=>$validate['banka_id'],
            'type'=>'tekuci'
        ]);

        $rt=TekuciRacun::create([
            'racun_id'=>$r->id,
            'broj_racuna'=>$validate['broj_racuna'],
            'stanje_racuna'=>$validate['stanje_racuna'],
            'odrzavanje'=>$validate['odrzavanje'],
            'kamata'=>$validate['kamata'],
            'dozvoljeni_minus'=>$validate['dozvoljeni_minus']
        ]);

        return response()->json(new TekuciRacunResource($rt),201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TekuciRacun  $tekuciRacun
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user=Auth::user();
        $tekuci=TekuciRacun::findOrFail($id);
        if($user->id==$tekuci->racun->user->id){
            return new TekuciRacunResource($tekuci);
        }else{
            return response()->json('Nedozvoljen pristup');
        }
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TekuciRacun  $tekuciRacun
     * @return \Illuminate\Http\Response
     */
    public function edit(TekuciRacun $tekuciRacun)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TekuciRacun  $tekuciRacun
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TekuciRacun $tekuciRacun)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TekuciRacun  $tekuciRacun
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $zaBrisanje=TekuciRacun::findOrFail($id);
        $zaBrisanje->delete();
        return response()->json('Uspesno obrisano',204);
    }
}
