<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('employees', [EmployeeController::class, 'index'])->name('employee.index');
    Route::get('employee/create', [EmployeeController::class, 'create'])->name('employee.create');
    Route::get('employee/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
    Route::delete('employee/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');
    Route::put('employee/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::post('employee', [EmployeeController::class, 'store'])->name('employee.store');
});

//Profile rotes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/logos/{path}', function ($path) {
    $path = 'public/images/' . $path;

    // Validate the path to prevent directory traversal attacks
    if (str_contains($path, '..')) {
        abort(403);
    }

    if (Storage::exists($path)) {
        return response()->file(storage_path('app/' . $path));
    } else {
        abort(404);
    }
})->where('path', '.*');



require __DIR__.'/auth.php';
