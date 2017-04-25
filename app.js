var express=require('express');
var path=require('path')
var app=express();
app.set('view engine','jade')
app.set('views',path.join(__dirname,'views'))
app.use(express.static('stylesheets'))
app.get('/',function(req,res){
    res.render('landing')
})
app.listen(1337,function(){
    console.log('ready on port 1337');
});
