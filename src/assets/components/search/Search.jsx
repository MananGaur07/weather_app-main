import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../api.jsx";

export const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className="custom-async-paginate"
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#444" : "#333",
          borderRadius: "25px",
          padding: "5px",
          boxShadow: state.isFocused
            ? "0 0 10px #00bcd4"
            : "0 0 5px rgba(0, 0, 0, 0.2)",
          borderColor: state.isFocused ? "#00bcd4" : "#fff",
          transition: "all 0.3s ease-in-out",
        }),
        input: (base) => ({
          ...base,
          color: "#fff",
        }),
        placeholder: (base) => ({
          ...base,
          color: "rgba(255, 255, 255, 0.7)",
        }),
        singleValue: (base) => ({
          ...base,
          color: "#fff",
        }),
      }}
    />
  );
};
