import React from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from '@material-ui/core/styles';

const styles = {
  inputWrapper: {
    display: "flex", 
    flexDirection: "column", 
    padding: 20
  }
}

function MaterialDetails({ classes }) {

  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  const changeTitle = e => {    
    setTitle(e.target.value)
  }

  const changeDescription = e => {
    setDescription(e.target.value)
  }

  const inputs = [
    { 
      type: "text", 
      label: "Title", 
      multi: true, 
      value: title, 
      onChange: changeTitle 
    },
    { 
      type: "text", 
      label: "Description", 
      multi: true, 
      value: description, 
      onChange: changeDescription 
    },
  ]

  return (
    <div className={classes.inputWrapper}>
      {inputs.map(input => {
        return (
          <TextField
            label={input.label}
            value={input.value}
            onChange={input.onChange}
          />
        )
      })}
    </div>
  )
}

export default  withStyles(styles)(MaterialDetails);