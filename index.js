const express=require('express');
const users=require("./MOCK_DATA.json");
const fs=require(`fs`);
const app=express();
const PORT =8000;

//middleware
app.use(express.urlencoded({extended:false}));

//routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
});

app.get('/users',(req,res)=>{
    const html=`  
        <ol>
            ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
        </ol>
    `
    res.send(html);
});      


app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body,id:(users.length)+1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:'pending'});
    });
    console.log('Body',body);
    return res.json({status:'pending'});
});

app
.route(`/api/user/:id`)
.get((req,res)=>{
    const reqId=Number(req.params.id);
    return res.json(users.find(user=>user.id===reqId));
    //return res.send(a);
}) 
.patch((req,res)=>{
    return res.json({Status:"Pending"});
})
.delete((req, res) => {
    const reqId = Number(req.params.id);
    const index = users.findIndex(user => user.id === reqId);

    if (index === -1) {
        return res.json({ status: "pending" });
    } else {
        users.splice(index, 1); // Remove the element at the found index
        return res.json({ status: "deleted successfully" });
    }
});










app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`));