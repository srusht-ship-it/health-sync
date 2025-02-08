import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import db from "lib/db"; // Ensure the path to db is correct

export const config = {
  api: {
    bodyParser: false, // Important: Disables default Next.js body parser
  },
};

// ✅ Handle POST request
export async function POST(req: Request) {
  try {
    // Convert request body to a readable stream for formidable
    const formData = await req.formData();
    const fields: Record<string, string> = {};
    let photoPath = "";

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        fields[key] = value;
      } else {
        // Save the uploaded file
        const file = value as File;
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure directory exists
        await writeFile(`${uploadDir}/${file.name}`, buffer);
        photoPath = `/uploads/${file.name}`;
      }
    }

    // Extract form fields
    const { full_name, age, phone, gender, previous_disease, email, password } = fields;

    // ✅ Validate fields
    if (!full_name || !age || !phone || !gender || !previous_disease || !email || !password) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    // ✅ Insert into MySQL
    const query = `INSERT INTO patients (full_name, age, phone, gender, previous_disease, email, password, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [full_name, age, phone, gender, previous_disease, email, password, photoPath];

    const result: any = await db.execute(query, values);

    // ✅ Response
    if (result) {
      return NextResponse.json({ message: "Patient registered successfully!" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Registration failed!" }, { status: 500 });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
