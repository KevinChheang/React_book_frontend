import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BookApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BookApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }

    /* Get all books (filtered by title if not undefined) */
    static async getBooks(title) {
        const res = await this.request("books", {title});
        return res.books;
    }

    /* Get a single book */
    static async getBook(isbn) {
      const res = await this.request(`books/${isbn}`);
      return res.book;
    }

    /* Add a book to fav list */
    static async addFavBook(username, isbn) {
      await this.request(`users/${username}/books/${isbn}`, {}, "post");
    }

    /* Delete a book from fav list */
    static async deleteFavBook(username, isbn) {
      await this.request(`users/${username}/books/${isbn}`, {}, "delete")
    }

    /* Get comments */
    static async getComments() {
      const res = await this.request("comments");
      return res.comments;
    }

    /* Add a comment */
    static async addComment(username, isbn, comment) {
      await this.request(`users/${username}/books/${isbn}/comment`, {comment}, "post");
    }

    /* Add a like */
    static async addLike(username, isbn) {
      await this.request(`users/${username}/ratings/${isbn}/like`, {}, "post");
    }

    /* Get ratings */
    static async getRatings(isbn) {
      const res = await this.request(`ratings/${isbn}`);
      return res.ratingsRes;
    }

    /* Add a dislike */
    static async addDislike(username, isbn) {
      await this.request(`users/${username}/ratings/${isbn}/dislike`, {}, "post");
    }

    /* Get current user's fav books */
    static async getFavBooks(username) {
      const res = await this.request(`users/favbook/${username}`);
      return res.favBooks;
    }

    /** Get the current user. */
    static async getCurrentUser(username) {
      let res = await this.request(`users/${username}`);
      return res.user;
    }

    /** Get token for login from username, password. */
    static async login(data) {
      let res = await this.request(`auth/token`, data, "post");
      return res.token;
    }

    /** Signup for site. */
    static async signup(data) {
      let res = await this.request("auth/register", data, "post");
      console.log("Token", res.token);
      return res.token;
    }
}

export default BookApi;