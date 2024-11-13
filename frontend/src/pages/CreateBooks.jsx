import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} =useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully..',{variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('Error occurred... Check the console');
        enqueueSnackbar('Error',{variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <BackButton />
      <h1 className="text-4xl font-semibold my-6 text-gray-800">Create a New Book</h1>

      {loading && <Spinner />}

      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col">
          <label className="text-lg text-gray-600 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            className="border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-gray-600 mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            className="border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-gray-600 mb-2">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            placeholder="Enter publish year"
            className="border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition"
          onClick={handleSaveBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;