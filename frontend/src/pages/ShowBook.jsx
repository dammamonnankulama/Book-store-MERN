import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
 
const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log("Book ID:", id); // Check if this logs the correct book ID

  useEffect(() => {
    setLoading(true);
    axios
       .get(`http://localhost:5555/books/${id}`)
       .then((response) => {
         setBook(response.data);
         setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen'>
  <BackButton />
  <h1 className='text-4xl font-semibold text-center text-gray-800 mb-8'>
    Show Book
  </h1>
  {loading ? (
    <Spinner />
  ) : (
    <div className='flex flex-col border-4 border-sky-400 rounded-xl w-full max-w-lg p-8 mx-auto bg-white shadow-2xl transform hover:scale-105 transition-all duration-300'>
      <div className='my-6'>
        <span className='text-xl font-medium text-gray-600'>Id:</span>
        <span className='text-lg text-gray-800'>{book._id}</span>
      </div>
      <div className='my-6'>
        <span className='text-xl font-medium text-gray-600'>Title:</span>
        <span className='text-lg text-gray-800'>{book.title}</span>
      </div>
      <div className='my-6'>
        <span className='text-xl font-medium text-gray-600'>Author:</span>
        <span className='text-lg text-gray-800'>{book.author}</span>
      </div>
      <div className='my-6'>
        <span className='text-xl font-medium text-gray-600'>Publish Year:</span>
        <span className='text-lg text-gray-800'>{book.publishYear}</span>
      </div>
    </div>
  )}
</div>

  );
};

export default ShowBook;