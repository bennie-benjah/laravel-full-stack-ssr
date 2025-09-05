<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FeatureController;

Route::redirect('/', '/dashboard');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('features', [FeatureController::class, 'index'])->name('features');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
