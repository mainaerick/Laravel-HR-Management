<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Candidate;
use App\Models\Department;
use App\Models\Employee;
use App\Models\JobOpening;
use App\Models\Leave;
use App\Models\Payroll;
use App\Models\Setting;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
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

        $faker = Faker::create();
        $employees = Employee::all();

        if ($employees->isEmpty()) {
            $this->command->warn('No employees found. Please seed the employees table first.');
            return;
        }

        foreach ($employees as $employee) {
            $baseSalary = $faker->randomFloat(2, 30000, 100000);
            $deductions = $faker->randomFloat(2, 0, $baseSalary * 0.2);
            $netSalary = $baseSalary - $deductions;
            $status = $faker->randomElement(['pending', 'completed']);

            Payroll::create([
                'employee_id' => $employee->id,
                'base_salary' => $baseSalary,
                'deductions' => $deductions,
                'net_salary' => $netSalary,
                'status' => $status,
            ]);
        }



        if ($departments->isEmpty()) {
            $this->command->warn('No departments found. Please seed the departments table first.');
            return;
        }

        foreach (range(1, 50) as $_) {
            JobOpening::create([
                'title' => $faker->jobTitle,
                'department_id' => $departments->random()->id ?? null,
                'city' => $faker->city,
                'salary' => $faker->randomFloat(0, 50000, 200000),
                'employment_type' => $faker->randomElement(['full-time', 'part-time','internship']),
                'location' => $faker->randomElement(['office', 'remote', 'hybrid']),
                'status' => $faker->randomElement(['active', 'inactive', 'completed'])
            ]);
        }

        foreach (range(1, 50) as $_) {
            Candidate::create([
                'job_id' => JobOpening::all()->random()->id,
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'phone' => $faker->phoneNumber(),
                'application_date' => $faker->date(),
                'status' => $faker->randomElement(['selected', 'rejected', 'in-process']),
            ]);
        }

        foreach (range(1, 50) as $_) {
            $startDate = Carbon::parse($faker->date());
            $endDate = Carbon::parse($faker->date())->addDays(rand(1, 30));
            Leave::create([
                'employee_id' => Employee::all()->random()->id,
                'manager_id' => Employee::all()->random()->id,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'days' => $this->calculateBusinessDays($startDate, $endDate),
                'status' => $faker->randomElement(['approved', 'pending', 'rejected']),
            ]);
        }


        $settings = [
            ['key' => 'appearance', 'value' => 'light'],
            ['key' => 'language', 'value' => 'English'],
            ['key' => 'two_factor_auth', 'value' => 'enabled'],
            ['key' => 'mobile_notifications', 'value' => 'enabled'],
            ['key' => 'desktop_notifications', 'value' => 'enabled'],
            ['key' => 'email_notifications', 'value' => 'enabled'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], ['value' => $setting['value']]);
        }
    }

    private function calculateBusinessDays(Carbon $start, Carbon $end): int
    {
        $days = 0;
        while ($start->lte($end)) {
            if (!$start->isWeekend()) {
                $days++;
            }
            $start->addDay();
        }
        return $days;
    }
}
