const fs = require("fs")
const path = require("path")

const words=[
//vegtable
{word:"pepper",translation:"פלפל",img:{data:fs.readFileSync(path.join(__dirname,"..","images","pepper.jpg")),contentType:"jpg"}},
{word:"cucumber",translation:"מלפפון",img:{data:fs.readFileSync(path.join(__dirname,"..","images","cucumber.jpg")),contentType:"jpg"}},
{word:"tomato",translation:"עגבניה",img:{data:fs.readFileSync(path.join(__dirname,"..","images","tomato.jpg")),contentType:"jpg"}},
{word:"potato",translation:"תפוח אדמה",img:{data:fs.readFileSync(path.join(__dirname,"..","images","potato.jpg")),contentType:"jpg"}},
{word:"eggplant",translation:"חציל",img:{data:fs.readFileSync(path.join(__dirname,"..","images","eggplant.jpg")),contentType:"jpg"}},
{word:"onion",translation:"בצל",img:{data:fs.readFileSync(path.join(__dirname,"..","images","onion.jpg")),contentType:"jpg"}},
{word:"sweet potato",translation:"בטטה",img:{data:fs.readFileSync(path.join(__dirname,"..","images","sweet potato.jpg")),contentType:"jpg"}},
{word:"carrot",translation:"גזר",img:{data:fs.readFileSync(path.join(__dirname,"..","images","carrot.jpg")),contentType:"jpg"}},
{word:"mushroom",translation:"פטריה",img:{data:fs.readFileSync(path.join(__dirname,"..","images","mushroom.jpg")),contentType:"jpg"}},
{word:"lettuce",translation:"חסה",img:{data:fs.readFileSync(path.join(__dirname,"..","images","lettuce.jpg")),contentType:"jpg"}},
{word:"garlic",translation:"שום",img:{data:fs.readFileSync(path.join(__dirname,"..","images","garlic.jpg")),contentType:"jpg"}},
{word:"cabbage",translation:"כרוב",img:{data:fs.readFileSync(path.join(__dirname,"..","images","cabbage.jpg")),contentType:"jpg"}}
]
module.exports={words}