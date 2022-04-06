const express=require('express')
const app=express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

function sum_of_Digits(n){
    let ans = 0;
    while (n){
        ans+= (n % 10);
        n = parseInt(n / 10, 10);
    }
    return ans;
}
function is_valid_imei(n){
    let s = n.toString();
    let len = s.length;
    if (len != 15)  return false;
    let sum = 0;
    for(let i = len; i >= 1; i--){
        let d = (n % 10);
        if (i % 2 == 0) d*= 2;
        sum += sum_of_Digits(d);
        n = parseInt(n / 10, 10);
    }
    return (sum % 10 == 0);
}

app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/',(req,res)=>{
    var num=req.body.imei
    if (is_valid_imei(num))
        res.render("response");
    else
        res.render('fail');
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running on port 3000');
})