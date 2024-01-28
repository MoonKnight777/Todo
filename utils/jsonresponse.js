const respond = (res,statusCode,message)=>{
    return res.status(statusCode).json({
        success:true,
        message
    });
}
module.exports = respond;