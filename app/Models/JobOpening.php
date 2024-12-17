<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobOpening extends Model
{
    use SoftDeletes;
    protected $fillable = ['title', 'department_id', 'location', 'salary', 'employment_type'];
}
