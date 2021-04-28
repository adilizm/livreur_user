<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\CategoreisController;
use App\Http\Controllers\OrderController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::post('register', [RegisterController::class,'register']);

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LogoutController::class, 'logout']);
Route::get('/getCategoreis', [CategoreisController::class, 'getAllCategoreis']);
//Route::post('/storeCategory', [CategoreisController::class, 'storeCategory']);
Route::post('/new_category', [CategoreisController::class, 'store'])->name('new_category');
Route::post('/new_order', [OrderController::class, 'store'])->name('new_order');
Route::get('/CurrentUserOrders/{id}', [OrderController::class, 'GetUserOrders']);
Route::get('/allOrders', [OrderController::class,'allOrders']);
Route::get('/orderlivre/{id}', [OrderController::class,'orderlivre']);