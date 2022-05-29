const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });
var busModel=Mongoose.model("buses",
new Mongoose.Schema(
    {
        route:String,
        busname:String,
        regno:String,
        ownername:String,
        contactno:String




    }


)

)
Mongoose.connect("mongodb+srv://adithya:adithya@cluster0.9dgmv.mongodb.net/busDb")

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    busModel.findByIdAndRemove(getId,
        (error,data)=>{
        if(error)
        {
            res.send({"status":error})
        }
        else{
            res.send({"status":"success"})
        }

       
    })
})


app.post("/api/search",(req,res)=>{
    var getRoute=req.body
    busModel.find(getRoute,
        (error,data)=>{

            if(error)
            {
                res.send({"status":"error"})
            }
            else{
                res.send(data)
                
            }



        }
        )


})

app.post("/api/busadd",(req,res)=>{
    var getRoute=req.body.route
    var getBusname=req.body.busname
    var getRegno=req.body.regno
    var getOwner=req.body.ownername
    var getContact=req.body.contactno

     data={"route":getRoute,"busname":getBusname,"regno":getRegno,"ownername":getOwner,"contactno":getContact}
     let mybus=new busModel(data)
     mybus.save((error,data)=>{
         if(error)
         {
             res.send({"status":"error","data":error})


         }
         else
         {
             res.send({"status":"success","data":data})


         }


     })

   

})
app.get("/api/view",(req,res)=>{
    busModel.find((error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else
        {
            res.send(data)
        }



    })
   


})

app.listen(4000,()=>{
    console.log("Server running")


})


