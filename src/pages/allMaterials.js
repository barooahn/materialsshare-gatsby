import React from "react"
import Fab from "@material-ui/core/Fab"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import EditIcon from "@material-ui/icons/Edit"
import { navigate } from "@reach/router"

export default ({ data }) => {
  return (
    <Layout style={{ color: `teal` }}>
      <h1>All Materials</h1>

      {data.allMongodbMaterialsshareMaterials.edges.map(material => {
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

            <Link
              to="../edit-material/"
              state={{
                editTitle: material.node.title,
                editLevelValue: material.node.level,
                editObjective: material.node.objective,
                editPupilTask: material.node.pupilTask,
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

export const query = graphql`
  {
    allMongodbMaterialsshareMaterials {
      edges {
        node {
          category
          dateModified
          level {
            label
            value
          }
          mongodb_id
          objective
          preparation
          procedureIn
          pupilTask {
            label
            value
          }
          shared
          timeInClass
          title
        }
      }
    }
  }
`
