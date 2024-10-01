import { baseUrl, createDefaultProfile, generateId } from "@/utils";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import Swal from "sweetalert2";

export async function POST(request: NextRequest) {
  const { name, email, password, role } = await request.json();
  const registerUrl = baseUrl + "/user";

  // const name = req.get("name")?.toString();
  // const email = req.get("email")?.toString();
  // const password = req.get("password")?.toString();
  // const role = req.get("role")?.toString();

  if (!name) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Name is required.",
      },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Password is required.",
      },
      { status: 400 }
    );
  }

  if (!password) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Password is required.",
      },
      { status: 400 }
    );
  }

  if (role !== "candidate" && role !== "company") {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Role is required.",
      },
      { status: 400 }
    );
  }

  const newUser: User = {
    id: generateId(),
    name: name,
    email: email,
    password: password,
    imageUrl:
      role === "candidate"
        ? "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o="
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3KRLQ-4_EdCiWdQ5WVmZBhS4HCHiTxV71A&s",
    role: role,
    detailId: generateId(),
    provider: "none",
    createdAt: new Date().toISOString(),
    isVerified: false,
  };

  const users = await fetch(baseUrl + `/user?email=${newUser.email}`);

  const getUser: User[] = await users.json();
  const validateUser = getUser.find((user) => user.email === newUser.email);

  if (validateUser) {
    return NextResponse.json(
      {
        error: "Error",
        message: "User already exist",
      },
      { status: 403 }
    );
  }

  const res = await fetch(registerUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const resultProfile = await createDefaultProfile(
    role,
    newUser.detailId,
    newUser.id
  );

  if (resultProfile?.error) {
    return NextResponse.json(
      {
        error: resultProfile.error,
        message: resultProfile.message,
      },
      { status: resultProfile.status }
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      {
        error: "Failed to register user",
        message: "Something went wrong",
      },
      { status: res.status || 500 }
    );
  }

  return NextResponse.json(
    {
      message: "User registered successfully",
    },
    { status: 201 }
  );
}
