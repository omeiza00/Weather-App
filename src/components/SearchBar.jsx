import { useEffect, useState, useRef } from "react";
import { searchLocations } from "../services/weatherService";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import "../styles/SearchBar.css";

function SearchBar({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setHasSearched(false);

    if (value.trim() === "") {
      setResults([]);
      setShowResults(false);
      setSearchError(null);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    setSearchError(null);
    setHasSearched(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = query.trim();
    if (trimmed === "") return;

    setSearchLoading(true);
    setSearchError(null);

    try {
      const locations = await searchLocations(trimmed);
      setResults(locations);
      setShowResults(true);
    } catch (error) {
      setSearchError(
        error.message || "Something went wrong while searching...",
      );
      setResults([]);
    } finally {
      setSearchLoading(false);
      setHasSearched(true);
    }
  };

  const handleSelect = (location) => {
    onLocationSelect(location);
    setResults([]);
    setQuery("");
    setShowResults(false);
    setHasSearched(false)
  };

  return (
    <div className="search-container" ref={containerRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a location"
          className="search-bar-input"
        />
        {query && (
          <button type="button" className="clear-btn" onClick={handleClear}>
            <XIcon size={16} weight="bold" />
          </button>
        )}
        <button type="submit" className="search-btn">
          <MagnifyingGlassIcon size={18} weight="bold" />
        </button>
      </form>
      {searchLoading && <p className="search-process-text">Searching...</p>}
      {searchError && <p className="search-error-text">{searchError}</p>}

      {!searchLoading &&
        !searchError &&
        showResults &&
        results.length === 0 &&
        hasSearched && <p className="no-location-text">No locations found.</p>
    }



      {showResults && results.length > 0 && (
        <ul className="search-results-container">
          {results.map((location) => {
            return (
              <li
                className="search-result"
                key={location.id}
                onClick={() => handleSelect(location)}
              >
                {location.name}, {location.country}
                {location.admin1 ? ` (${location.admin1})` : ""}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
