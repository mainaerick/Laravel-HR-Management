import {Employee} from "@/Pages/Employees/core/Model";

export interface Attendance {
    id: number;
    employee_id: number;
    employee: Employee;
    date: string;
    check_in_time: string | null;
    check_out_time: string | null;
    break_duration: string | null;
    working_hours: string | null;
    status: 'on-time' | 'late' | 'absent';
    created_at: string;
    updated_at: string;
}
