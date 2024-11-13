import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar} =useSnackbar();


  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully..',{variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('Error occurred...');
        enqueueSnackbar('Error',{variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div className='p-6'>
      <BackButton />
      <h1 className='text-3xl my-6 text-center font-semibold'>Delete Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-red-500 rounded-xl w-[600px] p-8 mx-auto bg-white shadow-lg'>
        <h3 className='text-2xl text-center text-gray-700 mb-4'>
          Are you sure you want to delete this book?
        </h3>
        <p className="text-lg text-center text-gray-600 mb-6">
          Once deleted, the book cannot be recovered.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            onClick={handleDeleteBook}
          >
            Delete it
          </button>
          <button
            className="px-6 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook; 