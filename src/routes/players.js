const router=require('express').Router();
const Player=require('../models/players');
const Team=require('../models/teams');
const path =require('path');
const fs=require('fs-extra');




router.get('/players',async(req,res)=>{
    const players=await Player.find();
    res.render('players/list',{players});
});

router.get('/players/add',async (req,res)=>{
    const teams=await Team.find();
    res.render('players/add',{teams});
});

router.post('/players/add',async (req,res)=>{
   const data=req.body;
   const ext=path.extname(req.file.originalname).toLocaleLowerCase();
   const format_photo=req.body.number_player+'.'+req.body.team+'_'+req.body.name+'_'+req.body.last_name;
   const photo_path_tmp=req.file.path;
   const target_photo=path.resolve('public/players/photos/'+format_photo+ext);
   
   if(ext==='.png'||ext==='.jpg'||ext==='.jpeg'||ext==='.gif'){
        await fs.rename(photo_path_tmp,target_photo,(err)=>{console.log(err)});
        data.photo=format_photo+ext;
        
        const newPlayer=new Player(data);
        await newPlayer.save();
        console.log(newPlayer);
        req.flash('success','Jugador con CI : '+data.ci + ' Ingresado Exitosamente');
        res.redirect('/players');
   }else{
       await fs.unlink(photo_path_tmp);
       req.flash('error','solo imagenes son admitidas');
   }
 
});
router.get('/players/edit/:id',async(req,res)=>{
    const player=await Player.findById(req.params.id);
    const teams=await Team.find();
    res.render('players/edit',{player,teams});
});
router.post('/players/edit/:id',async(req,res)=>{
    const data=req.body;
    const player=await Player.findByIdAndUpdate(req.params.id,data);
    req.flash('success','Jugador con CI : '+data.ci +' Actualizado Exitosamente');    
    res.redirect('/players');
});

router.get('/players/delete/:id',async (req,res)=>{
    await Player.findByIdAndDelete(req.params.id);
    req.flash('success','Jugador Eliminado  Exitosamente');
    res.redirect('/players');
});

module.exports=router;