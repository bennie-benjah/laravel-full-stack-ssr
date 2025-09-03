<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Upvote extends Model
{
    protected $fillable = ['user_id', 'feature_id', 'is_upvote'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function feature()
    {
        return $this->belongsTo(Feature::class);
    }
}
