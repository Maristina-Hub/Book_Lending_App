import app from './server.js';
import dbConnection from './database/db.js';
const port = process.env.PORT || 7100;

dbConnection.getConnect();

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});