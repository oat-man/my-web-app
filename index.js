
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;


// Create and/or connect to the SQLite database
let db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE greetings(message TEXT)");
    db.run("INSERT INTO greetings(message) VALUES ('Hello, Azure World!')");
});


// Define a route for the homepage
app.get('/', (req, res) => {
    db.get("SELECT message FROM greetings", (err, row) => {
        if (err) {
            res.status(500).send("Error reading from databae");
        } else {
            res.send(`<h1>${row.message}</h1>`);
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



