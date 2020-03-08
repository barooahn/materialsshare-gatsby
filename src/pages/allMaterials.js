import React, { useState } from "react"
import Fab from "@material-ui/core/Fab"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import EditIcon from "@material-ui/icons/Edit"

export default ({ data }) => {
  // const path = "https://s3.eu-west-2.amazonaws.com/matshre-assets/"
  const [latestMaterialModifiyDate, setLatestMaterialModifiyDate] = useState(
    new Date("2016-05-18T16:00:00Z")
  )
  return (
    <Layout style={{ color: `teal` }}>
      <h1>All Materials</h1>
      <h2>{latestMaterialModifiyDate.toDateString()}</h2>

      {data.allMongodbMaterialsshareMaterials.edges.map(material => {
        console.log(material.node.dateModified)
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

            <img src={material.node.files} width="300px" />

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
          id
          category {
            label
            value
          }
          variations
          title
          tips
          timePrep
          timeInClass
          shared
          pupilTask {
            label
            value
          }
          page
          objective
          notes
          materials
          mongodb_id
          level {
            label
            value
          }
          languageFocus {
            label
            value
          }
          followUp
          files
          dateModified
          book
          activityUse {
            label
            value
          }
        }
      }
    }
  }
`
