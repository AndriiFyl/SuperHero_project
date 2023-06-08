import React, {useEffect, useState} from 'react';
import styles from "../../pages/CreateSuperhero/CreateSuperhero.module.css";

const SuperheroForm = ({data = {}, handleSubmit}) => {
    const [id, setId] = useState('')
    const [nickname, setNickname] = useState('')
    const [realName, setRealName] = useState('')
    const [originDescription, setOriginDescription] = useState('')
    const [superpowers, setSuperpowers] = useState('')
    const [catchPhrase, setCatchPhrase] = useState('')
    const [images, setImages] = useState([])

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setNickname(data.nickname || '')
            setRealName(data.real_name || '')
            setOriginDescription(data.origin_description || '')
            setSuperpowers(data.superpowers || '')
            setCatchPhrase(data.catch_phrase || '')
            setImages(data.images || [])
            setId(data._id || '')
        }
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (!nickname || !realName || !originDescription || !superpowers || !catchPhrase || !images.length) {
            alert('Fill all fields')
            return
        }

        const data = {
            nickname,
            real_name: realName,
            origin_description: originDescription,
            superpowers,
            catch_phrase: catchPhrase,
            images
        }

        if(id) {
            data.id = id
        }

        handleSubmit(data)
    }


    const handleImageUpload = (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        fetch('http://localhost:5000/api/superheroes/images', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                setImages([...images, data.filename])
            })
    }

    const deleteImage = (image) => {
        fetch(`http://localhost:5000/api/superheroes/images`, {
            method: 'DELETE',
            body: JSON.stringify({filename: image}),
        }).then(response => response.json())
            .then(data => {
                setImages(images.filter(img => img !== image))
            })
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="nickname">Nickname</label>
                    <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="realName">Real Name</label>
                    <input type="text" id="realName" value={realName} onChange={(e) => setRealName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="originDescription">Origin Description</label>
                    <input type="text" id="originDescription" value={originDescription}
                           onChange={(e) => setOriginDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="superpowers">Superpowers</label>
                    <input type="text" id="superpowers" value={superpowers}
                           onChange={(e) => setSuperpowers(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="catchPhrase">Catch Phrase</label>
                    <input type="text" id="catchPhrase" value={catchPhrase}
                           onChange={(e) => setCatchPhrase(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="images">Images</label>
                    <input type="file" id="images" onChange={handleImageUpload}/>
                    <div>
                        {images.map(image => (
                            <div className={styles.imageBlock}>
                                <img src={`http://localhost:5000/public/images/${image}`} alt=""/>
                                <div className={styles.deleteImageText} onClick={() => deleteImage(image)}>
                                    Delete
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">{id.length > 0 ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default SuperheroForm