const commentschame= require('../models/CommentModel')

const addcomment = async(req,res) =>{

    try{
        const commentobj = {
            comment : req.body.comment,
            user : req.body.user,
            post : req.body.post,
        }
        const comment = await commentschame.create(commentobj);
        res.status(200).json({
            mess:"commment succ..",

        })
    }catch(err){
        res.status(404).json({
            mess:"failed com...",
            error:err
        })
    }
}

const getallcomment = async(req,res) =>{
    const user= req.query.user;
    const post = req.query.post;
    console.log(user)
    console.log(post)
    const comment = await commentschame.find({user:user,post:post});
    // console.log(comment);
    res.status(401).json({
        mess:"comment fetch....",
        data:comment
    })
 
}
module.exports ={
    addcomment,
    getallcomment
}