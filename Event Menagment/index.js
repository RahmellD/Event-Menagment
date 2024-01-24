const express = require('express');
const bodyParser = require('body-parser');
const userRouters = require('./routers/users')
const eventRouters = require('./routers/events')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/users', userRouters)
app.use('/api/events', eventRouters)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});