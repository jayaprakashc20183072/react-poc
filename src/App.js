import "./App.css";
import { useState } from "react";
import DeleteFile from "./DeleteFile";
const API_URL = "https://httpbin.org/post";
const API_METHOD = "POST";
const STATUS_IDLE = 0;
const STATUS_UPLOADING = 1;

const App = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(STATUS_IDLE);
  

  const uploadFiles = (data) => {
    setStatus(STATUS_UPLOADING);

    fetch(API_URL, {
      method: API_METHOD,
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
      .finally(() => setStatus(STATUS_IDLE));
  };

  const packFiles = (files) => {
    const data = new FormData();

    [...files].forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    return data;
  };

  const handleUploadClick = () => {
    if (files.length) {
      const data = packFiles(files);
      uploadFiles(data);
    }
  };

 
  const deleteFileHandler = (id) => {
    setFiles(([...files]) => {
      return ([...files]).filter((file, index) => {
        return index !== id;
      });
    });
  }
  const renderFileList = () => (
    <ol style={{listStyle:"none"}}>
      {[...files].map((f, i) => (
        <li style={{marginBottom:"10px", display:"flex", justifyContent:"space-between"}} key={i}>
        {f.name} - {f.type}  <DeleteFile onDelete={deleteFileHandler} id={i}/>
        </li>
      ))}
    </ol>
  );

  const renderButtonStatus = () =>
    status === STATUS_IDLE ? (
      "Send to server"
    ) : (
      <img src="./load.svg" alt="uploadedFiles" />
    );

  return (
    <div style={{paddingTop:"10px", marginLeft:"50px"}}>
      <input style={{display:"none"}} type="file" id="file" multiple onChange={(e) => setFiles(e.target.files)} />
     <label style={{  padding:"7px",border: "1px solid black",backgroundColor:"#F0F0F0", borderRadius: "4px"}} htmlFor="file">upload</label>

      {renderFileList()}
      <button style={{padding:"7px",border: "1px solid black", borderRadius: "4px"}}
        onClick={handleUploadClick}
        disabled={status === STATUS_UPLOADING}
      >
        {renderButtonStatus()}
      </button>
    </div>
  );
};


export default App;
