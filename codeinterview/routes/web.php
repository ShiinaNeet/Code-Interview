<?php

use App\Http\Controllers\AppUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/appusers', [AppUserController::class, 'index']);
Route::post('/appusers', [AppUserController::class, 'store']);
Route::put('/appusers/{id}', [AppUserController::class, 'update']);
Route::delete('/appusers/{id}', [AppUserController::class, 'destroy']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
