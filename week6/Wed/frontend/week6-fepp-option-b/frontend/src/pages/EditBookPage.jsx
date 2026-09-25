import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const EditBookPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : null;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [dueDate, setDueDate] = useState("");
  const [borrower, setBorrower] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setAuthor(data.author);
      setIsbn(data.isbn);
      setPublisher(data.publisher);
      setGenre(data.genre);
      setIsAvailable(data.availability.isAvailable ? "true" : "false");
      setDueDate(
        data.availability.dueDate
          ? data.availability.dueDate.split("T")[0]
          : ""
      );
      setBorrower(data.availability.borrower || "");
    };
    fetchBook();
  }, [id]);

  const updateBook = async (book) => {
  try {
    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,    // <-- ADD THIS
      },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to update book");
    return true;
  } catch (error) {
    console.error("Error updating book:", error);
    return false;
  }
};

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedBook = {
      title,
      author,
      isbn,
      publisher,
      genre,
      availability: {
        isAvailable: isAvailable === "true",
        dueDate: dueDate || null,
        borrower,
      },
    };
    const success = await updateBook(updatedBook);
    if (success) {
      navigate(`/books/${id}`);
    }
  };

  return (
    <div className="create">
      <h2>Update Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input type="text" required
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <label>Author:</label>
        <input type="text" required
          value={author}
          onChange={(e) => setAuthor(e.target.value)} />
        <label>ISBN:</label>
        <input type="text" required
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)} />
        <label>Publisher:</label>
        <input type="text" required
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)} />
        <label>Genre:</label>
        <input type="text" required
          value={genre}
          onChange={(e) => setGenre(e.target.value)} />
        <label>Available:</label>
        <select
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.value)}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Due Date:</label>
        <input type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} />
        <label>Borrower:</label>
        <input type="text"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)} />
        <button>Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;

