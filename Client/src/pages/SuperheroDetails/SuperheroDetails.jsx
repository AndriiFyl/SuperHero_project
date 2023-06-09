import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styles from "./SuperheroDetails.module.css";

const SuperheroDetails = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/superheroes/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.error);
        }
        return res.json();
      })
      .then((res) => {
        setSuperhero(res);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleDelete = () => {
    const confirm = window.confirm(
      `Are you sure you want to delete superhero "${superhero.nickname}"?`
    );
    if (!confirm) {
      return;
    }

    fetch(`http://localhost:5000/api/superheroes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.error);
        }
        return res.json();
      })
      .then(() => {
        alert("Superhero deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.wrapper}>
          <p className={styles.hero_info}>Nickname: {superhero.nickname}</p>
          <p className={styles.hero_info}>Real name: {superhero.real_name}</p>
          <p className={styles.hero_info}>
            Description: {superhero.origin_description}
          </p>
          <p className={styles.hero_info}>
            Super powers: {superhero.superpowers}
          </p>
          <p className={styles.hero_info}>
            Catch phrase: {superhero.catch_phrase}
          </p>
          <p className={styles.hero_info}>
            hero images:
            <div className={styles.imagesBlock}>
              {superhero.images.map((image) => (
                <img
                  src={`http://localhost:5000/public/images/${image}`}
                  alt={image}
                  key={image}
                  className={styles.image}
                />
              ))}
            </div>
          </p>

          <NavLink className="button greenButton" to={`/hero/${id}/edit`}>
            Edit
          </NavLink>
          <button className="button redButton" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default SuperheroDetails;
