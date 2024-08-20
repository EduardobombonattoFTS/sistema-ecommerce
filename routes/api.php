<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->prefix('user')->name('user')->group(function () {
    Route::post('/create', 'createUserOnDatabase')->name('create');
});

Route::controller(ClientController::class)->prefix('client')->name('client')->group(function () {
    Route::post('/create', 'createClientOnDatabase')->name('create');
    Route::put('/update/{client_uuid}', 'updateClientOnDatabase')->name('update');
    Route::delete('/delete/{client_uuid}', 'deleteClientFromDatabase')->name('delete');
    Route::get('/get_all', 'createClientOnDatabase')->name('getAll');
});
