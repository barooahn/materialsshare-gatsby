import React from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import { Autocomplete } from "@material-ui/lab"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

const styles = {
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
}

function MaterialDetails({
  classes,
  title,
  setTitle,
  description,
  setDescription,
  objective,
  setObjective,
  levels,
  levelValue,
  setLevelValue,
  pupilTasks,
  pupilTaskValue,
  setPupilTaskValue,
  timePrep,
  setTimePrep,
  timeClass,
  setTimeClass,
  share,
  setShare,
}) {
  const changeTitle = e => {
    setTitle(e.target.value)
  }

  const changeDescription = e => {
    setDescription(e.target.value)
  }

  const changeObjective = e => {
    setObjective(e.target.value)
  }

  const changeTimePrep = (e, newValue) => {
    setTimePrep(newValue)
  }

  const changeTimeClass = (e, newValue) => {
    setTimeClass(newValue)
  }

  const inputs = [
    {
      type: "text",
      label: "Title",
      multi: true,
      value: title,
      onChange: changeTitle,
    },
    {
      type: "text",
      label: "Description",
      multi: true,
      value: description,
      onChange: changeDescription,
    },
    {
      type: "text",
      label: "Objective",
      multi: true,
      value: objective,
      onChange: changeObjective,
    },
    {
      type: "slider",
      label:
        "Time needed for preparation (slide bar or type - number of minutes)",
      value: timePrep,
      onChange: changeTimePrep,
    },
    {
      type: "slider",
      label: "Time needed in class (slide bar or type - number of minutes)",
      value: timeClass,
      onChange: changeTimeClass,
    },
  ]

  return (
    <div className={classes.inputWrapper}>
      {inputs.map((input, index) => {
        if (input.type === "text") {
          return (
            <TextField
              key={index}
              label={input.label}
              value={input.value}
              onChange={input.onChange}
            />
          )
        } else if (input.type === "slider") {
          console.log(`value of ${input.label}: ${input.value}`)
          return (
            <div key={index}>
              <Typography gutterBottom>{input.label}</Typography>
              <Slider
                key={index}
                getAriaLabel={index =>
                  index === 0 ? "Minimum Minutes" : "Maximum Minutes"
                }
                value={input.value}
                valueLabelDisplay="on"
                onChange={input.onChange}
              />
            </div>
          )
        } else {
          return null
        }
      })}

      <Autocomplete
        id="combo-box-demo1"
        multiple
        value={pupilTaskValue}
        onChange={setPupilTaskValue}
        options={pupilTasks}
        freeSolo={true}
        getOptionLabel={option => option.label}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Autocomplete
        id="combo-box-demo2"
        multiple
        value={levelValue}
        onChange={setLevelValue}
        options={levels}
        freeSolo={true}
        getOptionLabel={option => option.label}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <FormControlLabel
        control={
          <Switch
            checked={true}
            onChange={setShare}
            value={share}
            color="primary"
          />
        }
        label="Share your resource"
      />
    </div>
  )
}

export default withStyles(styles)(MaterialDetails)
