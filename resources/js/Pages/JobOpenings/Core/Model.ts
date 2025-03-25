import {Department} from "@/Pages/Departments/Core/Model";
import {PaginatedData} from "@/Core/Models";

export interface JobOpening {
    id: number;
    title: string;
    department_id: number | null;
    department:Department|null
    location: string | null;
    salary: number | null;
    city:string|null;
    employment_type: 'full-time' | 'part-time' | 'remote';
    status: 'active' | 'inactive' | 'completed';
    created_at: string;
    updated_at: string;
    deleted_at?: string | null; // For soft deletes
}

export type JobOpeningsResponse = {
    active: PaginatedData;
    inactive: PaginatedData;
    completed: PaginatedData;
};
