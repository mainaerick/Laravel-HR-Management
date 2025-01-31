<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::query()
            ->with(['department:id,name']);
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
//    public function store(Request $request)
//    {
////        dd(request()->all());
//        $validated = $request->validate([
//            'first_name' => 'required|string|max:255',
//            'last_name' => 'required|string|max:255',
//            'employee_id' => [
//                'required',
//                'int',
//                Rule::unique('employees', 'employee_id'),
//            ],
//            'email' =>  [
//                'required',
//                'email',
//                'max:255',
//                Rule::unique('employees', 'employee_id'),
//            ],
//            'phone' => 'nullable|string|max:15',
//            'date_of_birth' => 'nullable|array',
//            'marital_status' => 'nullable|string',
//            'gender' => 'nullable|string',
//            'nationality' => 'nullable|string',
//            'address' => 'nullable|string',
//            'city' => 'nullable|string',
//            'state' => 'nullable|string',
//            'zipcode' => 'nullable|string',
//            'working_days' => 'nullable|array',
//            'department_id' => 'nullable|exists:departments,id',
//            'designation' => 'nullable|string',
//            'employment_type' => 'required|in:permanent,contract,intern',
//            'join_date' => 'required|array',
//            'leave_date' => 'nullable|string',
//            'appointment_letter' => 'nullable|array',
//            'appointment_letter.*' => 'nullable', // Skip validation for existing files
//            'appointment_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048', // Validate new files
//            'salary_slips.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048',
//            'reliving_letter' => 'nullable|array',
//            'reliving_letter.*' => 'nullable', // Skip validation for existing files
//            'reliving_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048', // Validate new files
//            'experience_letter' => 'nullable|array',
//            'experience_letter.*' => 'nullable', // Skip validation for existing files
//            'experience_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048', // Validate new files
//            'profile_pic' => 'nullable|array',
//            'profile_pic.*' => 'nullable', // Skip validation for existing files
//            'profile_pic.*.originFileObj' => 'nullable|file|mimes:jpeg,jpg,png|max:2048', // Validate new files
//
//        ]);
//
////        dd($validated);
//        $dateOfBirth = $this->formatDate($request->input('date_of_birth'));
//        $joinDate = $this->formatDate($request->input('join_date'));
//        $leaveDate = $this->formatDate($request->input('leave_date'));
//
//
//        $validated['join_date'] = $joinDate;
//        $validated['leave_date'] = $leaveDate;
//        $validated['date_of_birth'] = $dateOfBirth;
//
//        $employeeId = $request->input('employee_id');
//        // Handle file uploads
//        if ($request->hasFile('appointment_letter')) {
//            $fileName = 'appointment_letter.pdf';
//            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
//            if (!Storage::disk('public')->exists($filePath)) {
//                $validated['appointment_letter'] = $request->file('appointment_letter')[0]->storeAs(
//                    'files/employees/'.$employeeId,
//                    $fileName,
//                    'public'
//                );
//
//            }
//            else {
//                // Assign the existing file path
//
//                $validated['appointment_letter'] = $filePath;
//            }
//
//        }else{
//            $validated = Arr::except($validated, ['appointment_letter']);
//        }
//
//        if ($request->hasFile('salary_slips')) {
//            $salarySlipFiles = $request->file('salary_slips');
//            $salarySlipNames = $request->input('salary_slip_names'); // Assume names are sent as a parallel array
////            dd(count($salarySlipFiles));
//
//            if (count($salarySlipFiles) !== count($salarySlipNames)) {
//                return response()->json(['error' => 'Mismatch between salary slips and file names.'], 400);
//            }
//
//            $validated['salary_slips'] = array_map(function ($file, $name) use ($employeeId) {
//                $fileName = $name; // Use the name provided by the frontend
//                $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
//
//                if (!Storage::disk('public')->exists($filePath)) {
//                    return $file->storeAs(
//                        'files/employees/'.$employeeId,
//                        $fileName,
//                        'public'
//                    );
//                }
//            }, $salarySlipFiles, $salarySlipNames);
//        }else{
//            $validated = Arr::except($validated, ['salary_slips']);
//        }
//
//        if ($request->hasFile('reliving_letter')) {
//            $fileName = 'reliving_letter.pdf';
//            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
////            dd($filePath);
//            if (!Storage::disk('public')->exists($filePath)) {
//                $validated['reliving_letter'] = $request->file('reliving_letter')[0]->storeAs(
//                    'files/employees/'.$employeeId,
//                    $fileName,
//                    'public'
//                );
//            }
//        }else{
//            $validated = Arr::except($validated, ['reliving_letter']);
//        }
//        if ($request->hasFile('experience_letter')) {
//            $fileName = 'experience_letter.pdf';
//            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
//
//            if (!Storage::disk('public')->exists($filePath)) {
//                $validated['experience_letter'] = $request->file('experience_letter')[0]->storeAs(
//                    'files/employees/'.$employeeId,
//                    $fileName,
//                    'public'
//                );
//            }
//        }else{
//            $validated = Arr::except($validated, ['experience_letter']);
//        }
//        dd( $validated);
//
//        Employee::create($validated);
//
//        return redirect()->route('employee.index');
//    }
    public function store(Request $request)
    {
        $validated = $this->validateEmployeeData($request);

        $employeeId = $validated['employee_id'];

        // Format dates
        $validated = $this->formatEmployeeDates($validated);

        // Handle file uploads
        $validated = $this->handleFileUploads($validated, $request, $employeeId);

//        dd($validated);
        // Create employee record
        Employee::create($validated);

        return redirect()->route('employee.index');
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
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
//        dd($employee);
        $departments = Department::all();
        return Inertia::render('Employees/Edit', ['employee' => $employee,'departments'=>$departments]);
    }

    /**
     * Update the specified resource in storage.
     */
