/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
        auth: { user: `barooahn`, password: `g2442Y2L` },
        clientOptions: { useUnifiedTopology: true },
      },
    },
  ],
}
