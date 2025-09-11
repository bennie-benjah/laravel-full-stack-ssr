<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Models\Feature;
use App\Models\User;
use App\Models\Upvote;

Route::redirect('/', '/dashboard');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
    return Inertia::render('dashboard', [
        'stats' => [
            'users' => User::count(),
            'features' => Feature::count(),
            'votes' => Upvote::count(),
        ],
    ]);
})->name('dashboard');
    Route::get('features', [FeatureController::class, 'index'])->name('features.index');
    Route::get('features/create', [FeatureController::class, 'create'])->name('features.create');
    Route::post('features', [FeatureController::class, 'store'])->name('features.store');
    Route::get('features/{feature}', [FeatureController::class, 'show'])->name('features.show');
    Route::get('features/{feature}/edit', [FeatureController::class, 'edit'])->name('features.edit');
    Route::put('features/{feature}', [FeatureController::class, 'update'])->name('features.update');
    Route::delete('features/{feature}', [FeatureController::class, 'destroy'])->name('features.destroy');
    Route::post('features/{feature}/upvote', [UpvoteController::class, 'store'])->name('features.upvote');
    Route::delete('features/{feature}/upvote', [UpvoteController::class, 'destroy'])->name('upvote.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
