const path = require(`path`)

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type mongodbMaterialsshareMaterials implements Node {
//       timeInClass: [Int!]!
//       shared: Boolean!
//       activityUse: [String!]!
//       institute: Institute!
//       targetLanguage:TargetLanguage!
//       languageFocus:LanguageFocus!
//     }
//     type ActivityUse {
//       label: String!
//       value: String!
//     }
//     type Institute {
//       label: String!
//       value: String!
//     }
//     type TargetLanguage {
//       label: String!
//       value: String!
//     }
//     type LanguageFocus {
//       label: String!
//       value: String!
//     }
//   `
//   createTypes(typeDefs)
// }

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // The “graphql” function allows us to run arbitrary
  // queries against the mongoDB graphql schema.

  // Mongodb{dbName}{collection} is a data node type created from mongoDB is a
  // "connection" (a GraphQL convention for accessing a list of nodes) gives
  // us an easy way to query all documents in the mongoDB collection.

  const { data } = await graphql(`
    {
      allMongodbMaterialsshareMaterials(limit: 1000) {
        edges {
          node {
            mongodb_id
            title
          }
        }
      }
    }
  `)
  // Create pages.
  const pageTemplate = path.resolve(`./src/templates/material.js`)
  // We want to create a detailed page for each
  // document in our mongoDB collection
  for (const { node } of data.allMongodbMaterialsshareMaterials.edges) {
    // Gatsby uses Redux to manage its internal state.
    // Plugins and sites can use functions like "createPage"
    // to interact with Gatsby.
    createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `/material/${node.title}/`,
      component: pageTemplate,
      context: {
        id: node.mongodb_id,
        title: node.title,
      },
    })
  }
}

// exports.sourceNodes = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     # One must say that the type is a Node
//     type activityUse implements Node {
//       # However Node fields are optional and you don't have to add them
//       label: String,
// 			value: String
//     }
//     type institute implements Node {
//       # However Node fields are optional and you don't have to add them
//       label: String,
// 			value: String
//     }
//     type targetLanguage implements Node {
//       # However Node fields are optional and you don't have to add them
//       label: String,
// 			value: String
//     }
//     type languageFocus implements Node {
//       # However Node fields are optional and you don't have to add them
//       label: String,
// 			value: String
//     }
//   `
//   createTypes(typeDefs)
// }
