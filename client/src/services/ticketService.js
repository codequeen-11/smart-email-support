
const API_URL = "http://localhost:5000/api/tickets";

export async function getTickets() {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch tickets");
  }

  return data.data;
}

export async function createTicket(formData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create ticket");
  }

  return data;
}

export async function updateTicketStatus(ticketId, status) {
  const response = await fetch(`${API_URL}/${ticketId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update ticket status");
  }

  return data.data;
}

export async function deleteTicket(ticketId) {
  const response = await fetch(`${API_URL}/${ticketId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete ticket");
  }

  return data.data;
}


export async function getTicketById(ticketId) {
  const response = await fetch(`${API_URL}/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch ticket");
  }

  return data.data;
}
