<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Candidate extends Model
{
    use SoftDeletes,HasFactory;
    protected $fillable = ['job_id', 'name', 'email', 'phone', 'application_date', 'status'];




    public function job_opening()
    {
        return $this->belongsTo(JobOpening::class);
    }
}
