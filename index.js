// the actual file that load the server
const server = require('./server');
// listning port from current environement or 
// if not present defaulted at 3000
const PORT = process.env.PORT || 3000;


server.listen(PORT, ()=>{
    // showing in the console the listening PORT
    console.log(`Listening to port ${PORT} ...`);
})

