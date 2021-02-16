export function fetchWithError(url) {
    return fetch(url)
            .then(handleError)
                .then(response => response.json())
}

function handleError(response) {
    if (!response.ok) throw new Error(response.status)
    return response;
}
