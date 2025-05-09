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
        Schema::create('job_openings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('city');
            $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->enum('location', ['office', 'remote', 'hybrid']);
            $table->decimal('salary', 10, 0)->nullable();
            $table->enum('employment_type', ['full-time', 'part-time','internship']);
            $table->enum('status', ['active', 'inactive', 'completed'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_openings');
    }
};
