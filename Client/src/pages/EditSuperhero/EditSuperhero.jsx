import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import SuperheroForm from "../../components/SuperheroForm/SuperheroForm";

const EditSuperhero = () => {
    const [superhero, setSuperhero] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/api/superheroes/${id}`)
            .then(res => res.json())
            .then(res => {
                setSuperhero(res)
                setIsLoading(false)
            })
    }, []);

    const handleSubmit = (data) => {
        fetch(`http://localhost:5000/api/superheroes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            const responseJson = await response.json()
            if (response.status !== 200) {
                throw new Error(responseJson.error)
            }
            return responseJson
        }).then(() => {
            alert("Superhero updated successfully")
            navigate('/')
        }).catch(error => {
            alert(error.message)
        })
    }


    return (
        <div>
            <h3 className='pageTitle'>Edit Superhero</h3>
            {isLoading ? <p>Loading...</p> : (

                <SuperheroForm handleSubmit={handleSubmit} data={superhero}/>
            )}
        </div>
    );
};

export default EditSuperhero