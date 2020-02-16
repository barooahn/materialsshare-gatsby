import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import MediaFiles from "./MediaFiles"
import MaterialDetails from "./MaterialDetails"
import { saveData } from "../actions/materials-share-actions"
import MaterialDetailsFull from "./MaterialDetailsFull"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return ["Add Media and Title", "Add details", "Complete material"]
}

const institute = [
  { title: "The Shawshank Redemption institute", year: 1994 },
  { title: "The Godfather institute", year: 1972 },
  { title: "The Godfather: Part II institute", year: 1974 },
  { title: "The Dark Knight institute", year: 2008 },
]
const languageFocus = [
  { title: "The Shawshank Redemption languageFocus", year: 1994 },
  { title: "The Godfather languageFocus", year: 1972 },
  { title: "The Godfather: Part II languageFocus", year: 1974 },
  { title: "The Dark Knight languageFocus", year: 2008 },
]
const activityUse = [
  { title: "The Shawshank Redemption activityUse", year: 1994 },
  { title: "The Godfather activityUse", year: 1972 },
  { title: "The Godfather: Part II activityUse", year: 1974 },
  { title: "The Dark Knight activityUse", year: 2008 },
]

const MaterialStepper = ({
  type = "Add",
  editTitle = "",
  editLevelValue = [],
  editObjective = "",
  editPupilTask = [],
}) => {
  //detail values
  const [title, setTitle] = React.useState(editTitle)
  const [levelValue, setLevelValue] = React.useState(editLevelValue)
  const [pupilTaskValue, setPupilTaskValue] = React.useState(editPupilTask)
  const [objective, setObjective] = React.useState(editObjective)
  const [timePrep, setTimePrep] = React.useState([20, 40])
  const [timeClass, setTimeClass] = React.useState([20, 40])
  const [procBefore, setProcBefore] = React.useState("")
  const [procIn, setProcIn] = React.useState("")
  const [book, setBook] = React.useState("")
  const [page, setPage] = React.useState("")
  const [followUp, setFollowUp] = React.useState("")
  const [variations, setVariations] = React.useState("")
  const [materials, setMaterials] = React.useState("")
  const [tips, setTips] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [instituteValue, setInstituteValue] = React.useState([])
  const [activityUseValue, setActivityUseValue] = React.useState([])
  const [languageFocusValue, setLanguageFocusValue] = React.useState([])
  const [share, setShare] = React.useState(true)

  const query = useStaticQuery(graphql`
    {
      allMongodbMaterialsshareMaterials {
        edges {
          node {
            level {
              value
              label
            }
            pupilTask {
              label
              value
            }
          }
        }
      }
    }
  `)

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key]
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key]

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return order === "desc" ? comparison * -1 : comparison
    }
  }

  const IsInObject = (value, resultArray) => {
    for (let i = 0; i < resultArray.length; i++) {
      if (resultArray[i]["value"] === value) {
        return true
      }
    }
    return false
  }

  const getDynamicOptions = nameOfDBColumn => {
    let resultArray = []
    query.allMongodbMaterialsshareMaterials.edges.map(node => {
      node.node[nameOfDBColumn].map(item => {
        if (!IsInObject(item.value, resultArray))
          resultArray.push({
            label: item.label,
            value: item.value,
          })
      })
    })
    return resultArray.sort(compareValues("label"))
  }

  let dynamicLevels = getDynamicOptions("level")
  let dynamicPupilTask = getDynamicOptions("pupilTask")

  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())
  const steps = getSteps()

  const save = () => {
    saveData({
      title,
      objective,
      levelValue,
      pupilTaskValue,
      timePrep,
      timeClass,
      procBefore,
      procIn,
      book,
      page,
      followUp,
      variations,
      materials,
      tips,
      notes,
      instituteValue,
      languageFocusValue,
      activityUseValue,
      share,
    })
  }

  const changeLevel = (e, value) => {
    console.log("change level", value)
    //Check if value passed is object with title i.e. from db or a new item
    if (value && !value[value.length - 1].hasOwnProperty("label")) {
      const lastValue = value.pop(value[value.length])
      const lastValueItem = { label: lastValue, year: 2011 }
      value.push(lastValueItem)
    }
    setLevelValue(value)
  }

  const changePupilTask = (e, value) => {
    console.log("change pupil level", value)
    //Check if value passed is object with title i.e. from db or a new item
    if (value && !value[value.length - 1].hasOwnProperty("label")) {
      const lastValue = value.pop(value[value.length])
      const lastValueItem = { label: lastValue, year: 2011 }
      value.push(lastValueItem)
    }
    setPupilTaskValue(value)
  }

  const changeInstitute = (e, value) => {
    console.log("change Institute", value)
    //Check if value passed is object with title i.e. from db or a new item
    if (value && !value[value.length - 1].hasOwnProperty("title")) {
      const lastValue = value.pop(value[value.length])
      const lastValueItem = { title: lastValue, year: 2011 }
      value.push(lastValueItem)
    }
    setInstituteValue(value)
  }

  const changeLanguageFocus = (e, value) => {
    console.log("change Language focus", value)
    //Check if value passed is object with title i.e. from db or a new item
    if (value && !value[value.length - 1].hasOwnProperty("title")) {
      const lastValue = value.pop(value[value.length])
      const lastValueItem = { title: lastValue, year: 2011 }
      value.push(lastValueItem)
    }
    setLanguageFocusValue(value)
  }

  const changeActivityUse = (e, value) => {
    console.log("change Activity use", value)
    //Check if value passed is object with title i.e. from db or a new item
    if (value && !value[value.length - 1].hasOwnProperty("title")) {
      const lastValue = value.pop(value[value.length])
      const lastValueItem = { title: lastValue, year: 2011 }
      value.push(lastValueItem)
    }
    setActivityUseValue(value)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MediaFiles />
      case 1:
        return (
          <MaterialDetails
            title={title}
            setTitle={setTitle}
            levelValue={levelValue}
            setLevelValue={changeLevel}
            levels={dynamicLevels}
            objective={objective}
            setObjective={setObjective}
            timePrep={timePrep}
            setTimePrep={setTimePrep}
            timeClass={timeClass}
            setTimeClass={setTimeClass}
            pupilTasks={dynamicPupilTask}
            pupilTaskValue={pupilTaskValue}
            setPupilTaskValue={changePupilTask}
            share={share}
            setShare={setShare}
            type={type}
          />
        )
      case 2:
        return (
          <MaterialDetailsFull
            procIn={procIn}
            setProcIn={setProcIn}
            book={book}
            setBook={setBook}
            page={setPage}
            followUp={followUp}
            setFollowUp={setFollowUp}
            varitations={variations}
            setVariations={setVariations}
            procBefore={procBefore}
            setProcBefore={setProcBefore}
            materials={materials}
            setMaterials={setMaterials}
            tips={tips}
            setTips={setTips}
            notes={notes}
            setNotes={setNotes}
            institute={institute}
            instituteValue={instituteValue}
            setInstituteValue={changeInstitute}
            languageFocus={languageFocus}
            languageFocusValue={languageFocusValue}
            setLanguageFocusValue={changeLanguageFocus}
            activityUse={activityUse}
            activityUseValue={activityUseValue}
            setActivityUseValue={changeActivityUse}
            type={type}
          />
        )
      default:
        return "Unknown step"
    }
  }

  const isStepOptional = step => {
    return step === 1
  }

  const isStepSkipped = step => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root}>
      <h1>{type} Material </h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography component={"span"} variant="caption">
                Optional
              </Typography>
            )
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography component={"span"} className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography component={"span"} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={save}
                className={classes.button}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MaterialStepper
