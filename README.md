# HR Management System

## Project Overview
This project is an enterprise HR Management System built with **Laravel**, **Inertia.js**, **React**, and **TailwindCSS**. The application streamlines HR processes, including employee management, attendance tracking, payroll, department management, and more. It includes robust authentication, role-based access, and dynamic reporting capabilities.

---

## Features
- **Authentication**: Implemented using Laravel Breeze with support for Two-Factor Authentication (2FA).
- **Employee Module**: Fully functional CRUD operations for employee management.
- **Role-Based Access Control**: Powered by Spatie Permissions for granular permissions.
- **Departments**: Management of organizational departments (in progress).
- **Attendance Tracking**: Record and manage employee attendance (pending).
- **Payroll Management**: Automate payroll calculations and track payment statuses (pending).
- **Reports and Analytics**: Generate customizable reports for HR metrics (planned).

---

## Tech Stack
- **Backend**: Laravel with Sail
- **Frontend**: Inertia.js, React, TailwindCSS, Ant Design
- **Database**: MySQL
- **Caching**: Redis
- **Testing**: PHPUnit, Cypress
- **Deployment**: Docker (via Laravel Sail)

---
## Employees Page
<table>
  <tr>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170420.png" alt="Home Page" width="200px">
      <br>
    </td>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170654.png" alt="Features Section" width="200px">
      <br>
    </td>
    
  </tr>

  <tr><td></td></tr>
<tr>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170737.png" alt="Home Page" width="200px">
      <br>
    </td>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170749.png" alt="Features Section" width="200px">
      <br>
    </td>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170809.png" alt="Features Section" width="200px">
      <br>
    </td>

  </tr>
 <tr><td></td></tr>
<tr>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170514.png" alt="Home Page" width="200px">
      <br>
    </td>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170613.png" alt="Features Section" width="200px">
      <br>
    </td>
    <td align="center">
      <img src="project/Screenshot 2025-01-03 170624.png" alt="Features Section" width="200px">
      <br>
    </td>
<td align="center">
      <img src="project/Screenshot 2025-01-03 170636.png" alt="Features Section" width="200px">
      <br>
    </td>
  </tr>
</table>

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hr-management-system.git
   cd hr-management-system
   ```

2. Install dependencies:
   ```bash
   composer install
   npm install
   ```

3. Set up the environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Run Docker containers using Laravel Sail:
   ```bash
   ./vendor/bin/sail up -d
   ```

5. Migrate and seed the database:
   ```bash
   ./vendor/bin/sail artisan migrate --seed
   ```

6. Build frontend assets:
   ```bash
   npm run dev
   ```

7. Access the application at `http://localhost`.

---

## Usage

### Authentication
- Register and log in using the authentication module.
- Enable 2FA for added security.

### Employee Management
- Add, update, view, or delete employees.
- Filter employees by department or employment type.
- Search employees by name or email.

### Pending Features
- Department CRUD operations.
- Attendance management.
- Payroll functionality.
- Reporting module.

---

## To-Do List

### Completed
- [x] Authentication module.
- [x] Employee management module.

### In Progress
- [ ] Department management module.

### Pending
- [ ] Attendance module.
- [ ] Payroll module.
- [ ] Reporting and analytics.
- [ ] User role and permissions refinement.
- [ ] UI/UX improvements with Ant Design.
- [ ] Testing (Unit and Integration tests).
