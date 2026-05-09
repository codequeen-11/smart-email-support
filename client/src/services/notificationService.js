// const API_URL = "http://localhost:5000/api/notifications";
const API_URL = `${import.meta.env.VITE_API_URL}/notifications`;

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function getNotifications() {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch notifications");
  }

  return data.data;
}

export async function markNotificationAsRead(id) {
  const response = await fetch(`${API_URL}/${id}/read`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to mark notification as read");
  }

  return data.data;
}

export async function markAllNotificationsAsRead() {
  const response = await fetch(`${API_URL}/read-all`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to mark all notifications as read");
  }

  return data;
}