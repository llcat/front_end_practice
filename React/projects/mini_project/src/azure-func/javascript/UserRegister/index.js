
module.exports = function (context, req, users) {
    context.log("--- UserRegister ---")
    let register = req.body
    context.log(register)
    let exist = users.find(user=>{
        return user.phone === register.phone
    })

    if(exist){
        context.res = {
            "status": "fail",
            "info": "手机号码已注册~"
        }
        context.done()
    }else{
        context.res = {
            "status": "success",
            "info": "注册成功,请登陆!"
        }
        let lastIndex = users.length
        context.done(null, {
            id: `u-${lastIndex+1}`,
            indexNum: lastIndex+1,
            phone: register.phone,
            password: register.password,
            nickName: register.nickName,
            registerDate: Date.now()
        })
    }
};