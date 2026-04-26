const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Keboola health check — must be before static middleware
app.post('/', (req, res) => res.sendStatus(200));

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`3D Solar System running on port ${PORT}`);
});
