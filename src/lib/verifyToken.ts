export async function verifyToken(authHeader: string | null): Promise<boolean> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.split('Bearer ')[1];
  if (!token) return false;

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return false;

  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: token
      })
    });
    const data = await res.json();
    if (data.error) {
      return false;
    }
    if (data.users && data.users.length > 0) {
      return true;
    }
  } catch (error) {
    console.error("Token verification error:", error);
  }
  return false;
}
