const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const fs = require('fs/promises');
const app = new Koa();

app.use(cors());
app.use(bodyParser());

const locationDetectRouter = require('./utils/locationDetect');
app.use(locationDetectRouter.routes());

const AuthRouter = require('./utils/Auth');
app.use(AuthRouter.routes()).use(AuthRouter.allowedMethods());
app.use(AuthRouter.routes());

app.use(async (ctx) => {
  try {
    const htmlFile = await fs.readFile('./page/index.html', 'utf8'); // Read the HTML file
    ctx.type = 'html'; // Set the response type to HTML
    ctx.body = htmlFile; // Send the HTML file as response body
  } catch (error) {
    ctx.status = 500; // Set status to Internal Server Error if file reading fails
    ctx.body = 'Error reading HTML file';
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
