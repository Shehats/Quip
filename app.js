const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000, function(){
 console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
