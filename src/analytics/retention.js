export function trackRetention(userId) {
  const users = JSON.parse(localStorage.getItem("dm_users")) || [];

  if (!users.includes(userId)) {
    users.push(userId);
  }

  localStorage.setItem("dm_users", JSON.stringify(users));
}
