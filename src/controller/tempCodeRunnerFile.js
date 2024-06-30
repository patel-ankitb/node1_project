const likepost = async (req, res) => {
    const tweetid = req.params.tweetid;
    const userid = req.body.userid;

    try {
        const tweet = await postschema.findById(tweetid);
        if (tweet != null) {
            if (tweet.likedby.includes(userid)) {
                res.status(400).json({
                    mess: "already like",

                })
            } else {
                const updata = await postschema.findByIdAndUpdate(tweetid,
                    { $inc: { likecount: 1 } },
                    { $push: { likedby: userid } });

                res.status(400).json({
                    mess: "liked...",
                    data: updata,

                })
            }
        } else {
                res.status(400).json({
                    mess:"tweet not found",
            
                })
        }
    }catch(err){
        res.status(400).json({
            mess:"failed..",
            error:err
        })
    }
}