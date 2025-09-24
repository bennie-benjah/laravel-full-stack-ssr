<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthUserResource;
use App\Models\cr;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Inertia::render('Users/Index', [
    'users' => AuthUserResource::collection(User::with('roles')->get()),
]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => new AuthUserResource($user),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
{
    return Inertia::render('Users/Edit', [
        'user' => new AuthUserResource($user),
        'allRoles' => Role::pluck('name')->toArray(), // ensure array
    ]);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
{
    $data = $request->validate([
        'name'  => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        'roles' => 'array',
    ]);

    $user->update([
        'name'  => $data['name'],
        'email' => $data['email'],
    ]);

    if (!empty($data['roles'])) {
        $user->syncRoles($data['roles']);
    }

    return redirect()->route('users.index')->with('success', 'User updated successfully.');
}


}
