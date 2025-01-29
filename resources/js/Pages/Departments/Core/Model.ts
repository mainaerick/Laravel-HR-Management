import {Employee} from "@/Pages/Employees/core/Model";

export interface Department {
    id: number;
    name: string;
    description: string;
    employees: Employee[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
