// הספריית אקפסרס עצמה לתפעול שרת בקלות
const express = require("express");
// מודול שיודע לעשות מינפולציות על כתובת שהוא מקבל
const path = require("path");
// מודול שיודע להריץ שרת
const http = require("http");
const { routesInit } = require("./api/routes/config_routes");

require('./api/db/mongoConnect')
// מגדיר משתנה שמשתמש ביכולות האקספרס ולאחר מכן
// נאסוף אותו כאשר נפעיל שרת עם  מודול
// HTTP
const app = express();

// מידלוואר פונקצית אמצע לפני שמגיעים לראוט
// כל מידע שאני מקבל ומחזיר יהיה בפורמט גי'סון אם אפשרי
app.use(express.json());
// להגדיר תקייה סטטית למשתמש שכל קובץ שנמצא שם יהיה חשוף לו
app.use(express.static(path.join(__dirname, "public")));
// לאפשר לדפדפן לבצע בקשה מכל דומיין לשרת שלנו
// פונקציה שמגדירה בשבילנו בקובץ אחר
// את כל הראוטים שקיימים כגון אינדקס ויוזס
// מעבירים את האפ כדי שיכיר את אותו משתנה בקובץ שהפונקציה
// נמצאת בו
routesInit(app);
// app.use("/", (req,res) => {
//   res.json({msg:"express work fine 888!"});
// })

// ייצור שרת שמאזין לכניסה לפורט 3000
const server = http.createServer(app);
let port = process.env.PORT || "3000";
server.listen(port);

app.all('*', (req, res, next) => {
    if (!req.get('Origin')) return next();
    // * -> במציאות במקום כוכבית נכניס שם דומיין שיש לו אישור גישה
    // לשרת
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token,x-api-key,apiKey');
    next();
});

