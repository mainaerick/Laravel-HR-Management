<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'user_name' => $this->faker->unique()->userName, // Ensure a unique username
            'work_email' => $this->faker->unique()->companyEmail,
            'profile_pic' => $this->faker->imageUrl(200, 200, 'people'), // Example: Generates a profile picture URL
            'phone' => $this->faker->phoneNumber,
            'date_of_birth' => $this->faker->date('Y-m-d', '-20 years'),
            'marital_status' => $this->faker->randomElement(['single', 'married', 'divorced']),
            'gender' => $this->faker->randomElement(['male', 'female', 'non-binary']),
            'nationality' => $this->faker->country,
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'zipcode' => $this->faker->postcode,
            'department_id' => null, // Will be assigned dynamically in the seeder
            'designation' => $this->faker->jobTitle,
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'location_type' => $this->faker->randomElement(['office', 'remote']),
            'employment_type' => $this->faker->randomElement(['permanent', 'contract', 'intern']),
            'working_days' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Example array
            'join_date' => $this->faker->date('Y-m-d', '-1 year'),
            'leave_date' => null, // Default null, can be set dynamically
            'appointment_letter' => $this->faker->url,
            'salary_slips' => [], // Default empty array
            'reliving_letter' => $this->faker->url,
            'experience_letter' => $this->faker->url,
        ];
    }
}
