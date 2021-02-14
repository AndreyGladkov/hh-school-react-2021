import {useState, useEffect} from 'react'

function handleError(response) {
    if (!response.ok) throw new Error(response.status)
    return response;
}

function useFetchWithErrorHandling(url)  {

    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(url)
            .then(handleError)
                .then(response => response.json())
                    .then(setData)
                        .catch(setError)
    }, [url])

    return [data, error];
}

export default useFetchWithErrorHandling
