const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;
var app = express();

app.use((req,res,next)=>{  //middleware
    var now = new Date().toString();
    var log = `${now}:${req.url}${req.method}`;
    console.log(log)
    fs.appendFile('server.log',log+'\n' , (error)=>{
        if(error){console.log('unable to connect server')}}
        )
    next();
})
// app.use((req,res,next)=>{  //middleware

//         res.render('maintenance.hbs',{
//             pageTitile:'maintainance Page'
//      })
// })

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIT',(text)=>{
    return text.toUpperCase();
});

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
   res.render('home.hbs',{
    pageTitile:'Home Page',
       welcomeMessage:'Welcome TO the Home page',
   })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitile:'About Page',
        
    })
 })

 app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pageTitile:'Project Page',
        
    })
 })


 app.get('/bad',(req,res)=>{
     res.send({errorMesssage :'unable to send message'})
    
 })

app.listen(port,()=>{
    console.log(`server is working on port${port}`)
});