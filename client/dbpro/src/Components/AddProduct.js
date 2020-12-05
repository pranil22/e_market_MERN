import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Spinner from './Spinner';

function AddProduct() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setcategory] = useState("painting");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const [loading, setloading] = useState(false);

    useEffect(() => {
        if(url) {
            fetch("/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " +  localStorage.getItem("token")
                },
                body: JSON.stringify({ 
                    name, description, quantity, price,
                    productImage: url
                 })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setloading(false);
                if(data.error) {
                    setError(data.error);
                }
                else {
                    history.push("/");
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }, [url])

    const uploadImage = (e) => {
        e.preventDefault();
        console.log(localStorage.getItem('token'))

        setloading(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "dh8zahoqm");

        fetch("https://api.cloudinary.com/v1_1/dh8zahoqm/image/upload",{
            method: "POST",
            body: data
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setUrl(data.secure_url);
        })
        .catch((err) => {
            setError("Failed to upload")
            console.log(err);
        })
    }

    const renderCorrect = () => {
        if(loading) {
            return <Spinner/>
        }
        else {
            return (
                <div style={{ width: "500px", 
                    margin: "50px auto", 
                    border: '1px solid #82b440',
                    borderRadius: "5px",
                    padding: "40px",
                    backgroundColor: "#daf1bb"
                    }}>
                    <h3>
                        Add Product
                    </h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="form-control"
                                value={name}
                                onChange={ (e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Product Description"
                                value={ description }
                                onChange={ (e) => { setDescription(e.target.value) }}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                placeholder="Product Image"
                                onChange={ (e) => { setImage(e.target.files[0]) } }
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="Price"
                                value={ price }
                                onChange={ (e) => { setPrice(e.target.value) }}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={ quantity }
                                onChange={ (e) => { setQuantity(e.target.value) }}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <select className="form-control"
                                value={ category }
                                onChange={ (e) => { setcategory(e.target.value) }}
                            >
                                <option value="painting">Painting</option>
                                <option value="handicrafts">Handicrafts</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        
                        <div className="form-group" style={{ color: 'red' }}>
                            { error }
                        </div>


                        <div className="form-group">
                            <button
                                className="btn"
                                style={{ backgroundColor: 'black', color: 'white' }}
                                onClick={ (e) => { uploadImage(e) } }
                            >
                                Add Product
                            </button>
                        </div>

                    </form>
                </div>
            )
        }
    }

    return (
        <>
            { renderCorrect() }
        </>
    )
}

export default AddProduct
