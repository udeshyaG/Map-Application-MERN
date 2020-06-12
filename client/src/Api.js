const url =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://cors-anywhere.herokuapp.com/https://travel-log-2nhqr0csu.now.sh";

export async function listLogEntries() {
  const response = await fetch(`${url}/api/logs`);
  return response.json();
}

export async function createLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  const response = await fetch(`${url}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(entry),
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    const error = new Error(json.message);
    error.response = json;
    throw error;
  }
}
