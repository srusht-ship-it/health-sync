import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "lib/db"; // Import the database connection

export async function POST(req) {
  try {
    const formData = await req.formData();
    const full_name = formData.get("full_name");
    const age = formData.get("age");
    const phone = formData.get("phone");
    const gender = formData.get("gender");
    const specialization = formData.get("specialization");
    const email = formData.get("email");
    const password = formData.get("password");

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert data into MySQL
    const [result] = await db.execute(
      "INSERT INTO doctors (full_name, age, phone, gender, specialization, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [full_name, age, phone, gender, specialization, email, hashedPassword]
    );

    if (result.affectedRows === 1) {
      return NextResponse.json({ message: "Doctor registered successfully!" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Failed to register doctor." }, { status: 500 });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
