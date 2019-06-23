const router=require('express').Router();
const Team=require('../models/teams');
const Categories=require('../models/categories');


router.get('/teams',async (req,res)=>{
    const teams=await Team.find();
    console.log(teams);
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
    res.redirect('/teams'); 
});
router.get('/teams/delete/:id',async(req,res)=>{
    await Team.findByIdAndDelete(req.params.id);
    res.redirect('/teams');
});

module.exports=router;