import {Department} from "@/Pages/Departments/Core/Model";

export interface JobOpening {
    id: number;
    title: string;
    department_id?: number | null;
    location?: string | null;
    salary?: number | null;
    employment_type: "full-time" | "part-time" | "remote";
    created_at: string;
    updated_at: string;
    department?: Department | null;
}
