import React, { useState, useEffect } from "react";

const SearchBar = ({ array, onFilter }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    onFilter(filterArray(array, value));
  }, [value, array]);

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor="searchBar">
        Pesquise por
      </label>
      <input
        id="searchBar"
        className="form-control"
        type="text"
        placeholder="Nome do paciente, matrícula"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

const filterArray = (array, value) => {
  const stringValue = String(value);

  const comparePatientNameAndRegistration = (obj) => {
    return (
      obj.patientName.includes(stringValue) || obj.registration === stringValue
    );
  };

  return array.filter(comparePatientNameAndRegistration);
};

export default SearchBar;
