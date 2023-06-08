import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;

  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:5000/api/superheroes?page=${page}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setHeroes(data.heroes);
        setTotalPages(Math.ceil(data.totalCount / limit));
        setIsLoading(false);
      });
  }, [page]);

  return (
    <div>
      <h3 className="pageTitle">Home Page</h3>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.heroesContainer}>
            {heroes.map((hero) => (
              <div key={hero._id} className={styles.heroBlock}>
                <img
                  src={`http://localhost:5000/public/images/${hero.images[0]}`}
                  alt={hero.nickname}
                />
                <div className={styles.heroBlockInfo}>
                  <NavLink to={`/hero/${hero._id}`}>
                    Nickname: {hero.nickname}
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className={styles.paginationContainer}>
              {Array(totalPages)
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.paginationButton} ${
                      index + 1 === page ? styles.paginationButtonActive : ""
                    }`}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
