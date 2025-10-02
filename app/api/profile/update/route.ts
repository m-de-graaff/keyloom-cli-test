import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "@keyloom/nextjs";
import { db } from "@/lib/db";
import config from "@/keyloom.config";

export async function POST(request: NextRequest) {
  try {
    // Get the current user session
    const { user } = await getSession(config);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const { name, email, image } = await request.json();

    // Basic validation
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (image && !isValidUrl(image)) {
      return NextResponse.json(
        { error: "Invalid image URL format" },
        { status: 400 },
      );
    }

    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await db.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json(
          { error: "Email is already taken by another user" },
          { status: 400 },
        );
      }
    }

    // Update the user profile
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name: name || null,
        email: email || null,
        image: image || null,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate URL format
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
