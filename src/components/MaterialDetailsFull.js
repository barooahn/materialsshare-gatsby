import React from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import { Autocomplete } from "@material-ui/lab"
import Typography from "@material-ui/core/Typography"

const styles = {
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
}

function MaterialDetailsFull({
  classes,
  procBefore,
  setProcBefore,
  procIn,
  setProcin,
  book,
  setBook,
  page,
  setPage,
  followUp,
  setFollowUp,
  variations,
  setVariations,
  materials,
  setMaterials,
  tips,
  setTips,
  notes,
  setNotes,
  institute,
  instituteValue,
  setInstituteValue,
  languageFocus,
  languageFocusValue,
  setLanguageFocusValue,
  activityUse,
  activityUseValue,
  setActivityUseValue,
}) {
  const changeProcBefore = e => {
    setProcBefore(e.target.value)
  }

  const changeProcIn = e => {
    setProcin(e.target.value)
  }

  const changeBook = e => {
    setBook(e.target.value)
  }

  const changePage = (e, newValue) => {
    setPage(newValue)
  }

  const changeFollowUp = (e, newValue) => {
    setFollowUp(newValue)
  }

  const changeVariations = (e, newValue) => {
    setVariations(newValue)
  }

  const changeMaterials = (e, newValue) => {
    setMaterials(newValue)
  }

  const changeTips = (e, newValue) => {
    setTips(newValue)
  }
  const changeNotes = (e, newValue) => {
    setNotes(newValue)
  }

  const inputs = [
    {
      type: "text",
      label: "Procedure before class (you can use multiple lines)",
      multi: true,
      value: procBefore,
      onChange: changeProcBefore,
      placeholder: "eg. Make one copy of the handout for each pupil.",
    },
    {
      type: "text",
      label: "Procedure in class (you can use multiple lines)",
      multi: true,
      value: procIn,
      onChange: changeProcIn,
    },
    {
      type: "text",
      label: "Is the resource based on a textbook?",
      value: book,
      onChange: changeBook,
    },
    {
      type: "text",
      label: "What page of the textbook?",
      value: page,
      onChange: changePage,
    },
    {
      type: "text",
      label: "Follow up activities (you can use multiple lines)?",
      value: followUp,
      onChange: changeFollowUp,
    },
    {
      type: "text",
      label: "Variations on the material use (you can use multiple lines)?",
      value: variations,
      onChange: changeVariations,
      placeholder: "eg. For weaker students...",
    },
    {
      type: "text",
      label: "What materials do I need (you can use multiple lines)?",
      value: materials,
      onChange: changeMaterials,
      placeholder:
        "eg. Finger puppet template, colour pencils, scissors and tape.",
    },
    {
      type: "text",
      label:
        "tips (you can use multiple lines) eg. Pupils can use the completed worksheets to make a classroom display",
      value: tips,
      onChange: changeTips,
      placeholder:
        "eg. Pupils can use the completed worksheets to make a classroom display ",
    },
    {
      type: "text",
      label: "notes (you can use multiple lines)",
      value: notes,
      onChange: changeNotes,
    },
  ]

  return (
    <div className={classes.inputWrapper}>
      {inputs.map(input => {
        if (input.type === "text") {
          return (
            <TextField
              label={input.label}
              value={input.value}
              onChange={input.onChange}
              placeholder={input.placeholder}
            />
          )
        } else {
          return null
        }
      })}

      <Autocomplete
        id="combo-box-demo"
        multiple
        value={instituteValue}
        onChange={setInstituteValue}
        options={institute}
        freeSolo={true}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label="What institue is the material for? - School, language center etc."
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Autocomplete
        id="combo-box-demo"
        multiple
        value={languageFocusValue}
        onChange={setLanguageFocusValue}
        options={languageFocus}
        freeSolo={true}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label="What is the language focus of the resource? - Speaking, Listening etc."
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Autocomplete
        id="combo-box-demo"
        multiple
        value={activityUseValue}
        onChange={setActivityUseValue}
        options={activityUse}
        freeSolo={true}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            {...params}
            label="What is the activity use of the resource? - Production, Presenetation etc."
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  )
}

export default withStyles(styles)(MaterialDetailsFull)