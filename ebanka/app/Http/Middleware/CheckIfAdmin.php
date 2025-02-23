<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckIfAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Proveri da li je korisnik ulogovan i da li je uloga admin
        // Mozda ce biti potrebno promeniti tu proveru za admina, tipa is_admin..
        if(Auth::check() && Auth::user()->role == 'admin') {
            return $next($request); // Ako je admin, dozvoljava dalje izvršavanje
        }

        // Ako korisnik nije admin, vratiti odgovarajući odgovor
        return response()->json(['greska' => 'Nedozvoljen pristup'], 403);
    }
}
