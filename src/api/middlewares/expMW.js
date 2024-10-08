//Experimental, delete soon

function middle(req, res, next) {
  console.log("Before the 200");
  next();
}

export default middle;
