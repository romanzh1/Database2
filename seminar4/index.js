const express = require('express')
const app = express()

http://localhost:8080/get
app.route('/get').get((req, res) => {
    res.send('Hello world!')
})

//http://localhost:8080/group/123
app.route('/group/:group').get((req, res) => {
    const group = req.params.group
    res.send(`Hello ${group}`)
})

app.listen(8080, () => {
    console.log('Server started! on http://localhost:8080')
})
