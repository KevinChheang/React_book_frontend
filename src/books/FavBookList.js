import React, { useContext, useState, useEffect } from "react";
import BookApi from "../api/api";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";

/** Show a list of user's fav books.
 *
 * This is routed to at /favBooks
 */

function FavBookList() {
    const { currentUser } = useContext(UserContext);

    const [favBooks, setFavBooks] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(function loadFavBooksOnMount() {
        async function getFavBooks() {
            const favBooksRes = await BookApi.getFavBooks(currentUser.username);
            setFavBooks(favBooksRes);
        }

        getFavBooks();
    }, [deleted, currentUser.username]);

    /** Delete a favorite book: make API call and update favBooks */
    async function deleteFavBook(isbn) {
        BookApi.deleteFavBook(currentUser.username, isbn);
        setFavBooks(await BookApi.getFavBooks(currentUser.username));
        setDeleted(!deleted);
    }

    async function handleDeleteBook(evt) {
        deleteFavBook(evt.target.previousSibling.className);
      }

    return (
        <div className="FavBookList container bg-white col-md-8">
            { favBooks.length !== 0 ?
                (<div className="row">
                    {favBooks.map(favBook => (
                        <div key={favBook.isbn} className="col-md-4">
                            <Link className={favBook.isbn} to={`/books/${favBook.isbn}`}>
                                <div>
                                    <img 
                                        src={favBook.img_url} 
                                        alt={favBook.title}
                                        height="400px"
                                        width="280px" />
                                </div>
                            </Link>
                            <button onClick={handleDeleteBook} className="btn btn-danger my-2">Remove</button>
                        </div>
                    ))}
                </div>)
                : (<h3 className="text-center">No favorite book yet.</h3>)
            }
        </div>
    );
}


export default FavBookList;
