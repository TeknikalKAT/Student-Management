"use client";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    if (!name.trim() || !email.trim()) return;
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 60% 40%, #0a174e 0%, #274690 80%, #8ec6ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          width: "100%",
          margin: "0 auto",
          padding: 24,
          background: "#0a174e",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          color: "#fff",
          zIndex: 1,
          border: "3px solid #000",
          backdropFilter: "blur(16px)",
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 24,
            textAlign: "center",
            letterSpacing: 1,
            color: "#fff",
          }}
        >
          Students
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 6,
                border: "2px solid #000",
                background: "#fff",
                color: "#0a174e",
              }}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 6,
                border: "2px solid #000",
                background: "#fff",
                color: "#0a174e",
              }}
            />
          </div>
          <button
            onClick={addStudent}
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: 6,
              border: "2px solid #000",
              background: "#1976d2",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 16,
              marginTop: 8,
            }}
          >
            Add
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {students.length === 0 && (
            <li style={{ textAlign: "center", color: "#aaa", marginTop: 16 }}>
              No students yet.
            </li>
          )}
          {students.map((s, i) => (
            <li
              key={i}
              style={{
                background: "#11235a",
                borderRadius: 8,
                padding: 14,
                marginBottom: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 18, color: "#fff" }}>{s.name}</span>
              <span style={{ color: "#fff", fontSize: 16 }}>{s.email}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Optional: Add a blurred overlay for extra effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 60% 40%, #0a174e 0%, #274690 80%, #8ec6ff 100%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
    </div>
  );
} 