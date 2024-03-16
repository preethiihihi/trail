const express=require('express');
const bodyParser=require('body-parser')
const mongoose= require('mongoose');
const { render } = require('ejs');

app=express()

const uri ='mongodb+srv://cp932004:JYPY2eR5lv8KG3UA@cluster0.ubnldgz.mongodb.net/nodenote?retryWrites=true&w=majority'
;



app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));


const connectparams={
     useNewUrlParser:true,
     useUnifiedTopology:true,
}

mongoose.connect(uri,connectparams).then(()=>{
     console.log("connected sussecful");
}).catch((err)=>{
     console.log("error",err);
})

const name=mongoose.model('name',{
     myname:String,
});

app.get('/page3',(req,res)=>{
     name.find({}).then((names)=>{ 
          res.render('page3.ejs',{names:names});
     })
     .catch((err)=>{
          res.send("error in retrieving",err);
     })
})

app.get("/page1",(req,res)=>{
     res.render('page1.ejs');
})
app.get('/page2',(req,res)=>{
     res.render('page2.ejs');
})
app.post('/page1',(req,res)=>{
     const info=req.body;
     const newname= new name({
        myname:info.name1
     })
     newname.save().then(()=>{
          console.log(newname.myname);
          res.redirect('/page2')
     })
     .catch((err)=>{
          console.log("error in updating news");
     })


})

app.listen(3456, (err)=>{
     if(err){console.log("error",err)}
     else{console.log("listening on port 3456")}
})