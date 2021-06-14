import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../comments/CommentForm"
import CommentList from "../comments/CommentList"
import BookApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

import ThumbUpIcon from "../img/thumb_up.png"
import ThumbDownIcon from "../img/thumb_down.png"

import "./BookDetail.css";

/** Book Detail page.
 *
 * Renders information about book, along with the comments for that book.
 *
 * Routed at /books/:isbn
 *
 * Routes -> BookDetail -> CommentList
 * Routes -> BookDetail -> CommentForm
 */

function BookDetail() {
  const { isbn } = useParams();
  const { currentUser } = useContext(UserContext);

  const [book, setBook] = useState(null);
  const [bookIsbn, setBookIsbn] = useState(new Set([]));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [added, setAdded] = useState();
  const [thumbUp, setThumbUp] = useState(0);
  const [thumbDown, setThumbDown] = useState(0);
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState(false);

  useEffect(function getBooksDataOnMount() {
    async function getBooks() {
      setBook(await BookApi.getBook(isbn));
      setBookIsbn(new Set(isbn));
    }

    async function getComs() {
        setComments(await BookApi.getComments());
    }

    async function getRatings() {
        const ratingRes = await BookApi.getRatings(isbn);

        setThumbDown(+ratingRes.dislikes[0].dislikes);
        setThumbUp(+ratingRes.likes[0].likes);
    }

    getBooks();
    getComs();
    getRatings();
  }, [isbn, newComment, rating]);

  /** Checks if a book has been added. */
  function hasBookAdded(isbn) {
    return bookIsbn.has(isbn);
  }

  /** Add a favorite book: make API call and update set of book ISBN. */
  function addFavBook(isbn) {
    if (hasBookAdded(isbn)) return;
    BookApi.addFavBook(currentUser.username, isbn);
    setBookIsbn(new Set([...bookIsbn, isbn]));
  }

  async function handleAddBook(evt) {
    addFavBook(isbn);
    setAdded(true)
  }

  /* Add a comment: make API call and update comments state */
  function addComment(username, isbn, comment) {
    BookApi.addComment(username, isbn, comment);
    setNewComment(!newComment);
  }

  async function handleAddComment(evt) {
      evt.preventDefault();
      addComment(currentUser.username, book.isbn, evt.target[0].defaultValue);
  }

  /* Add a like: make API call and update thumbUp state */
  function addLike(username, isbn) {
    BookApi.addLike(username, isbn);
    setThumbUp(thumbUp + 1);
  }

  function handleThumbUp() {
    addLike(currentUser.username, book.isbn);
    setRated(true)
    setRating(!rating);
  }

  /* Add a dislike: make API call and update thumbDown state */
  function addDislike(username, isbn) {
    BookApi.addDislike(username, isbn);
    setThumbDown(down => down - down * 2);
  }

  function handleThumbDown() {
    addDislike(currentUser.username, book.isbn);
    setRated(true);
    setRating(!rating);
  }

  if (!book) return <LoadingSpinner />;

  return (
      <div className="BookDetail container">
        <div className="row">
            <div className="col-md-12">
                <h1>{book.title}</h1>
                <h4>{book.subtitle}</h4>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <img src={book.img_url}
                    height="600px"
                    width="500px"
                    alt={book.title}
                    className="float-right ml-5" />
            </div>
        </div>
        {/* Thumb up/down, Add button */}
        <button className="BookDetail-btn-thumb" onClick={handleThumbUp} disabled={rated}>
            <img 
                className="BookDetail-img-up mx-3" 
                src={ThumbUpIcon} 
                alt="Thumb up" 
                />
        </button>

        {thumbUp <= 0 ? "" : <small className="text-primary fs-5">{thumbUp}</small>}

        <button className="BookDetail-btn-thumb" onClick={handleThumbDown} disabled={rated}>
            <img
                className="BookDetail-img-down mx-4" 
                src={ThumbDownIcon} 
                alt="Thumb down"
                />
        </button>

        {thumbDown <= 0 ? "" : <small className="text-danger fs-5">{thumbDown}</small>}

        <button 
            className="btn btn-primary my-2 mx-2"
            disabled={added}
            onClick={handleAddBook}
        >
            {added ? "Added" : "Add"}
        </button>
        {/* ##################### */}

        <div className="BookDetail-info">
            <div className="row">
                <div className="col-md-6">
                    <p>ISBN: {book.isbn}</p>
                </div>
                <div className="col-md-6">
                    <p>Page count: {book.pages}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p>Published: {book.yearpublished}</p>
                </div>
                <div className="col-md-6">
                    <p>Publisher: {book.publisher}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p>Author: {book.author}</p>
                </div>
                <div className="col-md-6">
                    <p>Link: <a href={book.link} target="_blank" rel="noreferrer">Get the book</a></p>
                </div>
            </div>
        </div>

        <div className="col-md-12">
                <p className="BookDetail-description">{book.description}</p>
        </div>

        <h4>Share your experience</h4>
        <CommentForm handleAddComment={handleAddComment} />
        {comments.length ? <CommentList comments={comments} /> : ""}
        
      </div>
  );
}

export default BookDetail;
