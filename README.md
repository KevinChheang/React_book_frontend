# React Book project
This is a single page app where user can get info about books such as author, publisher, description, and where to get it etc. 

The app does required user to signup/login in order to access the app.

### Frontend features
* Login/signup
* Display all books
* Display a single book
* Add/remove book to fav list
* Comment
* Rate a book

### Backend features
* Authenticate user credentials
* Build my own RESTful API
* PosgresQL Database as storage
* JSON schema for data validation

### User flow
* Must signup/login to use the app
* Then will redirect to homepage
	* which displays a list of books
	* can click on any book for details info
		* see book details
		* rate book
		* comment book
		* add book to fav list
* From homepage can navigate to fav book
	* see a list of your fav books
	* can delete books from the list
* From homepage can logout

### Technology stack used
* React
* Node
* Express
* PostgresQL

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
