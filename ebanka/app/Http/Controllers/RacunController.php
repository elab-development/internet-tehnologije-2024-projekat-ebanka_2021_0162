<?php

namespace App\Http\Controllers;

use App\Models\Racun;
use Illuminate\Http\Request;

class RacunController extends Controller
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
            'broj_racuna'=>'required|regex:/^\d{3}-\d{8}-\d{3}$/',
            'user_id'=>'required|exists:users,id',
            'banka_id'=>'required|exists:bankas,id',
            'racunTip_type'=>'required|morph:App\Models\TekuciRacun,App\Models\StudentskiRacun,App\Models\DevizniRacun,App\Models\StedniRacun',
            'racunTip_id'=>'required|exists:tekuci_racuns,id|exists:stedni_racuns,id|exists:studentski_racuns,id|exists:devizni_racuns,id'
        ]);


        $racun=Racun::create([
            'broj_racuna'=>$validate['broj_racuna'],
            'user_id'=>$validate['user_id'],
            'banka_id'=>$validate['banka_id'],
            'racunTip_type'=>$validate['racunTip_type'],
            'racunTip_id'=>$validate['racunTip_id']
        ]);

        return response()->json($racun,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Racun  $racun
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $racun=Racun::findOrFail($id);
        return response()->json($racun);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Racun  $racun
     * @return \Illuminate\Http\Response
     */
    public function edit(Racun $racun)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Racun  $racun
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Racun $racun)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Racun  $racun
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $zaBrisanje=Racun::findOrFail($id);
        $zaBrisanje->delete();
        return response()->json(null,204);
    }
}
