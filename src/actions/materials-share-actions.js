const axios = require("axios").default

export const saveData = payload => {
  console.log("save ", payload)
  //get local files
  //save to AWS

  if (payload.localFiles) handleUpload(payload.localFiles, payload)

  //deletle local

  //remove from material
  delete payload.localFiles

  //save data to db

  console.log("full payload", payload)

  sendToDb(payload)

  //route to my materials
}

const sendToDb = material => {
  material.author_id = localStorage.getItem("USER_ID")
  console.log("sending material to db...", material)
  const id = material._id
  delete material._id
  axios
    .put(`http://localhost:5000/api/material/update/${id}`, material, {
      //   onUploadProgress: ProgressEvent => {
      //     this.setState({
      //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
      //     })
      //   },
    })
    .then(res => {
      console.log("saved to db", res.data)
    })
    .catch(function(err) {
      throw err
    })
}

const handleUpload = (files, payload) => {
  const data = new FormData()
  data.append("saveType", "awsUpload")
  files.forEach((file, index) => {
    // console.log("files raw: " + file.raw)
    data.append(`files[${index}]`, file.raw)
  })
  axios
    .post("http://localhost:5000/api/material/file/upload", data, {
      //   onUploadProgress: ProgressEvent => {
      //     this.setState({
      //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
      //     })
      //   },
    })
    .then(res => {
      res.data.forEach(file => {
        return payload.files.push(file.path)
      })
    })
    .catch(function(err) {
      console.log(err)
    })
}
