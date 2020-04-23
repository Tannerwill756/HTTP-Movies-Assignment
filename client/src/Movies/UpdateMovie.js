import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const [item, setItem] = useState(initialMovie);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = e.target.value.split(",");
    }
    setItem({
      ...item,
      [e.target.name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        props.setMovieList([...props.movieList, res.data]);
        push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Update Movies</h1>
      <form onSubmit={submitHandler}>
        <label>Update title:</label>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={changeHandler}
        />

        <label>Update director:</label>
        <input
          type="text"
          name="director"
          value={item.director}
          onChange={changeHandler}
        />

        <label>Update metascore:</label>
        <input
          type="text"
          name="metascore"
          value={item.metascore}
          onChange={changeHandler}
        />

        <label>Update stars:</label>
        <input
          type="text"
          name="stars"
          value={item.stars}
          onChange={changeHandler}
        />

        <button>Submit Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
