import {Employee} from "@/Pages/Employees/core/Model";

export interface Payroll {
    id: number;
    employee_id: number;
    base_salary: number;
    deductions: number;
    net_salary: number;
    status: "pending" | "completed";
    created_at: string;
    updated_at: string;
    employee?: Employee; // Optional relation
}
