<?php

namespace App\Http\Controllers;

use App\Models\StudentskiRacun;
use Illuminate\Http\Request;
use App\Models\Racun;
use App\Http\Resources\StudentskiRacunResource;
use Illuminate\Support\Facades\Auth;

class StudentskiRacunController extends Controller
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
        ]);

        $r=Racun::create([
            'user_id'=>$validate['user_id'],
            'banka_id'=>$validate['banka_id'],
            'type'=>'studentski'
        ]);

        $rs=StudentskiRacun::create([
            'racun_id'=>$r->id,
            'broj_racuna'=>$validate['broj_racuna'],
            'stanje_racuna'=>$validate['stanje_racuna'],
        ]);

        return response()->json(new StudentskiRacunResource($rs),201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentskiRacun  $studentskiRacun
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user=Auth::user();
        $stud=StudentskiRacun::findOrFail($id);
        if($user->id==$stud->racun->user->id){
            return new StudentskiRacunResource($stud);
        }else{
            return response()->json('Nedozvoljen pristup');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StudentskiRacun  $studentskiRacun
     * @return \Illuminate\Http\Response
     */
    public function edit(StudentskiRacun $studentskiRacun)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StudentskiRacun  $studentskiRacun
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentskiRacun $studentskiRacun)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentskiRacun  $studentskiRacun
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $zaBrisanje=StudentskiRacun::findOrFail($id);
        $zaBrisanje->delete();
        return response()->json('Uspesno obrisano',204);
    }
}
