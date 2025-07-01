import { useState } from "react";
import "./UpdatePostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate, useLoaderData } from "react-router-dom";
import FraudFlag from "../fraud/Fraudflag";

function UpdatePostPage() {
  const post = useLoaderData(); // existing post data
  const [value, setValue] = useState(post?.postDetail?.desc || "");
  const [images, setImages] = useState(post?.images || []);
  const [error, setError] = useState("");
  const [updatedPost, setUpdatedPost] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/posts/${post.id}`, {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: String(inputs.latitude),
          longitude: String(inputs.longitude),
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });

      setUpdatedPost(res.data);
      navigate("/" + res.data.id);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while updating the post.");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Update Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" defaultValue={post.title} />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" defaultValue={post.price} />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" defaultValue={post.address} />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" defaultValue={post.city} />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={post.bedroom} />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={post.bathroom} />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" defaultValue={post.latitude} />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" defaultValue={post.longitude} />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" defaultValue={post.type}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" defaultValue={post.property}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" defaultValue={post.postDetail.utilities}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" defaultValue={post.postDetail.pet}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input id="income" name="income" type="text" defaultValue={post.postDetail.income} />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" defaultValue={post.postDetail.size} />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" defaultValue={post.postDetail.school} />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input min={0} id="bus" name="bus" type="number" defaultValue={post.postDetail.bus} />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" defaultValue={post.postDetail.restaurant} />
            </div>

            <button className="sendButton">Update</button>

            {updatedPost && (
              <div className="item">
                <label>Status:</label>
                <FraudFlag isFraudulent={updatedPost.isFraudulent} />
              </div>
            )}
            {error && <span className="error-message">{error}</span>}
          </form>
        </div>
      </div>

      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="uploaded" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dtvuvqq5q",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default UpdatePostPage;
