<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use GuzzleHttp\Client;

class ExchangeRatesController extends Controller
{
    public function fetchRates() {
        $response = Http::get("https://kurs.resenje.org/api/v1/currencies");

        return response()->json($response->json());

        // Moze i ovako, kao ovo dole..

        // $client = new Client(); // Create a new Guzzle client

        // Make a GET request to an external API
        // $response = $client->get('https://kurs.resenje.org/api/v1/currencies');

        // Get the response body as a string
        // $data = $response->getBody()->getContents();

        // Convert the response to an array (if the response is JSON)
        // $data = json_decode($data, true);

        // Return the data (you can return it as a view, JSON, etc.)
        // return response()->json($data);
    }
}
