<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = ['employee_id', 'date', 'check_in_time', 'check_out_time', 'break_duration', 'working_hours', 'status'];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
