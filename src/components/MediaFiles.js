import React, { useEffect } from "react"
import axios from "axios"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
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

export default ({ setFilePaths, filePaths, setMedia, media }) => {
  const handleChange = e => {
    Array.from(e.target.files).forEach(file => {
      setMedia(media => [
        ...media,
        { preview: URL.createObjectURL(file), raw: file },
      ])
    })
  }

  const handleDelete = file => {
    axios
      .delete("http://localhost:5000/api/material/file/delete", {
        data: { file: file },
      })
      .then(res => {
        const removed = [...filePaths].filter(x => x !== res.data.deleted)
        setFilePaths(removed)
        console.log("filePaths after deleted", filePaths)
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  //**********Upload to local file storeage ************** */

  // const handleUpload = () => {
  //   const data = new FormData()
  //   data.append("saveType", "localUpload")
  //   for (var i = 0; i < selectedFiles.length; i++) {
  //     let file = selectedFiles[i]
  //     Object.defineProperty(file, "name", {
  //       writable: true,
  //       value: file.name.toLowerCase(),
  //     })
  //     data.append("files[" + i + "]", file)
  //   }
  //   axios
  //     .post(
  //       "http://localhost:5000/api/material/file/upload?saveType=localUpload",
  //       data,
  //       {
  //         onUploadProgress: ProgressEvent => {
  //           setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
  //         },
  //       }
  //     )
  //     .then(res => {
  //       const paths = res.data
  //       console.log("paths", paths)
  //       setLocalPaths([...localPaths, ...res.data])
  //       setLocalFiles([...localFiles, ...selectedFiles])
  //       console.log("filePaths", filePaths)
  //     })
  //     .catch(function(err) {
  //       console.log(err)
  //     })
  // }

  // const newSelectedFiles = selectedFiles.map(file => {
  //   return <li key={file.name}>{file.name}</li>
  // })

  const displayImages = () => {
    return media.map(image => {
      return (
        <div key={image.raw.name + Date.now()}>
          <img alt={image.raw.name} src={image.preview} width="300" />
          <DeleteForever
            onClick={() => handleDelete(image.raw)}
            color="secondary"
          >
            delete_forever
          </DeleteForever>
        </div>
      )
    })
  }

  useEffect(() => {
    displayImages()
  }, [media]) // Only re-run the effect if count changes

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
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select File(s)
        </Button>
      </label>

      {/* {displayImages("http://localhost:5000/", localPaths)}
      {displayImages(
        "https://s3.eu-west-2.amazonaws.com/matshre-assets/uploads/",
        filePaths
      )} */}

      <br />
      <br />
      <div className="displayImages">{displayImages()}</div>
      <br />
      <br />
    </React.Fragment>
  )
}
