<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Transakcija;
use Illuminate\Http\Request;
use TCPDF;

class TransactionsExportController extends Controller
{
    public function export($racun_id) {
        // Prvo, proverimo da li korisnik zahteva export transakcija nekog *svog* racuna
        $user = Auth::user();
        $racun = $user->racun()->find($racun_id);

        if (!$racun) {
            return response()->json(['message' => 'Nemate pristup ovom računu.'], 403);
        }

        $transactions = Transakcija::where('racun_id', $racun_id)->get();

        if($transactions->isEmpty())
            return response()->json(['message' => 'Nema transakcija za ovaj racun.', 404]);

            $html = '<!DOCTYPE html>
            <html lang="sr">
            <head>
                <meta charset="UTF-8">
                <title>Export Transakcija</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    table, th, td {
                        border: 1px solid black;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Sve transakcije racuna: #' . $racun_id. '</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID Transakcije</th>
                            <th>Broj Racuna Primaoca</th>
                            <th>Datum</th>
                            <th>Iznos</th>
                            <th>Vreme</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    <tbody>';
    
            foreach ($transactions as $transaction) {
                $html .= '<tr>
                            <td>' . $transaction->id . '</td>
                            <td>' . $transaction->broj_racuna_primaoca . '</td>
                            <td>' . $transaction->datum . '</td>
                            <td>' . $transaction->iznos . ' RSD</td>
                            <td>' . $transaction->vreme . '</td>
                            <td>' . $transaction->opis_transakcije . '</td>
                        </tr>';
            }
    
            $html .= '</tbody></table></body></html>';
            
            $pdf = new TCPDF();
            $pdf->AddPage(); // Dodajemo stranu
            $pdf->SetFont('dejavusans', '', 12); // Postavljamo font
    
            // Generisanje PDF-a sa HTML sadržajem
            $pdf->writeHTML($html, true, false, true, false, '');
    
            // Vraćamo PDF kao download
            return $pdf->Output('transakcije_racun_' . $racun_id . '.pdf', 'D');
        } 
}
