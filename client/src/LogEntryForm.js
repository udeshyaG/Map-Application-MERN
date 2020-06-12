import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";

import { createLogEntry } from "./Api";

const LogEntryForm = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {error ? <h3 className="error">{error}</h3> : null}
      <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="apiKey">Api Key - gangtok</label>
        <input type="password" name="apiKey" required ref={register} />

        <label htmlFor="title">Title</label>
        <input type="text" name="title" required ref={register} />

        <label htmlFor="comments">Comments</label>
        <textarea name="comments" rows="3" ref={register}></textarea>

        <label htmlFor="description">Description</label>
        <textarea name="description" rows="3" ref={register}></textarea>

        <label htmlFor="image">Image URL</label>
        <input type="text" name="image" ref={register} />

        <label htmlFor="Rating">Rating</label>
        <input type="number" name="rating" ref={register} min={1} max={5} />

        <button disabled={loading}>
          {loading ? "Loading" : "Add Location"}
        </button>
      </form>
    </Fragment>
  );
};

export default LogEntryForm;
