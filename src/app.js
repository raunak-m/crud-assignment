const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/user')
const mongodb = require('mongodb')
require('./db/mongoose')

const app = express()
const port = process.env.port || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users/:id', async(req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        res.send({user})
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/users/:id', async(req, res) => {
    try {
        //console.log(req.body.name)
        const user = await User.updateOne({
            _id: req.params.id
        }, {
            $set: {
                name: req.body.name
            }
        })
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
