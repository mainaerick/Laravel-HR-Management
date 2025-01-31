import {Department} from "@/Pages/Departments/Core/Model";

// export interface Employee {
//     id: number;
//     employee_id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//     date_of_birth: string | null;
//     department_id: number;
//     designation: string;
//     status: string; // e.g., "active"
//     type: string; // e.g., "office"
//     join_date: string;
//     leave_date: string | null;
//     created_at: string;
//     updated_at: string;
//     deleted_at: string | null;
//     department: Department;
// }

export interface Employee {
    id: number;
    employee_id?: string | null;
    first_name: string;
    last_name: string;
    profile_pic:any;
    username?:string|null;
    employment_email?:string|null;
    email: string;
    phone?: string | null;
    date_of_birth?: string | null; // ISO 8601 date format
    marital_status?: string | null;
    gender?: string | null;
    nationality?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zipcode?: string | null;
    department?:Department
    department_id?: number | null;
    department_details: Department;
    designation?: string | null;
    employment_type: 'permanent' | 'contract' | 'intern';
    status: string; // e.g., "active"
    location_type: string; // e.g., "office"
    join_date: string; // ISO 8601 date format
    leave_date?: string | null; // ISO 8601 date format
    working_days?:string[]|null;
    appointment_letter?: string | null; // File path or URL
    salary_slips?: string[] | null; // Array of file paths or URLs
    salary_slip_names?:[]| null;
    reliving_letter?: string | null; // File path or URL
    experience_letter?: string | null; // File path or URL
    created_at: string; // ISO 8601 date format
    updated_at: string; // ISO 8601 date format
    deleted_at?: string | null; // ISO 8601 date format for soft deletes
}



