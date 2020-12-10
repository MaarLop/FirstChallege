//Install express server    
const express = require('express');

const path = require('path');   

const app = express();   

app.use(express.static('./dist/desapp-grupo-o-fronted'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/desapp-grupo-o-fronted/'}
  );
}); 

// Start the app by listening on the default Heroku port    
app.listen(process.env.PORT || 4200);