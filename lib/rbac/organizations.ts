import {
  createOrganizationSchema,
  type CreateOrganizationInput,
} from "@/lib/validations/auth";
import { db } from "@/lib/db";
export async function createOrganization(
  input: CreateOrganizationInput,
  userId: string,
) {
  const validatedInput = createOrganizationSchema.parse(input);

  const organization = await db.organization.create({
    data: {
      name: validatedInput.name,
      slug: validatedInput.slug,
      memberships: {
        create: {
          userId,
          role: "owner",
          status: "active",
        },
      },
    },
    include: { memberships: true },
  });

  return organization;
}

export async function getUserOrganizations(userId: string) {
  const memberships = await db.membership.findMany({
    where: { userId, status: "active" },
    include: { org: true },
    orderBy: { createdAt: "desc" },
  });

  return memberships.map((membership) => ({
    ...membership.org,
    role: membership.role,
  }));
}
