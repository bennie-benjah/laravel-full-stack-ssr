<?php

namespace Database\Seeders;

use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $UserRole = Role::create(['name' => RolesEnum::User->value] );
        $CommenterRole = Role::create(['name' => RolesEnum::Commenter->value] );
        $AdminRole = Role::create(['name' => RolesEnum::Admin->value] );
        $manageFeaturesPermission = Permission::create(['name' => PermissionsEnum::ManageFeatures->value]);
        $manageCommentsPermission = Permission::create(['name' => PermissionsEnum::ManageComments->value]);
        $manageUsersPermission = Permission::create(['name' => PermissionsEnum::ManageUsers->value]);
        $manageUpvoteDownvotePermission = Permission::create(['name' => PermissionsEnum::UpvoteDownvote->value]);
        $UserRole->syncPermissions([

            $manageUpvoteDownvotePermission
        ]);
        $CommenterRole->syncPermissions([
            $manageCommentsPermission,
            $manageUpvoteDownvotePermission
        ]);
        $AdminRole->syncPermissions(Permission::all());
        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
        ])->assignRole(RolesEnum::User);
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ])->assignRole(RolesEnum::Admin);
        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'commenter@example.com',
            'password' => bcrypt('password'),
        ])->assignRole(RolesEnum::Commenter);
    }
}
