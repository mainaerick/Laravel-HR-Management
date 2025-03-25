<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use App\Models\JobOpening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobOpeningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);
        $search = $request->input('search');

        $query = JobOpening::with('department');

        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%")
                ->orWhereHas('department', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%");
                });
        }

        // Paginate jobs
        $jobOpenings = [
            'active' => (clone $query)->where('status', 'active')->paginate($perPage, ['*'], 'page', $page),
            'inactive' => (clone $query)->where('status', 'inactive')->paginate($perPage, ['*'], 'page', $page),
            'completed' => (clone $query)->where('status', 'completed')->paginate($perPage, ['*'], 'page', $page),
        ];

        // Fetch all departments
        $departments = Department::all();
        return Inertia::render('JobOpenings/Index', [
            'data' => $jobOpenings,
            'departments' => $departments,
            'filters' => $request->only(['search', 'per_page', 'jobOpeningId']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department_id' => 'nullable|exists:departments,id',
            'location' => 'required|in:office,remote,hybrid',
            'salary' => 'nullable|numeric|min:0',
            'city'=> 'required|string|max:255',
            'employment_type' => 'required|in:full-time,part-time,remote',
            'status' => 'required|in:active,inactive,completed',
        ]);
        // Check if the job already exists in the same department
        $existingJob = JobOpening::where('title', $validated['title'])
            ->where('department_id', $validated['department_id'])
            ->first();

        if ($existingJob) {
            return redirect()->back()->withErrors(['title' => 'A job with this title already exists in the selected department.']);
        }
        JobOpening::create($validated);

        return redirect()->route('jobopenings.index')->with('success', 'Job opening created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(JobOpening $jobOpening)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {

        $jobOpening = JobOpening::findOrFail($id);

        return response()->json($jobOpening);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'required|string|max:255',
            'salary' => 'nullable|numeric',
            'status' => 'required|in:active,inactive,completed',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        $jobOpening=JobOpening::findOrFail($id);
        $jobOpening->update($validated);
//        Log::info('Update status:', ['success' => $updated]);

        return redirect()->back()->with('success', 'Job updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobOpening $jobOpening)
    {
        //
    }
}
