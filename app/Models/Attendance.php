<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = ['employee_id', 'date', 'check_in_time', 'check_out_time', 'break_duration', 'working_hours', 'status'];
}
