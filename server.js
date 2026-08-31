import express from "express";
import { students } from "./data.js";
import { findings } from "./findings.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello CBE204!");
});

app.get("/about", (req, res) => {
    res.send("CBE204 Web Technology Laboratory");
});

app.get("/students", (req, res) => {
    res.status(200).json(students);
});

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ error: "Student not found" });
    }
});

app.post("/students", (req, res) => {
    const newId =
        students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    const newStudent = { id: newId, ...req.body };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.get("/findings", (req, res) => {
    res.status(200).json(findings);
});

app.get("/findings/:id", (req, res) => {
    const id = Number(req.params.id);
    const finding = findings.find((f) => f.id === id);
    if (finding) {
        res.status(200).json(finding);
    } else {
        res.status(404).json({ error: "Finding not found" });
    }
});

app.post("/findings", (req, res) => {
    const newId =
        findings.length > 0 ? Math.max(...findings.map((f) => f.id)) + 1 : 1;
    const newFinding = { id: newId, ...req.body };
    findings.push(newFinding);
    res.status(201).json(newFinding);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
