import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import BookApi from "../api/api";
import BookCard from "./BookCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of books.
 *
 * On mount, loads books from API.
 * Re-loads filtered books on submit from search form.
 *
 * This is routed to at /books
 *
 * Routes -> { BookCard, SearchForm }
 */

function BookList() {
  const [books, setBooks] = useState(null);

  useEffect(function getBookOnMount() {
    search();
  }, []);

  /** Triggered by search form submit; reloads books. */
  async function search(title, author) {
    let books = await BookApi.getBooks(title, author);
    setBooks(books);
  }

  if (!books) return <LoadingSpinner />;

  return (
      <div className="BookList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {books.length
            ? (
                <div className="BookList-list container">
                    <div className="row">
                        {books.map(b => (
                                    <BookCard
                                        key={b.isbn}
                                        isbn={b.isbn}
                                        title={b.title}
                                        subtitle={b.subtitle}
                                        author={b.author}
                                        publisher={b.publisher}
                                        pages={b.pages}
                                        year={b.year_published}
                                        description={b.description}
                                        img={b.img_url}
                                        link={b.link}
                                    />
                        ))}
                    </div> 
                </div>
            ) : (
                <p className="lead">Sorry, no books were found! Please re-iterate search term.</p>
            )}
      </div>
  );
}

export default BookList;
