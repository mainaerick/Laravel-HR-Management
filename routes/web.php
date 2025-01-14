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
    Route::get('employee/edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
    Route::get('employee/{id}', [EmployeeController::class, 'show'])->name('employee.show');
    Route::delete('employee/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');
    Route::post('employee/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::post('employee', [EmployeeController::class, 'store'])->name('employee.store');
});

//Profile rotes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/files/{path}', function ($path) {
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

Route::get('/images/{path}', function ($path) {
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

Route::get('employee/download/files/{eid}/{filename}', function ($eid, $filename) {
    $path = 'public/files/employees/' . $eid."/".$filename;
    $filePath = storage_path("app/".$path);
    if (!file_exists($filePath)) {
        abort(404, 'File not found');
    }
    return response()->download($filePath);
})->name("employee.download.file")->where([
    'eid' => '.*',
    'filename' => '.*'
]);
Route::get('employee/view/files/{eid}/{filename}', function ($eid, $filename) {
    $filePath = storage_path("app/public/files/employees/{$eid}/{$filename}");

    if (!file_exists($filePath)) {
        abort(404, 'File not found');
    }

    $mimeType = mime_content_type($filePath);
    return response()->file($filePath, [
        'Content-Type' => $mimeType,
    ]);
})->name("employee.view.file")->where([
    'eid' => '.*',
    'filename' => '.*'
]);
require __DIR__.'/auth.php';
