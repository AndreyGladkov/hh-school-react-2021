import {useState, useEffect} from 'react'

export function fetchWithError(url) {
    return fetch(url)
            .then(handleError)
                .then(response => response.json())
}

function handleError(response) {
    if (!response.ok) throw new Error(response.status)
    return response;
}

function useFetchWithErrorHandling(url)  {

    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (url == null) return;
        fetch(url)
            .then(handleError)
                .then(response => response.json())
                    .then(data => {setData(data); console.log(data); setError()})
                        .catch(error => {setError(error); setData()})
    }, [url])

    return [data, error];
}

export default useFetchWithErrorHandling
