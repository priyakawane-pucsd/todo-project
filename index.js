const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/todo.routes');
const app = express();
const port = 3000;

//body parser is for middleware 
app.use(bodyParser.json());

//Error handling for middleware
app.use((err,res) => {
    console.log('err>>>>', err);
    res.status(500).json({error:'Something went wrong!!!'});
})

//call to the routers
app.use('/api/task', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});