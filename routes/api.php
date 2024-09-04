<?php

use App\Http\Controllers\ClientAddressController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PaymentMethodsController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProductCategorieController;
use App\Http\Controllers\ProductController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(ClientController::class)->prefix('clients')->name('clients')->group(function () {
    Route::post('/create', 'createUserOnDatabase')->name('create');
    Route::put('/update/{client_uuid}', 'updateUserOnDatabase')->name('update');
    Route::delete('/delete/{client_uuid}', 'deleteUserFromDatabase')->name('delete');
    Route::get('/get_all', 'getAllDataFromDatabase')->name('getAll');
});

Route::controller(ClientController::class)->prefix('clients')->name('clients')->group(function () {
    Route::post('/create', 'createClientOnDatabase')->name('create');
    Route::put('/update/{client_uuid}', 'updateClientOnDatabase')->name('update');
    Route::delete('/delete/{client_uuid}', 'deleteClientFromDatabase')->name('delete');
    Route::get('/get_all', 'getAllDataFromDatabase')->name('getAll');
});

Route::controller(ClientAddressController::class)->prefix('clients_address')->name('clients_address')->group(function () {
    Route::post('/create', 'createClientAddressOnDatabase')->name('create');
    Route::put('/update/{client_uuid}', 'updateClientAddressOnDatabase')->name('update');
    Route::delete('/delete/{client_uuid}', 'destroyClientAddressFromDatabase')->name('delete');
    Route::get('/get_all', 'getAllDataFromDatabase')->name('getAll');
});

Route::controller(ProductCategorieController::class)->prefix('products_categories')->name('products_categories')->group(function () {
    Route::post('/create', 'createProductCategorieOnDatabase')->name('create');
    Route::put('/update/{product_categorie_id}', 'updateProductCategorieOnDatabase')->name('update');
    Route::delete('/delete/{product_categorie_id}', 'deleteProductCategorieFromDatabase')->name('delete');
    Route::get('/get_all', 'getAllDataFromDatabase')->name('getAll');
});

Route::controller(ProductController::class)->prefix('products')->name('products')->group(function () {
    Route::post('/create', 'createProductOnDatabase')->name('create');
    Route::put('/update/{product_uuid}', 'updateProductOnDatabase')->name('update');
    Route::delete('/delete/{product_uuid}', 'deleteProductFromDatabase')->name('delete');
    Route::get('/get_all', 'getAllDataFromDatabase')->name('getAll');
});

Route::controller(PositionController::class)->prefix('positions')->name('positions')->group(function () {
    Route::post('/create', 'createPositionOnDatabase')->name('create');
    Route::put('/update/{product_uuid}', 'updatePositionOnDatabase')->name('update');
    Route::delete('/delete/{product_uuid}', 'deletePositionFromDatabase')->name('delete');
    Route::get('/get_all', 'getAllDataFromDatabase')->name('getAll');
});

Route::controller(PaymentMethodsController::class)->prefix('payment_methods')->name('payment_methods')->group(function () {
    Route::post('/create', 'createPaymentMethodOnDatabase')->name('create');
    Route::put('/update/{product_uuid}', 'updatePaymentMethodOnDatabase')->name('update');
    Route::delete('/delete/{product_uuid}', 'deletePaymentMethodFromDatabase')->name('delete');
    Route::get('/get_all', 'getAllDataFromDatabase')->name('getAll');
});
