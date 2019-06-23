const router=require('express').Router();
const Categories=require('../models/categories');

router.get('/categories',async (req,res)=>{

    const categories=await Categories.find().sort({name:-1});

    res.render('category/list',{categories});
});

router.get('/categories/add',(req,res)=>{
    res.render('category/add');
});

router.post('/categories/add',async (req,res)=>{
    const {name,gender}=req.body;
    const newCategory=new Categories({name,gender});
    await newCategory.save();
    res.redirect('/categories');
});

router.get('/categories/delete/:id',async (req,res)=>{
    
    await Categories.findByIdAndDelete(req.params.id);
    res.redirect('/categories');

});

router.get('/categories/edit/:id',async(req,res)=>{
    console.log(req.params.id);
    const category=await Categories.findById(req.params.id);
    res.render('category/edit',{category});
});

router.post('/categories/edit/:id',async (req,res)=>{
    console.log(req.body);
    const{name,gender}=req.body;
    const newCategory=await Categories.findByIdAndUpdate(req.params.id,{name,gender});
    res.redirect('/categories');
});

module.exports=router;