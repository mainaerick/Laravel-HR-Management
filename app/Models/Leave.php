<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $fillable = ['employee_id', 'start_date', 'end_date', 'days', 'status', 'manager_id'];


    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
