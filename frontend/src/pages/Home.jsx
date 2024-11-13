import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import logo from "/src/assets/BookStoreLogo.png";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {" "}
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        {/* Logo  */}
        <div className="flex justify-between items-center mb-8">
          <img src={logo} alt="Logo" className="w-20 h-18" />{" "}
          <h1
            className="text-4xl font-semibold text-gray-800 text-center flex-grow bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text transform hover:scale-105 transition-all duration-300"
          >
            Book List
          </h1>
          <div className="w-19 h-18"></div>{" "}
        </div>

        {/* Add Book Button */}
        <div className="flex justify-end mb-6">
          <Link to="/books/create">
            <MdOutlineAddBox className="text-5xl text-sky-800 hover:text-sky-600 transition duration-200 cursor-pointer" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border border-slate-300 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="p-3 border-r border-slate-300">No</th>
                <th className="p-3 border-r border-slate-300">Title</th>
                <th className="p-3 border-r border-slate-300 max-md:hidden">
                  Author
                </th>
                <th className="p-3 border-r border-slate-300 max-md:hidden">
                  Publish Year
                </th>
                <th className="p-3">Operations</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {books.map((book, index) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-3 text-center border-r border-slate-200">
                    {index + 1}
                  </td>
                  <td className="p-3 text-center border-r border-slate-200">
                    {book.title}
                  </td>
                  <td className="p-3 text-center border-r border-slate-200 max-md:hidden">
                    {book.author}
                  </td>
                  <td className="p-3 text-center border-r border-slate-200 max-md:hidden">
                    {book.publishYear}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-700 hover:text-green-500 transition duration-200" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-700 hover:text-yellow-500 transition duration-200" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-700 hover:text-red-500 transition duration-200" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
