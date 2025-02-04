<?php

namespace App\Http\Controllers;

use App\Models\JobOpening;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobOpeningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $query = JobOpening::with('department');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'LIKE', "%{$search}%")
                ->orWhereHas('department', function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%");
                });
        }

        $jobOpenings = $query->paginate($perPage);

        return Inertia::render('JobOpenings/Index', [
            'data' => $jobOpenings,
            'filters' => $request->only(['search']),
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
        //
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
    public function edit(JobOpening $jobOpening)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobOpening $jobOpening)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobOpening $jobOpening)
    {
        //
    }
}
