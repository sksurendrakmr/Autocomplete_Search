import React, { useEffect, useRef, useState } from "react";
import { fetchCountries, ResponseData } from "../api/constants";
import { useDebounce } from "./useDebounce";

export const useAutoComplete = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [suggestions, setSuggestions] = useState<ResponseData[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState("");

  const { debounceValue, setDebounceValue } = useDebounce(searchedValue, 2000);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  console.log("Debounce value", debounceValue);

  useEffect(() => {
    if (debounceValue) {
      setLoading(true);
      fetchCountries<ResponseData[]>(debounceValue)
        .then((response) => {
          if (response) {
            setSuggestions(response);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Error while retrieving country by name", error);
          setLoading(false);
        });
    }
  }, [debounceValue]);

  const handleClick = (selectedCountry: string) => {
    setSearchedValue("");
    setSelectedSuggestions(selectedCountry);
    setActiveSuggestion(0);
    setSuggestions([]);
    setDebounceValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const eventType = event.key;
    if (eventType === "ArrowDown" && activeSuggestion < suggestions.length) {
      setActiveSuggestion((prev) => prev + 1);
    } else if (eventType === "ArrowUp" && activeSuggestion > 1) {
      setActiveSuggestion((prev) => prev - 1);
    } else if (eventType === "Enter") {
      const selectedCountryName = suggestions[activeSuggestion - 1].name;
      handleClick(selectedCountryName);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchedValue(value);
  };

  return {
    handleChange,
    suggestions,
    searchInputRef,
    handleKeyDown,
    loading,
    searchedValue,
    selectedSuggestions,
    handleClick,
    activeSuggestion,
  };
};
