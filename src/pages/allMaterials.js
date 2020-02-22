import React from "react"
import Fab from "@material-ui/core/Fab"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import EditIcon from "@material-ui/icons/Edit"

export default ({ data }) => {
  const path = "https://s3.eu-west-2.amazonaws.com/matshre-assets/"
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

            <img src={path + material.node.files} width="300px" />

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

export const query = graphql`
  {
    allMongodbMaterialsshareMaterials {
      edges {
        node {
          files
          category
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
