// Utility to map Firebase Auth error codes to user-friendly messages
// Extend this map as needed for new error codes

const FIREBASE_AUTH_ERROR_MAP: Record<string, string> = {
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/missing-password': 'Please enter your password.',
  'auth/missing-email': 'Please enter your email address.',
  // Add more as needed
}

export function mapFirebaseAuthError(error: unknown): string {
  if (typeof error === 'object' && error && 'code' in error && typeof (error as any).code === 'string') {
    const code = (error as any).code
    return FIREBASE_AUTH_ERROR_MAP[code] || 'The email address or password you entered is incorrect.'
  }
  if (typeof error === 'string') {
    return FIREBASE_AUTH_ERROR_MAP[error] || 'The email address or password you entered is incorrect.'
  }
  return 'The email address or password you entered is incorrect.'
}
