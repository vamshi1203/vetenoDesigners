const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const port = 5000;
const path = require('path');

mongoose.connect('mongodb://localhost:27017/veteno',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("MongoDB Connected"))
    .catch(err=> console.log(err));

    
const formSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,   
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    services:{
        type: String,
        required:true,
    },
    serviceType:{
        type: String,
        required: true
    }
})

app.use(express.static(path.join(__dirname, 'public'))); 
const formData = mongoose.model('formData', formSchema);

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html')); // Use absolute path
});


app.post('/submit',async(req,res)=>{
    const {name, email, phone, gender, address, services, serviceType} = req.body;
    const newForm = new formData({
        name,
        email,
        phone,
        gender,
        address,
        services,
        serviceType,
    });
    await newForm.save();
    res.redirect('/');
});
app.listen(port,()=>{
    console.log(`app is listening on port number ${port}`);
})