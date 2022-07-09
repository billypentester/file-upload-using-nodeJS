import React, { useState } from 'react';
import axios from 'axios'

function App() {

  const [image, setpic] = useState({});
  const [error, seterr] = useState('');
  const [img, setimg] = useState('');
  const [load,setload] = useState('');

  const handleChange = (e) => {

    setpic(e.target.files[0]);

  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(image)

    const formData = new FormData();
    formData.append('image', image)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => setload(Math.floor((progressEvent.loaded * 100) / progressEvent.total))
    }

    const res = await axios.post('http://localhost:5000/upload', formData, config)
    console.log(res.data)

    if(res.data.error) {
      setload(0)
      setimg('')
      seterr(res.data.error)
    }
    else
    {
      // setload(0)  
      seterr('')
      setimg(res.data.path)
    }

  }

  return (
    <div className="my-5 container d-flex flex-column justify-content-center align-items-center">

      <h4>Upload pics</h4>
      
      <div className="col-4 my-3">
        <input type="file" class="form-control"  onChange={handleChange} id="customFile" />
        <button class="mt-4 w-25 mx-auto d-block btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>

      {
        load > 0 ?
        <div class="progress col-6 my-3 rounded-2" style={{height: '25px'}}>
        <div class="progress-bar bg-success" role="progressbar" style={{width : `${load}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{load}%</div>
        </div>
        : null
      }

      { error ? <div class="text-center text-danger"><span>{error}</span></div> : null }

      {
        img ? 
        <div className="container my-2 d-flex justify-content-center">
          <img className="col-6" src={img} alt="" />
        </div> 
        : null
      }



    </div>
  );
}

export default App;
