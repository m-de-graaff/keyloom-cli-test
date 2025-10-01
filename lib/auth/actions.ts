"use server";

import { register, login, logout } from "@keyloom/core/runtime";
import { argon2idHasher } from "@keyloom/core";
import { redirect } from "next/navigation";
import { registerSchema, loginSchema } from "@/lib/validations/auth";
import config from "@/keyloom.config";

export async function registerAction(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  try {
    const validatedData = registerSchema.parse(rawData);

    await register(validatedData, {
      adapter: config.adapter,
      hasher: argon2idHasher,
    });

    redirect("/sign-in?message=Registration successful");
  } catch (error: any) {
    if (error.code === "USER_EXISTS") {
      throw new Error("A user with this email already exists");
    }
    throw new Error("Registration failed. Please try again.");
  }
}

export async function loginAction(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const validatedData = loginSchema.parse(rawData);

    const { session } = await login(
      { ...validatedData, ttlMinutes: 60 * 24 },
      {
        adapter: (config as any).adapter,
        hasher: argon2idHasher,
      },
    );

    // Set session cookie and redirect
    redirect("/dashboard");
  } catch (error: any) {
    if (
      error.code === "USER_NOT_FOUND" ||
      error.code === "INVALID_CREDENTIALS"
    ) {
      throw new Error("Invalid email or password");
    }
    throw new Error("Login failed. Please try again.");
  }
}

export async function logoutAction() {
  // Logout is handled by the CLI-generated API route
  redirect("/api/auth/logout");
}
