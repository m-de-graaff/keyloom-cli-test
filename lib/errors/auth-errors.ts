export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export function handleAuthError(error: unknown) {
  if (error instanceof Error) {
    // Handle specific Keyloom errors
    if (error.message.includes("USER_EXISTS")) {
      return {
        message: "A user with this email already exists",
        statusCode: 409,
      };
    }
    if (
      error.message.includes("USER_NOT_FOUND") ||
      error.message.includes("INVALID_CREDENTIALS")
    ) {
      return { message: "Invalid email or password", statusCode: 401 };
    }
  }

  return { message: "An unexpected error occurred", statusCode: 500 };
}
