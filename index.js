const express = require('express');
const bodyparser = require('body-parser');
const auth = require('http-auth');

let app = express();

app.use(express.static("public"));


let basic = auth.basic({
    realm: "simplon", //pr avoir plusieurs domaines d'authentification
    file: __dirname + "/.htpasswd" //chemin depuis lequel on execute le script + après le nom du fichier
});
app.use("/private", auth.connect(basic));

app.post("/auth", //auth c'est la route où va s'executer la fonction qui est décrite après
    //première fonction à être appellée
    bodyparser.urlencoded({ extended: true }),
    function(request, response) {
        console.log(request.body.pseudo + ' ' + request.body.password);
        response.send("Success!")
    });
app.get('/private', (req, res) => {
    res.send(`Hello from express - ${req.user}!`);
});

app.listen(3000, "localhost", function() {
    console.log('Server listening on port 3000...');
});