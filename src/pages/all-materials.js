import React from "react"
import Fab from "@material-ui/core/Fab"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import EditIcon from "@material-ui/icons/Edit"
import { navigate } from "@reach/router"

export default ({ data }) => {
  const handleEditClick = () => {
    console.log("here")
    navigate(`material?id=5ddafd65becf7600178a720b`)
  }

  return (
    <Layout style={{ color: `teal` }}>
      <h1>All Materials</h1>

      {data.allMongodbMaterialsshareMaterials.edges.map(material => {
        return (
          <div key={material.node.mongodb_id}>
            <Link to={`/material/${material.node.title}`}>
              <h1>{material.node.title}</h1>
            </Link>

            <p>{material.node.mongodb_id}</p>
            <Fab color="secondary" aria-label="edit" onClick={handleEditClick}>
              <EditIcon />
            </Fab>
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
