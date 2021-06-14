import React from "react";
import { Link } from "react-router-dom";

import "./BookCard.css";

/** Show limited information about a book
 *
 * Is rendered by BookList to show a "card" for each book.
 *
 * BookList -> BookCard
 */

function BookCard({ isbn, title, subtitle, author, publisher, pages, year, description, img, link }) {
  return (
      <Link className="BookCard col-md-4 py-3" to={`/books/${isbn}`}>
          <img src={img}
                alt={title}
                className=""
                height="400px"
                width="280px" />
          
          <p><small>{title}</small></p>
      </Link>
  );
}

export default BookCard;
