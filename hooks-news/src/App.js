import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function App() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const result = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setHits(result.data.hits);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch();
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current.focus();
  };

  const displayDiv = () => {
    if (isError === true) {
      return (
        <div className="text-red-500 font-bold">
          Error occured while fetching result. #{errorMessage.message}
        </div>
      );
    }
    return (
      <ul className="list-reset leading-normal">
        {hits.map((hit) => (
          <li
            className="text-indigo-700 hover:text-indigo-900"
            key={hit.objectID}
          >
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <img
        src="/images/react.png"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darked font-thin">Hooks News</h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={query}
          name="query"
          ref={inputRef}
          className="border p-1 rounded"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-indigo-400 rounded m-1 p-1" type="submit">
          Search
        </button>
        <button
          className="bg-green-300 text-white p-1 rounded"
          type="button"
          onClick={clearSearch}
        >
          Clear
        </button>
      </form>
      {isLoading ? (
        <div className="fond-bold text-orange-dark">
          The Results are Loading. Please be Patient.
        </div>
      ) : (
        displayDiv()
      )}
    </div>
  );
}
