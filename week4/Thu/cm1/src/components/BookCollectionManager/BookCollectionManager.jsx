import { useState } from "react";
import "./BookCollectionManager.css";
import Book from "./Book";

const BookCollectionManager = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    language: "",
    edition: "",
    pages: "",
    rating: "",
    year: "",
  });

  // Handle input change for title
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevNewBook) => ({ ...prevNewBook, [name]: value }));
  };

  // Add a new book to the list
  const addBook = () => {
    if (
      newBook.title.trim() !== "" &&
      newBook.author.trim() !== "" &&
      newBook.genre.trim() !== "" &&
      newBook.language.trim() !== "" &&
      newBook.edition.trim() !== "" &&
      newBook.pages.trim() !== "" &&
      newBook.rating.trim() !== "" &&
      newBook.year.trim() !== ""
    ) {
      setBooks((b) => [
        ...b,
        {
          title: newBook.title,
          author: newBook.author,
          genre: newBook.genre,
          language: newBook.language,
          edition: newBook.edition,
          pages: Number(newBook.pages),
          rating: Number(newBook.rating),
          year: Number(newBook.year),
        },
      ]);
      setNewBook({
        title: "",
        author: "",
        genre: "",
        language: "",
        edition: "",
        pages: "",
        rating: "",
        year: "",
      }); // Clear the input fields
    }
  };

  // Delete a book from the list
  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  return (
    <div className="app-container">
      <h1>Book Collection Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter book title..."
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Enter author name..."
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Enter genre..."
          name="genre"
          value={newBook.genre}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Enter language..."
          name="language"
          value={newBook.language}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Enter edition..."
          name="edition"
          value={newBook.edition}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="number"
          placeholder="Enter pages..."
          name="pages"
          value={newBook.pages}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="number"
          placeholder="Enter rating..."
          name="rating"
          value={newBook.rating}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <input
          type="number"
          placeholder="Enter year..."
          name="year"
          value={newBook.year}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <button onClick={addBook} className="add-button">
          Add Book
        </button>
      </div>

      <div className="books-section">
        <h2>Your Books ({books.length})</h2>
        {books.length === 0 ? (
          <p className="empty-message">No books yet. Add one to get started!</p>
        ) : (
          <ol className="books-list">
            {books.map((book, index) => (
              <Book key={index} book={book} onDelete={() => deleteBook(index)} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default BookCollectionManager;
