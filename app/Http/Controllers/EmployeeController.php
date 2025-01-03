<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

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
            $per_page = $request->get('per_page');
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

        $employees = $query->paginate($per_page);
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
        $departments = Department::all();
        return Inertia::render('Employees/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
//        dd(request()->all());
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'employee_id' => 'required|string|unique:employees,employee_id|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string|max:15',
            'date_of_birth' => 'nullable|array',
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
            'join_date' => 'required|array',
            'leave_date' => 'nullable|array',
            'appointment_letter' => 'nullable|file|mimes:pdf',
            'salary_slips.*' => 'file|mimes:pdf',
            'reliving_letter' => 'nullable|file|mimes:pdf',
            'experience_letter' => 'nullable|file|mimes:pdf',
        ]);

        $dateOfBirth = $this->formatDate($request->input('date_of_birth'));
        $joinDate = $this->formatDate($request->input('join_date'));
        $leaveDate = $this->formatDate($request->input('leave_date'));


        $validated['join_date'] = $joinDate;
        $validated['leave_date'] = $leaveDate;
        $validated['date_of_birth'] = $dateOfBirth;

        $employeeId = $request->input('employee_id');
        // Handle file uploads
        if ($request->hasFile('appointment_letter')) {
            $fileName = 'appointment_letter.pdf';
            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;

            if (!Storage::disk('public')->exists($filePath)) {
                $validated['appointment_letter'] = $request->file('appointment_letter')->storeAs(
                    'files/employees/'.$employeeId,
                    $fileName,
                    'public'
                );
//                dd($validated['appointment_letter']);
            }
            else {
                // Assign the existing file path
                $validated['appointment_letter'] = $filePath;
            }

        }

        if ($request->hasFile('salary_slips')) {
            $salarySlipFiles = $request->file('salary_slips');
            $salarySlipNames = $request->input('salary_slip_names'); // Assume names are sent as a parallel array

            if (count($salarySlipFiles) !== count($salarySlipNames)) {
                return response()->json(['error' => 'Mismatch between salary slips and file names.'], 400);
            }

            $validated['salary_slips'] = array_map(function ($file, $name) use ($employeeId) {
                $fileName = $name; // Use the name provided by the frontend
                $filePath = 'files/employees/'.$employeeId.'/'.$fileName;

                if (!Storage::disk('public')->exists($filePath)) {
                    return $file->storeAs(
                        'files/employees/'.$employeeId,
                        $fileName,
                        'public'
                    );
                }
            }, $salarySlipFiles, $salarySlipNames);
        }

        if ($request->hasFile('reliving_letter')) {
            $fileName = 'reliving_letter.pdf';
            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;

            if (!Storage::disk('public')->exists($filePath)) {
                $validated['reliving_letter'] = $request->file('reliving_letter')->storeAs(
                    'files/employees/'.$employeeId,
                    $fileName,
                    'public'
                );
            }
        }
        if ($request->hasFile('experience_letter')) {
            $fileName = 'experience_letter.pdf';
            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;

            if (!Storage::disk('public')->exists($filePath)) {
                $validated['experience_letter'] = $request->file('experience_letter')->storeAs(
                    'files/employees/'.$employeeId,
                    $fileName,
                    'public'
                );
            }
        }
//        dd( $validated);

        Employee::create($validated);

        return redirect()->route('employee.index');
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {

        $employee = Employee::findOrFail($id);
        $department = Department::findOrFail( $employee->department_id );
        $employee->department_details = $department;
        return Inertia::render('Employees/Show', ['employee' => $employee]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): \Inertia\Response
    {
        $employee = Employee::findOrFail($id);
        $departments = Department::all();
        return Inertia::render('Employees/Edit', ['employee' => $employee,'departments'=>$departments]);
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
        return redirect()->back();
    }

    private function formatDate($dateInput)
    {
        if (is_array($dateInput) && isset($dateInput['$d'])) {
            // Extract and format ISO date string
            return Carbon::parse($dateInput['$d'])->format('Y-m-d');
        } elseif ($dateInput) {
            // Fallback for string inputs
            return Carbon::parse($dateInput)->format('Y-m-d');
        }

        return null; // Return null if the date is not provided
    }
}
