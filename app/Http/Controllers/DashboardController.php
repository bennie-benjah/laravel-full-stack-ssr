<?php
// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Feature;
use App\Models\Upvote;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'users' => User::count(),
                'features' => Feature::count(),
                'votes' => Upvote::count(),
            ],
        ]);
    }
}
