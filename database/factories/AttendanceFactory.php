<?php

namespace Database\Factories;

use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    public function definition()
    {
        $date = $this->faker->date(); // Ensure the date is consistent
        $checkInTime = $this->faker->optional()->dateTimeBetween("{$date} 08:00:00", "{$date} 12:00:00");

        if ($checkInTime) {
            $checkOutTime = $this->faker->dateTimeBetween($checkInTime, "{$date} 18:00:00");

            // Convert to H:i:s format
            $checkInTimeFormatted = $checkInTime->format('H:i:s');
            $checkOutTimeFormatted = $checkOutTime->format('H:i:s');

            // Break duration: 30-60 minutes
            $breakDuration = gmdate('H:i:s', rand(1800, 3600));

            // Calculate working hours
            $workingSeconds = strtotime($checkOutTimeFormatted) - strtotime($checkInTimeFormatted) - strtotime($breakDuration);
            $workingHours = $workingSeconds > 0 ? gmdate('H:i:s', $workingSeconds) : null;
        } else {
            $checkInTimeFormatted = null;
            $checkOutTimeFormatted = null;
            $breakDuration = null;
            $workingHours = null;
        }

        return [
            'employee_id' => Employee::inRandomOrder()->first()->id ?? Employee::factory(),
            'date' => $date,
            'check_in_time' => $checkInTimeFormatted,
            'check_out_time' => $checkOutTimeFormatted,
            'break_duration' => $breakDuration,
            'working_hours' => $workingHours,
            'status' => $this->faker->randomElement(['on-time', 'late', 'absent']),
        ];
    }
}
