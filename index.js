var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
var mysql = require('mysql2');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tuhana123-"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Bağlandı!");});


    app.get("/", (req, res) => {
      res.redirect("/Anasayfa");
  });
  


app.get('/Anasayfa', (req, res)=> {

let qry = "SELECT deyim_id, deyim_adi, deyim_aciklama FROM DBTuhanaSinan.deyimler";
    con.query(qry, (err, data)=>{
      if(err){
        console.error("Hata veriyor ", err);
        
      } else {
        console.log(data);
        res.render("index", { deyimData: data });
      }
    });

    });

    app.get('/Filtrele', (req, res) =>{
    let kosul=req.query.kosulDegeri;

    let qry = "SELECT deyim_id, deyim_adi, deyim_aciklama FROM DBTuhanaSinan.deyimler WHERE deyim_adi LIKE '%" + kosul + "%'";
            con.query(qry, function(err, data){
              if(err){
                console.error("HATA VERİYOR!", err);
                
              } else {
                console.log(data);
                res.render("index", { deyimData: data });
              }
            });
        
            });

    app.get('/iletisim', (req, res) => {
        res.render('iletisim');
    });
    
  
    app.listen(7078);
    console.log('Server is listening on 7078');