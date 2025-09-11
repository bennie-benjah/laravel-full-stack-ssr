<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated = Feature::latest()
        ->withCount(['upvotes as upvote_count' => function ($query) {
            $query->select(DB::raw('SUM(CASE WHEN is_upvote = 1 THEN 1 ELSE -1 END)'));
        }])
        ->withExists(['upvotes as user_upvoted' => function ($query) {
            $query->where('user_id', Auth::id())->where('is_upvote', true);
        }, 'upvotes as user_downvoted' => function ($query) {
            $query->where('user_id', Auth::id())->where('is_upvote', false);
        }])
        ->paginate(12);
        return Inertia::render('Feature/Index', [
            'features' => FeatureResource::collection($paginated),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',

        ]);
        $data['user_id'] = $request->user()->id;

        Feature::create($data);

        return redirect()->route('features.index')->with('success', 'Feature created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        $feature->upvote_count = Upvote::where('feature_id', $feature->id)
            ->select(DB::raw('SUM(CASE WHEN is_upvote = 1 THEN 1 ELSE -1 END)'))
            ->value(DB::raw('COALESCE(SUM(CASE WHEN is_upvote = 1 THEN 1 ELSE -1 END), 0)'));
        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResource($feature),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $feature->update($data);
        return redirect()->route('features.index')->with('success', 'Feature updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
   // In your FeatureController destroy method
public function destroy(Feature $feature)
{
    $feature->delete();

    return redirect()->route('features.index')
        ->with('message', 'Feature deleted successfully!')
        ->with('messageType', 'delete'); // Add a custom flag for deletion
}
}
