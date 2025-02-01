<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $departments = [
            ['name' => 'Human Resources', 'description' => 'Handles employee-related operations.'],
            ['name' => 'Development', 'description' => 'Responsible for software development.'],
            ['name' => 'Marketing', 'description' => 'Oversees marketing campaigns and strategies.'],
            ['name' => 'Sales', 'description' => 'Manages sales and client relationships.'],
            ['name' => 'Design', 'description' => 'Focuses on UI/UX and branding designs.'],
        ];
        foreach ($departments as $department) {
            Department::create($department);
        }
        $departments = Department::all();
        Employee::factory(50)->create()->each(function ($employee) use ($departments) {
            $employee->department_id = $departments->random()->id;
            $employee->employee_id = fake()->randomNumber(4);
            $employee->save();
        });
        $employees = Employee::all();

        Attendance::factory(50)->create()->each(function ($attendance) use ($employees) {
            $attendance->employee_id = $employees->random()->id;
            $attendance->save();
        });
    }
}
