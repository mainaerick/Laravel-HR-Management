import {Department} from "@/Pages/Departments/Core/Model";

export interface Employee {
    id: number;
    employee_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string | null;
    department_id: number;
    designation: string;
    status: string; // e.g., "active"
    type: string; // e.g., "office"
    join_date: string;
    leave_date: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    department: Department;
}


