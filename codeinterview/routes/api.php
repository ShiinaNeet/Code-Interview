<?php

use App\Http\Controllers\AppUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [AppUserController::class, 'index']);
Route::post('/users', [AppUserController::class, 'store']);
Route::put('/users/{id}', [AppUserController::class, 'update']);
Route::delete('/users/{id}', [AppUserController::class, 'destroy']);