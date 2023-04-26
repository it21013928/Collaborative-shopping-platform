import React, { useState } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    products.filter((product) => {
      return product.name.match(searchInput);
    });
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />

      <table>
        <tr>
          <th>Country</th>
          <th>Continent</th>
        </tr>

        {products.map((country, index) => {
          <div>
            <tr>
              <td>{country.name}</td>
              <td>{country.continent}</td>
            </tr>
          </div>;
        })}
      </table>
    </div>
  );
};

export default SearchBar;
