const moment=require('moment');

const helpers={};

helpers.birthday=timestamp=>{
    return moment().format("MM-DD-YYYY");
};

module.exports=helpers;