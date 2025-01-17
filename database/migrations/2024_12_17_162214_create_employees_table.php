<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('employee_id')->nullable();
            $table->string('profile_pic')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('user_name');
            $table->string('work_email');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('gender')->nullable();
            $table->string('nationality')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zipcode')->nullable();
            $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->string('designation')->nullable();
            $table->enum('employment_type', ['permanent', 'contract', 'intern']);
            $table->json('working_days')->nullable();
            $table->date('join_date');
            $table->date('leave_date')->nullable();
            $table->string('appointment_letter')->nullable();
            $table->json('salary_slips')->nullable();
            $table->string('reliving_letter')->nullable();
            $table->string('experience_letter')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
