import { useState } from "react";

let csrfToken: string | null = null;
let csrfFetchedAt = 0;
const CSRF_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function fetchCsrfToken(): Promise<string> {
  const response = await fetch("/api/auth/csrf", {
    method: "GET",
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch CSRF token: ${response.status}`);
  }

  const data = await response.json();
  if (!data.csrfToken) {
    throw new Error("CSRF token not found in response");
  }

  csrfToken = data.csrfToken;
  csrfFetchedAt = Date.now();
  if (csrfToken === null) {
    throw new Error("CSRF token is null after fetching");
  }
  return csrfToken;
}

async function ensureCsrfToken(): Promise<string> {
  if (csrfToken && Date.now() - csrfFetchedAt < CSRF_TTL_MS) {
    return csrfToken;
  }
  return fetchCsrfToken();
}

async function authFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);

  // Add CSRF token for non-GET requests
  if (!options.method || options.method.toUpperCase() !== "GET") {
    const token = await ensureCsrfToken();
    headers.set("x-keyloom-csrf", token);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "same-origin",
  });

  // If CSRF fails, invalidate token for retry
  if (response.status === 403) {
    csrfToken = null;
    csrfFetchedAt = 0;
  }

  return response;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string, name?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authFetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Registration failed" }));
        throw new Error(errorData.error || "Registration failed");
      }

      return await response.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Login failed" }));
        throw new Error(errorData.error || "Login failed");
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authFetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Logout failed" }));
        throw new Error(errorData.error || "Logout failed");
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authFetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Profile update failed" }));
        throw new Error(errorData.error || "Profile update failed");
      }

      return await response.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Profile update failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, login, logout, updateProfile, loading, error };
}
