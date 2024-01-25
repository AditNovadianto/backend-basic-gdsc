const express = require('express')
var bodyParser = require('body-parser')
var {getRandomNumber} = require('./utils/randomNumber')
const app = express()
const port = 3000

const posts = []

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    "message": "this is home path"
  })
})

// get for post
app.get('/post', (req, res) => {
    res.json({
        "posts": posts
    })
  })

app.post('/post', (req, res) => {
    console.log(req.body)
    
    if (!req.body.title || !req.body.description) {
        res.json({
            "message": "title and description is required"
        })

        return
    } 

    posts.push({
        id: getRandomNumber(10),
        title: req.body.title,
        description: req.body.description
    })

    res.json({
        "message": "post created successfully"
    })
})

app.put('/post/:postId', (req, res) => {
    const postId = req.params.postId
    
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id == postId) {

            if (!req.body.title || !req.body.description) {
                res.json({
                    "message": "title and description is required"
                })
        
                return
            }

            posts[i].title = req.body.title
            posts[i].description = req.body.description

            res.json({
                "message": "post updated successfully"
            })

            return
        }
    }

    res.json({
        "message": "post not found"
    })
})

app.delete('/post/:postId', (req, res) => {
    const postId = req.params.postId
    
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id == postId) {
            posts.splice(i, 1)

            res.json({
                "message": "post deleted successfully"
            })

            return
        }
    }

    res.json({
        "message": "post not found"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})