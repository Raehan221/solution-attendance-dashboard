# Solution Attendance Dashboard - Documentation

This is a web application used to view employee attendance with 
data from the solution fingerprint as the source. Tech used in this project includes:
- Typescript
- Node.JS
- PostgreSQL
- Prisma
- Tailwind CSS

## Features
- Database of employee data
- View for employee attendance data
- Summary report of employee attendance data


## Entity Relationship Diagram
```mermaid
erDiagram
    EMPLOYEE ||--o{ ATTENDANCE : has

    EMPLOYEE {
        int employee_id PK
        string employee_name
    }

    ATTENDANCE {
        int attendance_id PK
        int employee_id FK
        date work_date
        datetime check_in
        datetime check_out
        decimal total_hours
    }

    USER {
        int user_id PK
        string username
        string password
    }
```