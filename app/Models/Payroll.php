<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = ['employee_id', 'base_salary', 'deductions', 'net_salary', 'status'];
}
