import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "./context";
import { Link, useParams } from "react-router-dom";

const SingleMovie = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState({ show: false, msg: "" });

  let { id } = useParams();

  const fetchSingle = async () => {
    setLoading(true);
    const res = await fetch(`${API_ENDPOINT}&i=${id}`);
    const result = await res.json();
    console.log(result);
    if (result.Response === "True") {
      setMovie(result);
      setLoading(false);
    } else {
      setError({ show: true, msg: `there aren't no things to show` });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSingle();
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error.msg) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          home
        </Link>
      </div>
    );
  }
  return <h2>single movie</h2>;
};

export default SingleMovie;
