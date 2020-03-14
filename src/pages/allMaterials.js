import React, { useState, useEffect } from "react"
import Fab from "@material-ui/core/Fab"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import EditIcon from "@material-ui/icons/Edit"

export default ({ data }) => {
  // const path = "https://s3.eu-west-2.amazonaws.com/matshre-assets/"

  const [latestMaterialModifiyDate, setLatestMaterialModifiyDate] = useState(
    new Date("2016-05-18T16:00:00Z")
  )

  const [runMaterial, setRunMaterial] = useState([])

  const MaterialModifiyDate = { latestMaterialModifiyDate }

  useEffect(() => {
    fetch(`http://localhost:5000/api/getLiveMaterials/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(MaterialModifiyDate),
      method: "POST",
    })
      .then(response => response.json())

      .then(resultData => {
        setRunMaterial(resultData)
        console.log("live data", resultData)
      })
  }, [])

  return (
    <Layout style={{ color: `teal` }}>
      <h1>All Materials</h1>
      <h2>{latestMaterialModifiyDate.toDateString()}</h2>

      {runMaterial.map(material => {
        return (
          <div key={material._id}>
            <Link to={`/material/${material.title}`}>
              <h1>{material.title}</h1>
            </Link>
            <p>Objective: {material.objective}</p>
            {/* <p>{JSON.stringify(material.node.pupilTask)}</p> */}
            {material.pupilTask.map(task => {
              return <p>Pupil Task: {task.label}</p>
            })}
            {material.level.map(level => {
              return <p>Level: {level.label}</p>
            })}
            {material.files.map(file => {
              console.log("file: ", file)
              return <img src={file} width="300px" />
            })}

            <Link
              to="../editMaterial/"
              state={{
                material: material,
              }}
            >
              <Fab color="secondary" aria-label="edit">
                <EditIcon />
              </Fab>
            </Link>
          </div>
        )
      })}

      {data.allMongodbMaterialsshareMaterials.edges.map(material => {
        if (latestMaterialModifiyDate < new Date(material.node.dateModified))
          setLatestMaterialModifiyDate(new Date(material.node.dateModified))
        return (
          <div key={material.node.mongodb_id}>
            <Link to={`/material/${material.node.title}`}>
              <h1>{material.node.title}</h1>
            </Link>
            <p>Objective: {material.node.objective}</p>
            {/* <p>{JSON.stringify(material.node.pupilTask)}</p> */}
            {material.node.pupilTask.map(task => {
              return <p>Pupil Task: {task.label}</p>
            })}
            {material.node.level.map(level => {
              return <p>Level: {level.label}</p>
            })}
            {material.node.files.map(file => {
              console.log("file: ", file)
              return <img src={file} width="300px" />
            })}

            <Link
              to="../editMaterial/"
              state={{
                material: material.node,
              }}
            >
              <Fab color="secondary" aria-label="edit">
                <EditIcon />
              </Fab>
            </Link>
          </div>
        )
      })}
    </Layout>
  )
}

//procedure in needs fixing -  see Graph ql for error timeInClass
export const query = graphql`
  query MyQuery {
    allMongodbMaterialsshareMaterials(
      sort: { order: DESC, fields: dateModified }
    ) {
      edges {
        node {
          category {
            label
            value
          }
          languageFocus {
            label
            value
          }
          pupilTask {
            label
            value
          }
          activityUse {
            label
            value
          }
          book
          dateModified
          files
          followUp
          id
          level {
            label
            value
          }
          materials
          mongodb_id
          notes
          objective
          page
          shared
          timeInClass
          timePrep
          tips
          title
          variations
        }
      }
    }
  }
`
