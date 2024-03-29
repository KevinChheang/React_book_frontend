import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on BookList so that it can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * BookList -> SearchForm
 */

function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
              className="SearchForm-input mx-3"
              id="SearchForm-search"
              name="searchTerm"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleChange}
          />
          <button type="submit" className="SearchForm-btn">
            Submit
          </button>
        </form>
      </div>
  );
}

export default SearchForm;
