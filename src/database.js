const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/liga',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(db=>console.log('Base de Datos Conectada al servidor'))
.catch(err=>console.log(err));
