const name="review"
const values='comment,userID,stars,productID,'

const fs=require("fs")

start()
async function start(){
    let route=(await fs.readFileSync(__dirname+"/routeMaker/route.txt")).toLocaleString()
    let controller=(await fs.readFileSync(__dirname+"/routeMaker/controller.txt")).toLocaleString()
    
    route=route.replace(/RouteName/g,name)
    route=route.replace(/RouteValues/g,values)
    controller=controller.replace(/RouteName/g,name)
    controller=controller.replace(/RouteValues/g,values)


    await fs.writeFileSync("./routes/"+name+"Route.js",route)
    await fs.writeFileSync("./controller/"+name+"Controller.js",controller)
}
