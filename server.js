// DEPENDENCIES
const express = require('express')

const PORT = process.env.PORT || 3001;

//EXPRESS CONFIGURATION
const app = express();

//Accesses public file mainly for proper CSS loading
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });