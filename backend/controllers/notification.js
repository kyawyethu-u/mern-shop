const Notification = require("../models/Notification")

exports.pushNotification = async(req,res) =>{
    const {message,title,owner_id,product_id,phone_number} = req.body
    try{
        await Notification.create({
             title,
            message,
           owner_id,
           product_id,
           phone_number

        })
        return res.status(200).json({
            isSuccess: true,
            message: "Notification is pushed!"
        })
    }catch(err){
        return res.status(500).json({
            isSuccess: false,
            message: err.message
        })
    }
}

exports.getNotifications = async(req,res) =>{
    try{
        const notiDocs = await Notification.find({owner_id : req.userId}).sort({createdAt : -1})
        if(!notiDocs || notiDocs.length === 0){
            throw new Error("No notifications.")
        }
        return res.status(200).json({
            isSuccess: true,
            notiDocs
        })
    }catch(err){
        return res.status(500).json({
            isSuccess: false,
            message : err.message
        })
    }
}

exports.markAsRead = async(req,res) =>{
    const {id} = req.params;
    try{
        const notiDoc = await Notification.findById(id)
        if(req.userId.toString() !== notiDoc.owner_id.toString()){
        throw new Error("Authorization Failed!")
        }
        if(!notiDoc){
            throw new Error("Notifications not found!")
        }
        notiDoc.isRead = true;
        notiDoc.save();
        return res.status(200).json({
            isSuccess: true,
            message: "Done",
            notiDoc,
        })
    }catch(err){
        return res.status(500).json({
            isSuccess: false,
            message : err.message
        })
    }
}

exports.deleteNoti = async(req,res) =>{
    const {id} = req.params;
    try{
        const notiDoc = await Notification.findById(id);
        if(req.userId.toString() !== notiDoc.owner_id.toString()){
        throw new Error("Authorization Failed!")
        }
        await Notification.findByIdAndDelete(id)
        return res.status(200).json({
            isSuccess: true,
            message: "Notification was deleted"
        })
    }catch(err){
        return res.status(500).json({
            isSuccess: false,
            message: err.message
        })
    }
}

exports.deleteAllNoti = async(req,res) =>{
    try{
        await Notification.deleteMany({owner_id: req.userId})
        return res.status(200).json({
            isSuccess: true,
            message: "Notifications are cleared"
        })
    }catch(err){
        return res.status(500).json({
            isSuccess: false,
            message: err.message
        })
    }
}