<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PruebaController;

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

Route::POST('ListaProductos',[PruebaController::class,'ListaProductos']);
Route::POST('NuevoProducto',[PruebaController::class,'NuevoProducto']);
Route::PUT('ActualizarProducto/{producto}',[PruebaController::class,'update']);
Route::DELETE('EliminarProducto/{producto}',[PruebaController::class,'Eliminar']);

Route::POST('ListaSalidas',[PruebaController::class,'ListaSalidas']);
Route::POST('GuardarSalida/{Producto}',[PruebaController::class,'GuardarSalida']);
