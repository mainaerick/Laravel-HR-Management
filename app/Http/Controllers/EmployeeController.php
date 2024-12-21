<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::with('department');
        $departments = Department::all();
        $per_page = 10;
        if ($request->has('per_page')) {
            $per_page= $request->get('per_page');
        }
        if ($request->has('department_id') && is_array($request->get('department_id'))) {
            $query->whereIn('department_id', $request->get('department_id'));
        }

        if ($request->has('employment_type')) {
            $query->where('type', $request->get('employment_type'));
        }

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'LIKE', "%{$search}%")
                    ->orWhere('last_name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        $employees= $query->paginate($per_page);
        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'filters' => $request->only(['department_id', 'employment_type', 'search']),
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employees/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string|max:15',
            'date_of_birth' => 'nullable|date',
            'marital_status' => 'nullable|string',
            'gender' => 'nullable|string',
            'nationality' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zipcode' => 'nullable|string',
            'department_id' => 'nullable|exists:departments,id',
            'designation' => 'nullable|string',
            'employment_type' => 'required|in:permanent,contract,intern',
            'join_date' => 'required|date',
            'leave_date' => 'nullable|date',
            'appointment_letter' => 'nullable|file|mimes:pdf',
            'salary_slips' => 'nullable|array',
            'salary_slips.*' => 'file|mimes:pdf',
            'reliving_letter' => 'nullable|file|mimes:pdf',
            'experience_letter' => 'nullable|file|mimes:pdf',
        ]);

        // Handle file uploads
        if ($request->hasFile('appointment_letter')) {
            $validated['appointment_letter'] = $request->file('appointment_letter')->store('employees');
        }

        if ($request->hasFile('salary_slips')) {
            $validated['salary_slips'] = array_map(
                fn($file) => $file->store('employees/salary_slips'),
                $request->file('salary_slips')
            );
        }

        if ($request->hasFile('reliving_letter')) {
            $validated['reliving_letter'] = $request->file('reliving_letter')->store('employees');
        }

        if ($request->hasFile('experience_letter')) {
            $validated['experience_letter'] = $request->file('experience_letter')->store('employees');
        }

        Employee::create($validated);

        return redirect()->route('employees.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('Employees/Edit', ['employee' => $employee]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'phone' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'department_id' => 'nullable|exists:departments,id',
            'designation' => 'nullable|string',
            'employment_type' => 'required',
            'join_date' => 'required|date',
        ]);

        $employee->update($validated);
        return redirect()->route('employees.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        return  redirect()->back();
    }
}
