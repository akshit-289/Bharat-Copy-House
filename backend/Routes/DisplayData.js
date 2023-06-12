const express = require('express');
const router = express.Router();       

router.post('/notebookData', (req, res)=>{
   try {
      res.send([global.notebooks,global.noteCateg]); 
   }
   catch (error) {
      console.error(error.message);
      res.send("Server Error")
   }   
})

module.exports = router;