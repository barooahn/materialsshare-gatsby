import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

class Material extends React.Component {
  render() {
    const material = this.props.data.mongodbMaterialsshareMaterials
    console.log(`material - ${material}`)
    console.log(`data - ${JSON.stringify(this.props.data, null, 2)}`)
    return (
      <Layout>
        <div>
          <a href={material.title} className="itemlink">
            {material.title}
          </a>

          <div
            dangerouslySetInnerHTML={{
              __html: material.objective,
            }}
            className="story"
          />
        </div>
      </Layout>
    )
  }
}

export default Material

export const pageQuery = graphql`
  query($id: String!) {
    mongodbMaterialsshareMaterials(mongodb_id: { eq: $id }) {
      mongodb_id
      level {
        label
        value
      }
      category {
        label
        value
      }
      files
      objective
      pupilTask {
        label
        value
      }
      title
    }
  }
`
