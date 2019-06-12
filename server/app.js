var express = require('express');

var app = express();


const PORT = process.env.port || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on http://127.0.0.1:${PORT}`);
});