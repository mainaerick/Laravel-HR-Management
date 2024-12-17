<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    protected $fillable = ['job_id', 'name', 'email', 'phone', 'application_date', 'status'];
}
