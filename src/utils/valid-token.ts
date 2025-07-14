export function getValidToken() {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("token_expiry");

  if (!token || !expiry) return null;

  const isExpired = Date.now() > parseInt(expiry);
  if (isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    return null;
  }

  return token;
}
