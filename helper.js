const  extractCookies=(req)=>{
    let token=null;
    if(req&&req.cookies){
        token=req.cookies['jwt']
        console.log("token",token)

    }
    // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTNjZDdiNjA2NjcwNTExZWNiYzJhMDUiLCJpYXQiOjE2OTg3MjczNjV9.szqyOy4jKmfMgXJOrYKP5TyLlkRomION9z_5TrjSCI0"
    return token;
}

module.exports=extractCookies