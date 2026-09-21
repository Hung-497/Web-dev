import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [isAvailable, setIsAvailable] = useState("false");
  const [borrower, setBorrower] = useState("");

  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setAuthor(data.author);
      setIsbn(data.isbn);
      setIsAvailable(data.availability.isAvailable ? "true" : "false");
      setBorrower(data.availability.borrower || "");
    };
    fetchBook();
  }, [id]);

  const updateBook = async (updatedBook) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });
      if (!res.ok) {
        throw new Error("Failed to update book");
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      isbn,
      availability: {
        isAvailable: isAvailable === "true",
        borrower,
      },
    };

    updateBook(updatedBook);
    navigate(`/books/${id}`);
  }
  return (
    <div className="create">
      <h2>Update Book</h2>
    </div>
  );
};

export default EditBookPage;

