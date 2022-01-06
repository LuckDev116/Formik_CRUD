require("dotenv").config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./db');
connectDB();

const app = require('./server');

const PORT = process.env.PORT || 5000

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'User REST API',
      description: "A REST API built with Express and MongoDB. This API provides CRUD of users."
    },
  },
  apis: ["./routes/user.route.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
