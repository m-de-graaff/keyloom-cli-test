import { getSession } from '@keyloom/nextjs';
import { getUserRole, hasPermission, type UserRole, type Permission } from '@/lib/rbac/helpers';
import { redirect } from 'next/navigation';
import config from '@/keyloom.config';

interface RequireAuthOptions {
  redirectTo?: string;
}

interface RequireRoleOptions extends RequireAuthOptions {
  orgId: string;
  roles: UserRole[];
  fallbackPath?: string;
}

interface RequirePermissionOptions extends RequireAuthOptions {
  orgId: string;
  permission: Permission;
  fallbackPath?: string;
}

/**
 * Server-side function to require authentication
 */
export async function requireAuth(options: RequireAuthOptions = {}) {
  const { redirectTo = '/sign-in' } = options;
  
  const { user } = await getSession(config);
  
  if (!user) {
    redirect(redirectTo);
  }
  
  return { user };
}

/**
 * Server-side function to require specific role in an organization
 */
export async function requireRole(options: RequireRoleOptions) {
  const { orgId, roles, redirectTo = '/sign-in', fallbackPath = '/dashboard' } = options;
  
  const { user } = await requireAuth({ redirectTo });
  
  const userRole = await getUserRole(user.id, orgId);
  
  if (!userRole || !roles.includes(userRole)) {
    redirect(fallbackPath);
  }
  
  return { user, role: userRole };
}

/**
 * Server-side function to require specific permission in an organization
 */
export async function requirePermission(options: RequirePermissionOptions) {
  const { orgId, permission, redirectTo = '/sign-in', fallbackPath = '/dashboard' } = options;
  
  const { user } = await requireAuth({ redirectTo });
  
  const hasRequiredPermission = await hasPermission(user.id, orgId, permission);
  
  if (!hasRequiredPermission) {
    redirect(fallbackPath);
  }
  
  const userRole = await getUserRole(user.id, orgId);
  
  return { user, role: userRole };
}

/**
 * Client-side hook for role-based rendering
 */
export function useRoleGuard() {
  const checkRole = (userRole: UserRole | null, requiredRoles: UserRole[]): boolean => {
    return userRole ? requiredRoles.includes(userRole) : false;
  };

  const checkPermission = (userRole: UserRole | null, permission: Permission): boolean => {
    if (!userRole) return false;
    
    // Simple permission check based on the config roles
    const rolePermissions: Record<UserRole, Permission[]> = {
      owner: ['manage:org', 'manage:users', 'manage:billing', 'read', 'write'],
      admin: ['manage:users', 'read', 'write'],
      member: ['read'],
    };
    
    return rolePermissions[userRole]?.includes(permission) || false;
  };

  return { checkRole, checkPermission };
}

/**
 * Higher-order component for role-based rendering
 */
interface RoleGuardProps {
  userRole: UserRole | null;
  requiredRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ userRole, requiredRoles, children, fallback = null }: RoleGuardProps) {
  const { checkRole } = useRoleGuard();
  
  if (!checkRole(userRole, requiredRoles)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

/**
 * Higher-order component for permission-based rendering
 */
interface PermissionGuardProps {
  userRole: UserRole | null;
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGuard({ userRole, permission, children, fallback = null }: PermissionGuardProps) {
  const { checkPermission } = useRoleGuard();
  
  if (!checkPermission(userRole, permission)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}