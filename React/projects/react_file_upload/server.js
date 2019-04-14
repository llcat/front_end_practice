const express = require('express')
const fileUpload = require('express-fileupload')
const port = 5000

const app = express()

app.use(fileUpload())

app.get("/", (req, res)=>{
    return res.json({msg:"app"})
})
app.post('/uplaod', (req,res)=>{
    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded'})
    }
    const file = req.files.file
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err=>{
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        res.json({
            fileName: file.name,
            filePath: `/uploads/${file.name}`
        })
    })
})
app.listen(port, ()=>{
    console.log("Server started ...")
})