<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Upvote;
use App\Models\Feature;
use Illuminate\Support\Facades\Auth;
class UpvoteController extends Controller
{
    public function store(Request $request, Feature $feature){
        $data = $request->validate([
            'feature_id' => 'required|exists:features,id',
            'is_upvote' => 'required|boolean',
        ]);
        $data['user_id'] = $request->user()->id;
        Upvote::updateOrCreate(
            [
                'user_id' => $data['user_id'],
                'feature_id' => $data['feature_id'],
            ],
            [
                'is_upvote' => $data['is_upvote'],
            ]
        );
        return to_route('features.index')->with('success', 'Your vote has been recorded.');
    }
    public function destroy(Feature $feature){
        $feature->upvotes()->where('user_id', Auth::id())->delete();
        return back()->with('success', 'Your vote has been removed.');
    }
}
