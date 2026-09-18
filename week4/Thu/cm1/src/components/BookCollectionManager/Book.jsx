const Book = ({ book, onDelete }) => {
  return (
    <li className="book-item">
                <div className="book-info">
                  <span className="book-title">{book.title}</span>
                  <span className="book-author">by {book.author}</span>
                  <span className="book-genre">{book.genre}</span>
                  <span className="book-language">{book.language}</span>
                  <span className="book-edition">{book.edition}</span>
                  <span className="book-pages">{book.pages}</span>
                  <span className="book-rating">{book.rating}</span>
                  <span className="book-year">{book.year}</span>
                </div>
                <button
                  onClick={onDelete}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
  );
};

export default Book;