//    public function update(Request $request,  $id)
//    {
////        dd($request->all());
//        $employee= Employee::findOrFail($id);
//
//        $validated = $request->validate([
//            'first_name' => 'required|string|max:255',
//            'last_name' => 'required|string|max:255',
//            'employee_id' => [
//                'required',
//                'int',
//                Rule::unique('employees', 'employee_id')->ignore($employee->id),
//            ],
//            'email' =>  [
//            'required',
//                'email',
//                'max:255',
//                Rule::unique('employees', 'employee_id')->ignore($employee->id),
//            ],
//            'phone' => 'nullable|string|max:15',
//            'date_of_birth' => 'nullable|array',
//            'marital_status' => 'nullable|string',
//            'gender' => 'nullable|string',
//            'nationality' => 'nullable|string',
//            'address' => 'nullable|string',
//            'city' => 'nullable|string',
//            'state' => 'nullable|string',
//            'zipcode' => 'nullable|string',
//            'working_days' => 'nullable|array',
//            'department_id' => 'nullable|exists:departments,id',
//            'designation' => 'nullable|string',
//            'employment_type' => 'required|in:permanent,contract,intern',
//            'join_date' => 'required|array',
//            'leave_date' => 'nullable|string',
//            'appointment_letter' => 'nullable|array',
//            'appointment_letter.*' => 'nullable', // Skip validation for existing files
//            'appointment_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048', // Validate new files
//            'salary_slips.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048',
//            'reliving_letter' => 'nullable|array',
//            'reliving_letter.*' => 'nullable', // Skip validation for existing files
//            'reliving_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048', // Validate new files
//            'experience_letter' => 'nullable|array',
//            'experience_letter.*' => 'nullable', // Skip validation for existing files
//            'experience_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048', // Validate new files
//            'profile_pic' => 'nullable|array',
//            'profile_pic.*' => 'nullable', // Skip validation for existing files
//            'profile_pic.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048', // Validate new files
//        ]);
////        dd($validated['date_of_birth']);
//        $dateOfBirth = $this->formatDate($validated['date_of_birth']);
////        dd($dateOfBirth);
//
//        $joinDate = $this->formatDate($validated['join_date']);
//        $leaveDate = $this->formatDate($validated['leave_date']);
//
//        $validated['join_date'] = $joinDate;
//        $validated['leave_date'] = $leaveDate;
//        $validated['date_of_birth'] = $dateOfBirth;
//
//        $employeeId = $request->input('employee_id');
//
//
//        if ($request->hasFile('appointment_letter')) {
//            $fileName = 'appointment_letter.pdf';
//            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
//            if (!Storage::disk('public')->exists($filePath)) {
//                $validated['appointment_letter'] = $request->file('appointment_letter')->storeAs(
//                    'files/employees/'.$employeeId,
//                    $fileName,
//                    'public'
//                );
//
//            }
//            else {
//                // Assign the existing file path
//
//                $validated['appointment_letter'] = $filePath;
//            }
//
//        }else{
//            $validated = Arr::except($validated, ['appointment_letter']);
//        }
//
//        if ($request->hasFile('salary_slips')) {
//            $salarySlipFiles = $request->file('salary_slips');
//            $salarySlipNames = $request->input('salary_slip_names'); // Assume names are sent as a parallel array
////            dd(count($salarySlipFiles));
//
//            if (count($salarySlipFiles) !== count($salarySlipNames)) {
//                return response()->json(['error' => 'Mismatch between salary slips and file names.'], 400);
//            }
//
//            $validated['salary_slips'] = array_map(function ($file, $name) use ($employeeId) {
//                $fileName = $name; // Use the name provided by the frontend
//                $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
//
//                if (!Storage::disk('public')->exists($filePath)) {
//                    return $file->storeAs(
//                        'files/employees/'.$employeeId,
//                        $fileName,
//                        'public'
//                    );
//                }
//            }, $salarySlipFiles, $salarySlipNames);
//        }else{
//            $validated = Arr::except($validated, ['salary_slips']);
//        }
//
//        if ($request->hasFile('reliving_letter')) {
//            $fileName = 'reliving_letter.pdf';
//            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
////            dd($filePath);
//            if (!Storage::disk('public')->exists($filePath)) {
//                $validated['reliving_letter'] = $request->file('reliving_letter')->storeAs(
//                    'files/employees/'.$employeeId,
//                    $fileName,
//                    'public'
//                );
//            }
//        }else{
//            $validated = Arr::except($validated, ['reliving_letter']);
//        }
//        if ($request->hasFile('experience_letter')) {
//            $fileName = 'experience_letter.pdf';
//            $filePath = 'files/employees/'.$employeeId.'/'.$fileName;
//
//            if (!Storage::disk('public')->exists($filePath)) {
//                $validated['experience_letter'] = $request->file('experience_letter')->storeAs(
//                    'files/employees/'.$employeeId,
//                    $fileName,
//                    'public'
//                );
//            }
//        }else{
//            $validated = Arr::except($validated, ['experience_letter']);
//        }
//
////       dd($validated);
//
//        $employee->update($validated);
//        return redirect()->route('employee.index');
//    }


    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $this->validateEmployeeData($request, $employee->id);

        // Format dates
        $validated = $this->formatEmployeeDates($validated);

        $employeeId = $employee->employee_id;

        // Handle file uploads
        $validated = $this->handleFileUploads($validated, $request, $employeeId);

        // Update employee record
        $employee->update($validated);

        return redirect()->route('employee.index');
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
        if (is_array($dateInput) && isset($dateInput['$D']) && isset($dateInput['$M']) && isset($dateInput['$y'])) {
            // Use the decomposed date parts from the dayjs object directly
            // Note: dayjs months are 0-based, so we need to add 1
            return sprintf('%04d-%02d-%02d',
                (int)$dateInput['$y'],
                (int)$dateInput['$M'] + 1,
                (int)$dateInput['$D']
            );
        } elseif ($dateInput) {
            return Carbon::parse($dateInput)->format('Y-m-d');
        }

        return null;
    }


    private function validateEmployeeData(Request $request, $ignoreId = null)
    {
        $uniqueEmployeeRule = $ignoreId
            ? Rule::unique('employees', 'employee_id')->ignore($ignoreId)
            : Rule::unique('employees', 'employee_id');

        return $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'user_name' => ['required', 'string', $uniqueEmployeeRule],
            'employee_id' => ['required', 'int', $uniqueEmployeeRule],
            'email' => ['required', 'email', 'max:255', $uniqueEmployeeRule],
            'work_email' => ['required', 'string', $uniqueEmployeeRule],
            'phone' => 'nullable|string|max:15',
            'date_of_birth' => 'nullable|array',
            'marital_status' => 'nullable|string',
            'gender' => 'nullable|string',
            'nationality' => 'nullable|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zipcode' => 'nullable|string',
            'working_days' => 'nullable|array',
            'department_id' => 'nullable|exists:departments,id',
            'designation' => 'nullable|string',
            'employment_type' => 'required|in:permanent,contract,intern',
            'join_date' => 'required|array',
            'leave_date' => 'nullable|string',
            'appointment_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048',
            'salary_slips.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048',
            'reliving_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048',
            'experience_letter.*.originFileObj' => 'nullable|file|mimes:pdf|max:2048',
            'profile_pic.*.originFileObj' => 'nullable|file|mimes:jpeg,jpg,png|max:2048',
        ]);
    }

    private function formatEmployeeDates(array $validated): array
    {
        $validated['date_of_birth'] = $this->formatDate($validated['date_of_birth'] ?? null);
        $validated['join_date'] = $this->formatDate($validated['join_date'] ?? null);
        $validated['leave_date'] = $this->formatDate($validated['leave_date'] ?? null);

        return $validated;
    }

    private function handleFileUploads(array $validated, Request $request, $employeeId): array
    {
        $fileFields = [
            'appointment_letter' => 'appointment_letter.pdf',
            'reliving_letter' => 'reliving_letter.pdf',
            'experience_letter' => 'experience_letter.pdf',
            'salary_slips' => null, // Multiple files with custom names
            'profile_pic' => null // Allow any image extension
        ];

        foreach ($fileFields as $field => $defaultName) {
            if ($request->hasFile($field)) {
                $files = $request->file($field);

                if (is_array($files)) {
                    // Handle multiple files
                    $validated[$field] = array_map(function ($file, $index) use ($employeeId, $field) {
                        $fileName = $file->getClientOriginalName() ?: "{$field}_{$index}.pdf";
                        $storedPath = $file->storeAs("files/employees/{$employeeId}", $fileName, 'public');
                        return Storage::url($storedPath); // Generate public URL for each file
                    }, $files, array_keys($files));
                } else {
                    // Handle single file
                    $fileExtension = $files->getClientOriginalExtension();
                    $fileName = $field === 'profile_pic'
                        ? "profile_pic.{$fileExtension}" // Use original extension for profile_pic
                        : $defaultName;

                    $storedPath = $files->storeAs(
                        "files/employees/{$employeeId}",
                        $fileName,
                        'public'
                    );

                    $validated[$field] = Storage::url($storedPath); // Generate public URL
                }
            }
        }

        return $validated;
    }


}
