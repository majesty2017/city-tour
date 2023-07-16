import {CardHeader, DefaultLayout, Loader} from "../../../components";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../../../axios-client.js";
import toastAlert from "../../../data/toastAlert.js";
import $ from 'jquery'


const AddProductPhoto = () => {
  const navigate = useNavigate()
  const [photos, setPhotos] = useState({})
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [inProgress, setInProgress] = useState(0)
  const {id} = useParams()

  const handlePhotoInputField = () => {
    $('#photo_input').trigger('click')
  }

  const handlePhotoUploadInput = (e) => {
    let images = e.target.files
    for (let i = 0; i < images.length; i++) {
      let reader = new FileReader()
      reader.onloadend = () => {
        setPhotos(prevState => ({
          ...prevState,
          [i]:{
            ...prevState[i], photo: reader.result,
            ...prevState[i], is_primary: i == 0 ? 1 : 0
          }
        }))
      }
      reader.readAsDataURL(images[i])
    }
  }

  const handlePrimaryPhoto = (key) => {
    for (let i = 0; i < Object.keys(photos).length; i++) {
      setPhotos(prevState => ({
        ...prevState,
        [i]:{
          ...prevState[i], is_primary: i == key ? 1 : 0
        }
      }))
    }
  }

  const handlePhotoUpload = async () => {
    setLoading(true)
    await axiosClient.post(`/product-photo-upload/${id}`, {photos}, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        setInProgress(progress)
      }
    }).then(res => {
      setLoading(false)
      toastAlert(res.data.message)
      navigate('/products')
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    console.log(photos)
  },[photos])

  return (
    <DefaultLayout title='Add Product Photo'>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <CardHeader isForm title={id ? 'Edit Product' : 'Add Product'} link='/products'/>
                {/* /.card-header */}
                <div className="card-body">
                  <div className='photo-upload-container'>
                    <div className='icon' onClick={handlePhotoInputField}>
                      <i className='fa fa-camera fa-2x' />
                    </div>
                  </div>
                  <input
                    type="file"
                    id='photo_input'
                    className='d-none'
                    multiple={true}
                    accept='image/png, image/jpg, image/jpeg, image/webp'
                    onChange={handlePhotoUploadInput}
                  />

                  <div className='row'>
                    {Object.keys(photos).map((key) => (
                      <div className='col-sm-2 my-2' key={key}>
                        <img src={photos[key].photo} alt="Image"
                             className={photos[key].is_primary ? `primary-photo img-thumbnail preview-photo` : `img-thumbnail`}
                             style={{
                               width: 118,
                               height: 118,
                               borderRadius: 5,
                               objectFit: "cover"
                             }}
                             onClick={() => handlePrimaryPhoto(key)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className='row align-items-center'>
                    <div className='col-sm-9'>
                      <div className='progress progress-bar py-2 progress-bar-animated progress-bar-striped bg-primary' style={{
                        display: `${inProgress < 1 ? 'none' : 'block'}`,
                        width: `${inProgress}%`,
                        fontWeight: 'bold'
                      }}>
                        {`${inProgress}%`}
                      </div>
                    </div>
                    <div className='col-sm-3'>
                      <button type="button" disabled={loading} onClick={handlePhotoUpload} className="btn btn-primary float-right">
                        {loading ? 'Loading...' : 'Upload Photo'}
                      </button>
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </DefaultLayout>
  );
};
export default AddProductPhoto;
