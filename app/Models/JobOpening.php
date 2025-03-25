<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobOpening extends Model
{
    use SoftDeletes,HasFactory;
    protected $fillable = ['title', 'department_id','city', 'location', 'salary', 'employment_type', 'status',];


    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
