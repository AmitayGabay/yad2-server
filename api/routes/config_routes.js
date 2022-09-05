const indexR = require("./index");
const usersR = require("./userRoutes");
const catR=require('./categoryRoutes')
const producatR=require("./productRoute")

// פונקציה שתאגד את כל הראוטים הראשיים
// של האפליקציה
exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users", usersR);
  app.use("/categories", catR);
  app.use("/products", producatR);

  // אם כותבים ראוט או קובץ שלא קיים בפאבליק
  // שיציג שגיאה 404
  app.use((req,res) => {
    res.status(404).json({msg_error:"Url not found, 404!"});
  })
}


// מאפשר לשרת בדומיין אחר לבצע בקשות לשרת שלנו דרך דפדפן
