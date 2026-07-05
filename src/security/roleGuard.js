export function hasRole(user, role = "user") {
  if (!user) return false;

  return user.role === role;
}
