import React from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';

const styles = {
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 20
  }
}

function MaterialDetails({ classes, title, setTitle, description, setDescription, levels, levelValue, setLevelValue }) {

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

      <Autocomplete
        id="combo-box-demo"
        multiple
        value={levelValue}
        onChange={setLevelValue}
        options={levels}
        freeSolo={true}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} label="Combo box" variant="outlined" fullWidth />
        )}
      />
    </div>
  )
}

export default withStyles(styles)(MaterialDetails);