<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use App\Models\Feature;
use App\Models\User;
use App\Models\Upvote;
use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;

Route::redirect('/', '/dashboard');

/*
|--------------------------------------------------------------------------
| Routes for ALL verified users
|--------------------------------------------------------------------------
*/
Route::middleware(['verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'stats' => [
                'users'    => User::count(),
                'features' => Feature::count(),
                'votes'    => Upvote::count(),
            ],
        ]);
    })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Features (everyone can view, only some can manage)
    |--------------------------------------------------------------------------
    */
    Route::get('features', [FeatureController::class, 'index'])->name('features.index');
    Route::get('features/{feature}', [FeatureController::class, 'show'])->name('features.show');

    // Feature management
    Route::middleware('can:' . PermissionsEnum::ManageFeatures->value)->group(function () {
        Route::get('features/create', [FeatureController::class, 'create'])->name('features.create');
        Route::post('features', [FeatureController::class, 'store'])->name('features.store');
        Route::get('features/{feature}/edit', [FeatureController::class, 'edit'])->name('features.edit');
        Route::put('features/{feature}', [FeatureController::class, 'update'])->name('features.update');
        Route::delete('features/{feature}', [FeatureController::class, 'destroy'])->name('features.destroy');
    });

    /*
    |--------------------------------------------------------------------------
    | Comments (only if user has ManageComments)
    |--------------------------------------------------------------------------
    */
    Route::middleware('can:' . PermissionsEnum::ManageComments->value)->group(function () {
        Route::post('features/{feature}/comments', [CommentController::class, 'store'])->name('features.comments.store');
        Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    });

    /*
    |--------------------------------------------------------------------------
    | Upvotes (any verified user)
    |--------------------------------------------------------------------------
    */
    Route::post('features/{feature}/upvote', [UpvoteController::class, 'store'])->name('features.upvote');
    Route::delete('features/{feature}/upvote', [UpvoteController::class, 'destroy'])->name('upvote.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin-only routes
|--------------------------------------------------------------------------
*/
Route::middleware(['verified', 'role:' . RolesEnum::Admin->value])->group(function () {
    // User management
    Route::middleware('can:' . PermissionsEnum::ManageUsers->value)->group(function () {
        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::get('users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });
});

// Other route groups
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
