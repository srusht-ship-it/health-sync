import { NextResponse } from "next/server";
import db from "lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check if patient exists
    const [patients] = await db.promise().query("SELECT * FROM patients WHERE email = ?", [email]);
    const patient = Array.isArray(patients) ? patients[0] : null;

    if (!patient) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Login successful
    return NextResponse.json({ message: "Login successful", patient: { id: patient.id, name: patient.name, email: patient.email } }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
