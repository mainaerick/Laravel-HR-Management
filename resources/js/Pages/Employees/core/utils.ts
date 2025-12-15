import dayjs from "dayjs";
import {Employee} from "@/Pages/Employees/core/Model";

export const transformEmployeeModel = (employee:Employee) => ({
    ...employee,
    date_of_birth: employee.date_of_birth ? dayjs(employee.date_of_birth) : null,
    join_date: employee.join_date ? dayjs(employee.join_date) : null,
    leave_date: employee.leave_date ? dayjs(employee.leave_date) : null,
    created_at: employee.created_at ? dayjs(employee.created_at) : null,
    updated_at: employee.updated_at ? dayjs(employee.updated_at) : null,
    profile_pic: employee.profile_pic
        ? [{
            uid: '-1',
            name: 'Profile Pic',
            url: employee.profile_pic,
            type: 'application/img',
            status: 'done'
        }]
        : [],
    appointment_letter: employee.appointment_letter
        ? [{
            uid: '-1',
            name: 'Appointment Letter',
            url: employee.appointment_letter,
            type: 'application/pdf',
            status: 'done'
        }]
        : [],
    salary_slips: employee.salary_slips
        ? employee.salary_slips.map((url:any, index:any) => ({
            uid: `${index}`,
            name: `Salary Slip ${index + 1}`,
            url,
            type: 'application/pdf',
            status: 'done'
        }))
        : [],
    reliving_letter: employee.reliving_letter
        ? [{uid: '-1', name: 'Reliving Letter', url: employee.reliving_letter, type: 'application/pdf', status: 'done'}]
        : [],
    experience_letter: employee.experience_letter
        ? [{
            uid: '-1',
            name: 'Experience Letter',
            url: employee.experience_letter,
            type: 'application/pdf',
            status: 'done'
        }]
        : [],
});
