import { toPermissionMap } from "@keyloom/core";
import config from "@/keyloom.config";
import { db } from "@/lib/db";

export type UserRole = "owner" | "admin" | "member";
export type Permission =
  | "manage:org"
  | "manage:users"
  | "manage:billing"
  | "read"
  | "write";

export async function getUserRole(
  userId: string,
  orgId: string,
): Promise<UserRole | null> {
  const membership = await db.membership.findUnique({
    where: { userId_orgId: { userId, orgId } },
  });
  return membership?.role as UserRole | null;
}

export async function hasPermission(
  userId: string,
  orgId: string,
  permission: Permission,
): Promise<boolean> {
  const role = await getUserRole(userId, orgId);
  if (!role) return false;

  const permissionMap = toPermissionMap(config.rbac);
  const allowedRoles = permissionMap[permission] || [];

  return allowedRoles.includes(role);
}

export async function requireRole(
  userId: string,
  orgId: string,
  requiredRoles: UserRole[],
): Promise<void> {
  const userRole = await getUserRole(userId, orgId);

  if (!userRole || !requiredRoles.includes(userRole)) {
    throw new Error("Insufficient permissions");
  }
}
