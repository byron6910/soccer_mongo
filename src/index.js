const express=require('express');
const path=require('path');
const hbs=require('express-handlebars');
const flash=require('connect-flash');
const session=require('express-session');

const routes=require('./routes/index');





//importaciones de archivos e inicializacion

const app=express();
require('./database');

//configuraciones

app.set('port',process.env.PORT||2020);
app.set('views',path.join(__dirname,'./views'));
app.engine('.hbs',hbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));

app.set('view engine','.hbs');

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'clave',
    resave:true,
    saveUninitialized:true
}));

app.use(flash());


//routes

app.use(routes);
app.use(require('./routes/players'));
app.use(require('./routes/teams'));
app.use(require('./routes/categories'));


//variables globales
app.use((req,res,next)=>{
    res.locals.sucess=req.flash('sucess');
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;
    next();
});

//archivos estaticas

app.use( express.static(path.join(__dirname,'public')));


//servidor

app.listen(app.get('port'),()=>{
    console.log('Servidor escuchando Puerto: ',app.get('port'));
});