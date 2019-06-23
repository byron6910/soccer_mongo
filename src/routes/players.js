const router=require('express').Router();
const Player=require('../models/players');
const Team=require('../models/teams');


router.get('/players',async(req,res)=>{
    const players=await Player.find();
    res.render('players/list',{players});
});

router.get('/players/add',async (req,res)=>{
    const teams=await Team.find();
    res.render('players/add',{teams});
});

router.post('/players/add',async (req,res)=>{
   console.log(req.body);
   const data=req.body;
   const newPlayer=new Player(data);
   await newPlayer.save();
   res.redirect('/players');
});
router.get('/players/edit/:id',async(req,res)=>{
    const player=await Player.findById(req.params.id);
    const teams=await Team.find();
    res.render('players/edit',{player,teams});
});
router.post('/players/edit/:id',async(req,res)=>{
    const data=req.body;
    const player=await Player.findByIdAndUpdate(req.params.id,data);
    res.redirect('/players');
});

router.get('/players/delete/:id',async (req,res)=>{
    await Player.findByIdAndDelete(req.params.id);
    res.redirect('/players');
});

module.exports=router;