<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentController;
use App\Models\Feature;
use App\Models\User;
use App\Models\Upvote;

Route::redirect('/', '/dashboard');



Route::middleware(['verified', 'role:'.\App\Enum\RolesEnum::User->value])->group(function () {
    Route::post('features/{feature}/comments', [CommentController::class, 'store'])->middleware('can:'.\App\Enum\PermissionsEnum::ManageComments->value )->name('features.comments.store');
    Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->middleware('can:'.\App\Enum\PermissionsEnum::ManageComments->value)->name('comments.destroy');

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
    Route::get('features/create', [FeatureController::class, 'create'])->middleware('can:'.\App\Enum\PermissionsEnum::ManageFeatures->value)->name('features.create');
    Route::post('features', [FeatureController::class, 'store'])->middleware('can:'.\App\Enum\PermissionsEnum::ManageFeatures->value)->name('features.store');
    Route::get('features/{feature}', [FeatureController::class, 'show'])->name('features.show');
    Route::get('features/{feature}/edit', [FeatureController::class, 'edit'])->middleware('can:'.\App\Enum\PermissionsEnum::ManageFeatures->value)->name('features.edit');
    Route::put('features/{feature}', [FeatureController::class, 'update'])->middleware('can:'.\App\Enum\PermissionsEnum::ManageFeatures->value)->name('features.update');
    Route::delete('features/{feature}', [FeatureController::class, 'destroy'])->middleware('can:'.\App\Enum\PermissionsEnum::ManageFeatures->value)->name('features.destroy');
    Route::post('features/{feature}/upvote', [UpvoteController::class, 'store'])->name('features.upvote');
    Route::delete('features/{feature}/upvote', [UpvoteController::class, 'destroy'])->middleware('can:')->name('upvote.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
