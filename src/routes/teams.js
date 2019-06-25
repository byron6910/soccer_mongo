const router=require('express').Router();
const Team=require('../models/teams');
const Categories=require('../models/categories');


router.get('/teams',async (req,res)=>{
    const teams=await Team.find();
    
    res.render('teams/list',{teams});

});
router.get('/teams/add',async (req,res)=>{
    const categories=await Categories.find();
    res.render('teams/add',{categories});
});

router.post('/teams/add',async (req,res)=>{
    const data=req.body;
    const newTeam=new Team(data);
    await newTeam.save();
    req.flash('success','Equipo: '+newTeam.name+' Ingresado Exitosamente');
    res.redirect('/teams');
});

router.get('/teams/edit/:id',async (req,res)=>{
    const team=await Team.findById(req.params.id);
    const categories=await Categories.find();
    res.render('teams/edit',{team,categories});
});

router.post('/teams/edit/:id',async(req,res)=>{
    const data=req.body;
    const newTeam=await Team.findByIdAndUpdate(req.params.id,data);
    req.flash('success','Equipo: '+newTeam.name+' Actualizado Exitosamente');    
    res.redirect('/teams'); 
});
router.get('/teams/delete/:id',async(req,res)=>{
    await Team.findByIdAndDelete(req.params.id);
    req.flash('success','Equipo Eliminado Exitosamente');
    res.redirect('/teams');
});

module.exports=router;