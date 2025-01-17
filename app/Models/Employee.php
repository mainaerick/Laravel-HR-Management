<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{

    use SoftDeletes,HasFactory;
    protected $fillable = [
        'employee_id',
        'first_name',
        'last_name',
        'email',
        'user_name',
        'work_email',
        'profile_pic',
        'phone',
        'date_of_birth',
        'marital_status',
        'gender',
        'nationality',
        'address',
        'city',
        'state',
        'zipcode',
        'department_id',
        'designation',
        'status',
        'location_type',
        'employment_type',
        'working_days',
        'join_date',
        'leave_date',
        'appointment_letter',
        'salary_slips',
        'reliving_letter',
        'experience_letter',
    ];


    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    protected $casts = [
        'salary_slips' => 'array',
        'working_days' => 'array',
        'date_of_birth' => 'date',
        'join_date' => 'date',
        'leave_date' => 'date',
    ];
}
