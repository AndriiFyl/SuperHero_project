import React, { useState } from "react";
import styles from "./CreateSuperhero.module.css";
import { useNavigate } from "react-router-dom";
import SuperheroForm from "../../components/SuperheroForm/SuperheroForm";

const CreateSuperhero = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    fetch("http://localhost:5000/api/superheroes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status !== 200) {
          throw new Error(responseJson.error);
        }
        return responseJson;
      })
      .then(() => {
        alert("Superhero created successfully");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.form_wrapper}>
      <h3 className="pageTitle">Create your Superhero</h3>

      <SuperheroForm handleSubmit={handleSubmit} />
    </div>
  );
};
export default CreateSuperhero;
