import {useEffect, useState} from 'react';

export const useFetch = (url, options = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    let abort = () => {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const abortController = new AbortController();
                const signal = abortController.signal;
                abort = abortController.abort.bind(abortController);
                const res = await fetch(url, {...options, signal});
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData().then();
        return () => {
            abort();
        };
    }, []);
    return { response, error, abort };
};
