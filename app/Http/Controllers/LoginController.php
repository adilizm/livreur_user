<?php

namespace App\Http\Controllers;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request){

       /*   $validated = $request->validate([
            'login_email' => 'required|email',
            'login_password' => 'required',
        ]); */
         if(Auth::attempt(['email' => $request->login_email, 'password' => $request->login_password])){
            return  Auth::user();
        }
        throw ValidationException::withMessages([
            'email' =>['chi7aja dakheltiha incorect']
        ]);   
   
    return $request;
    }
}
