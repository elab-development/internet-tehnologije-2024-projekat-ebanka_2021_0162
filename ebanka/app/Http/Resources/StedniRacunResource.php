<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\RacunResource;

class StedniRacunResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap='stedni_racun';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return[
            'id'=>$this->resource->id,
            'broj_racuna'=>$this->resource->broj_racuna,
            'stanje_racuna'=>$this->resource->stanje_racuna,
            'odrzavanje'=>$this->resource->odrzavanje,
            'kamata'=>$this->resource->kamata,
            'tip_stednje'=>$this->resource->tip_stednje,
            'racun'=> new RacunResource($this->resource->racun),
            //'racun' => $this->whenLoaded('racun'),  

        ];
    }
}
