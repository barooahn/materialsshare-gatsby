/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})

// In your gatsby-config.js
module.exports = {
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source” plugins. Here we
     * setup the site to pull data from the "documents" collection in a local
     * MongoDB instance
     */
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: `materials-share`,
        collection: [`users`, `materials`],
        server: { address: `ds157844.mlab.com`, port: 57844 },
        auth: {
          user: process.env.GATSBY_MONGO_USER,
          password: process.env.GATSBY_MONGO_PASS,
        },
        clientOptions: { useUnifiedTopology: true, preserveObjectIds: true },
      },
    },
  ],
}
