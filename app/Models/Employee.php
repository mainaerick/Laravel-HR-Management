<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{

    use SoftDeletes,HasFactory;
    protected $fillable = ['employee_id', 'first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'department_id', 'designation', 'type', 'join_date', 'leave_date'];



    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
