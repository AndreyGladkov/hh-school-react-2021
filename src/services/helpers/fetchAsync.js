export default async function fetchAsync(url, method, data = null) {
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
        method: method,
        body: method === "GET" ? null : JSON.stringify(data),
        headers,
    });

    const responseJson = await response.json();

    if (response.ok) {
        return responseJson;
    }

    throw new Error(response.status);
}
