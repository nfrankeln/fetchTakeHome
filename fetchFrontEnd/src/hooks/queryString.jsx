import { useEffect, useState } from 'react';

function useQueryString() {
  const [queryString, setQueryString] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const keyValuePairs = [];
    for (const [key, value] of params) {
      keyValuePairs.push({ key: key, value: value });
    }

    setQueryString(keyValuePairs);
  }, [window.location.search]);

  function deleteQueryString(key) {
    setQueryString(prev => prev.filter(query => query.key !== key));
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(key);
    window.history.replaceState(null, null, `?${searchParams.toString()}`)
    window.location.reload();
  }

  return [queryString, deleteQueryString];
}

export default useQueryString;

