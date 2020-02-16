import React, { useState } from "react"
import axios from "axios"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { LinearProgress, FormHelperText } from "@material-ui/core"
import DeleteForever from "@material-ui/icons/DeleteForever"

const allowedMimeTypes = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "audio/mpeg",
  "audio/x-wav",
  "audio/mp3",
  "image/jpeg",
  "image/png",
  "video/mpeg",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
]

export default () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [loaded, setLoaded] = useState(0)
  const [showUpload, setShowUpload] = useState(false)
  const [filePaths, setFilePaths] = useState([])
  const [showContinue, setShowContinue] = useState(false)

  const handleselectedFile = e => {
    let files = Array.from(e.target.files)
    // console.log("uploaded files are ", e.target.files);
    //validate mime type
    const reExtension = /(?:\.([^.]+))?$/
    files.map(x => {
      const ext = x.name.match(reExtension)[1].toLowerCase()
      if (ext === "docx") {
        return x
      } else {
        return files.filter(ext => allowedMimeTypes.includes(ext.type))
      }
    })
    setSelectedFiles(files)
    setLoaded(0)
    setShowUpload(true)
  }

  const handleDelete = file => {
    axios
      .delete("/api/material/file/delete", {
        data: { file: file },
      })
      .then(res => {
        const removed = [...filePaths].filter(x => x !== res.data.deleted)
        setFilePaths(removed)
        console.log("filePaths after deleted", filePaths)
        if (filePaths.length < 1) setShowContinue(false)
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  const handleUpload = () => {
    const data = new FormData()
    for (var i = 0; i < selectedFiles.length; i++) {
      let file = selectedFiles[i]
      Object.defineProperty(file, "name", {
        writable: true,
        value: file.name.toLowerCase(),
      })
      data.append("files[" + i + "]", file)
    }
    axios
      .post("http://localhost:5000/api/material/file/upload", data, {
        onUploadProgress: ProgressEvent => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
        },
      })
      .then(res => {
        //console.log("it's an array", res.data);
        const paths = res.data.map(data => data.name)

        setFilePaths([...filePaths, ...paths])
        setShowContinue(true)
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  const newSelectedFiles = selectedFiles.map(file => {
    return <li key={file.name}>{file.name}</li>
  })

  const newFilePaths = filePaths.map(file => {
    return (
      <li key={file}>
        <img
          src={`https://s3.eu-west-2.amazonaws.com/matshre-assets/${file}`}
        />
        <DeleteForever onClick={() => handleDelete(file)} color="secondary">
          delete_forever
        </DeleteForever>
      </li>
    )
  })

  return (
    <React.Fragment>
      <Typography variant="h5" component="h2">
        Click 'Select File(s)' button to choose one or more files to save
      </Typography>
      <br />
      <br />

      <input
        accept="image/*, audio/*, video/*, .pdf, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        id="contained-button-file"
        className="inputFile"
        multiple
        type="file"
        onChange={handleselectedFile}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select File(s)
        </Button>
      </label>

      <br />
      <br />
      {showUpload ? (
        <React.Fragment>
          <FormHelperText>Selected files</FormHelperText>

          <ul>{newSelectedFiles}</ul>

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            // className={classes.button}
          >
            Upload
          </Button>

          <br />
          <br />
          <FormHelperText>Upload progress</FormHelperText>
          <br />
          <LinearProgress variant="determinate" value={Math.round(loaded, 2)} />

          <br />

          <FormHelperText>Uploaded files</FormHelperText>

          <ul>{newFilePaths}</ul>
        </React.Fragment>
      ) : null}
      {showContinue ? (
        <Button variant="contained" color="primary" className="contiune">
          Continue
        </Button>
      ) : null}
    </React.Fragment>
  )
}
