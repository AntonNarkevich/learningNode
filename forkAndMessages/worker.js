process.on('message', function(m) {
  // Do work  (in this case just up-case the string
  m = m.toUpperCase();
  
  setTimeout(function() {
		// Pass results back to parent process
		process.send(m.toUpperCase(m)); 
	},
	1000); 
});