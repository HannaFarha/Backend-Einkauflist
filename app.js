// // ℹ️ Gets access to environment variables/settings
// // // https://www.npmjs.com/package/dotenv
// // require('dotenv').config()

// // Handles http requests (express is node js framework)
// // https://www.npmjs.com/package/express
// const express = require('express')

// const app = express()

// // ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require('./config')(app)
// const collectionRoutes = require('./routes/collection.routes')
// app.use('/coll', collectionRoutes)
// // 👇 Start handling routes here
// const vinylRoutes = require('./routes/vinyl.routes')
// app.use('/api', vinylRoutes)

// const authRoutes = require('./routes/auth.routes')
// app.use('/auth', authRoutes)

// app.get('*', (req, res) => {
//     res.json('404 no page')})
// // ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require('./error-handling')(app)

// module.exports = app
