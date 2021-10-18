const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/user", require("./routes/user"));

app.use("/api/post", require("./routes/post"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Listening on port: http://localhost:${PORT}`)
);
