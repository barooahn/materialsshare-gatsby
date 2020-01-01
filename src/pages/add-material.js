import React from "react"
import Layout from "../components/layout"
// import TextField from "../components/text-field"
import TextField from "@material-ui/core/TextField"
import Stepper from "../components/stepper"

const inputs = [
  { type: "text", label: "title", multi: true },
  { type: "text", label: "descrioption", multi: true },
]

export default () => {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  const changeTitle = e => {
    console.log(e)
    setTitle(e.target.value)
  }

  const changeDescription = e => {
    setDescription(e.target.value)
  }

  return (
    <Layout>
      <h1>Add Material</h1>
      <Stepper>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {inputs.map((input, index) => {
            return (
              <TextField
                label={input.label}
                value={input.label === "title" ? title : description}
                onChange={
                  input.label === "title" ? changeTitle : changeDescription
                }
              />
            )
          })}
        </div>
      </Stepper>
    </Layout>
  )
}
