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
        Schema::table('employees', function (Blueprint $table) {
            // Drop the old column for employment_type
//            $table->dropColumn('employment_type');

            // Add the new columns
            $table->enum('status', ['active', 'inactive', 'terminated'])->after('designation');
            $table->enum('location_type', ['office', 'remote'])->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            // Rollback the changes
            $table->dropColumn(['status', 'location_type']);
            $table->enum('employment_type', ['permanent', 'contract', 'intern'])->after('designation');
        });
    }
};
