import React, { Fragment , useState} from 'react'
import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const handleFileChange = e => {

    if(e.target.files){
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)

    try {
      const r = await fetch("/upload")
      const res = await axios.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })

      const {fileName, filePath} = res.data;
      setUploadedFile({fileName, filePath});
    } catch (error) {
      console.log(error)
      if(error.response && error.response.status === 500){
        console.log("there was a problem with server");
      }else if(error.response){
        console.log(error.response.msg)
      }else{
        console.log(error)
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit}>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
          <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
        </div>
        <input type="submit" value="upload" className="btn btn-primary btn-block mt-4" />
      </form>
    </Fragment>
  );
}

export default FileUpload
