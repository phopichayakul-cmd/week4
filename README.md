# CBE204 Week 4 — In-Memory REST API (Students & Cybersecurity Findings)

## 1. Project Description

This project is a small backend built with **Node.js** and **Express.js** for CBE204 Web Technology Laboratory, Week 4. It exposes two REST resources, both backed by plain in-memory JavaScript arrays (no database):

- **Students** — the resource used throughout the guided part of the lab (Parts 1–11).
- **Cybersecurity Findings** — a second resource designed and built for the Week 4 Assignment (Parts 13–14), representing security issues discovered during an audit (title, severity, status, affected system, discovery date).

The API supports listing all records, fetching a single record by id, and creating new records, and it returns proper HTTP status codes (`200`, `201`, `404`) and JSON responses throughout.

## 2. Installation

Another developer can set up the project as follows:

```bash
git clone <this-repository-url>
npm install
```

This installs the only runtime dependency, `express` (see `package.json`).

## 3. Running the Server

```bash
npm start
```

(equivalently `node server.js`). On success the terminal prints:

```
Server running on port 3000
```

The API is then reachable at `http://localhost:3000`.

## 4. API Documentation

### Students

| Method | Endpoint | Purpose | Request Body | Response | Status Code |
|---|---|---|---|---|---|
| GET | `/students` | Get all students | — | JSON array of student objects | `200 OK` |
| GET | `/students/:id` | Get one student by id | — | JSON student object, or `{"error": "Student not found"}` | `200 OK` / `404 Not Found` |
| POST | `/students` | Create a new student | `{ "name": "...", "email": "..." }` | The newly created student object (server-assigned `id`) | `201 Created` |

### Cybersecurity Findings

| Method | Endpoint | Purpose | Request Body | Response | Status Code |
|---|---|---|---|---|---|
| GET | `/findings` | Get all findings | — | JSON array of finding objects | `200 OK` |
| GET | `/findings/:id` | Get one finding by id | — | JSON finding object, or `{"error": "Finding not found"}` | `200 OK` / `404 Not Found` |
| POST | `/findings` | Create a new finding | `{ "title": "...", "severity": "...", "status": "...", "affectedSystem": "...", "discoveredDate": "..." }` | The newly created finding object (server-assigned `id`) | `201 Created` |

### Other routes

| Method | Endpoint | Purpose | Status Code |
|---|---|---|---|
| GET | `/` | Health/welcome message (`Hello CBE204!`) | `200 OK` |
| GET | `/about` | Short description of the course | `200 OK` |

## 5. Example Requests

**GET one student**

```
GET http://localhost:3000/students/101
```

Response `200 OK`:

```json
{
  "id": 101,
  "name": "Alice Johnson",
  "program": "Cybersecurity Engineering",
  "year": 2,
  "age": 20,
  "gpa": 3.85,
  "interests": ["Web Security", "AI", "Cloud"],
  "contact": { "email": "alice@g.swu.ac.th", "phone": "555-0101", "address": "123 Main St" },
  "courses": ["CBE101", "CBE102", "CBE103"],
  "academic_record": { "semester": "Spring 2024", "grades": { "CBE101": "A", "CBE102": "A-", "CBE103": "B+" }, "credits_completed": 45 }
}
```

**POST a new finding**

```
POST http://localhost:3000/findings
Content-Type: application/json

{
  "title": "Unpatched CVE-2026-1234 on Mail Server",
  "severity": "High",
  "status": "Open",
  "affectedSystem": "Mail Server",
  "discoveredDate": "2026-08-28"
}
```

Response `201 Created`:

```json
{
  "id": 4,
  "title": "Unpatched CVE-2026-1234 on Mail Server",
  "severity": "High",
  "status": "Open",
  "affectedSystem": "Mail Server",
  "discoveredDate": "2026-08-28"
}
```

## 6. Known Limitations

There is **no database** in this project. `students` and `findings` are plain JavaScript arrays held in the Node.js process's memory (`data.js` and `findings.js`). Any record created with `POST` only exists for as long as the server process keeps running: as soon as the server is stopped or restarted, the process's memory is cleared and the array resets to its original hard-coded contents. To persist data across restarts, the arrays would need to be backed by a real database (e.g. PostgreSQL) or written to disk.
