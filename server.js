const express = require('express');
// port designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();
// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request(Not Found) catch all
// will override all other routes, keep at end
app.use((req, res) => {
  res.status(404).end();
});

// start express server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
