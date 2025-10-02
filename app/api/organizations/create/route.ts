import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "@keyloom/nextjs";
import { createOrganization } from "@/lib/rbac/organizations";
import { createOrganizationSchema } from "@/lib/validations/auth";
import config from "@/keyloom.config";

export async function POST(request: NextRequest) {
  try {
    // Get the current user session
    const { user } = await getSession(config);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();

    // Validate the input
    const validatedData = createOrganizationSchema.parse(body);

    // Generate slug if not provided
    if (!validatedData.slug) {
      validatedData.slug = validatedData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }

    // Create the organization
    const organization = await createOrganization(validatedData, user.id);

    return NextResponse.json({
      message: "Organization created successfully",
      organization,
    });
  } catch (error: unknown) {
    console.error("Organization creation error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      const zodError = error as unknown as { errors: unknown[] };
      return NextResponse.json(
        { error: "Invalid input data", details: zodError.errors },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Organization slug already exists" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 },
    );
  }
}
