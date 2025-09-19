<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, \App\Models\Feature $feature)
    {
        $data = $request->validate([
            'comment' => 'required|string|max:1000',
        ]);

        $data['user_id'] = Auth::id();
        $data['feature_id'] = $feature->id;

        Comment::create($data);

        return back()->with('success', 'Comment added successfully.');
    }
    public function destroy(Comment $comment)
    {
        // Only allow the owner (or admin later if needed)
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully.');
    }
}
