import '@babel/polyfill';
import fs from 'fs';
import server from 'http';
import url from 'url';
import process from 'process';
import config from './config/config';
import { middleTier } from './controllers/skyFlightController'

// Allowing access to all origins
const appServer = server.createServer((req,res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
});
appServer.on('request', (req, res) => {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  // Bases on the url pattern, the appropriate function is called from the middle tier
  switch(url_parts.pathname) {
  	case '/api/places':
  	   // Getting Airport data for populating dropdown on UI (Source and Destination)
	   middleTier.getPlaces({
	   	 source:url_parts.query.source, 
         destination:url_parts.query.destination,
         date:url_parts.query.date
	   }).then((data) => {
	   	 // If API call is a success
	   	 res.writeHead(200, {'Content-Type':'application/json'});
	     res.end(JSON.stringify(data));
	   }).catch((err) => {
	   	 // In case of any exceptions in middle tier
	   	 res.writeHead(500, {'Content-Type':'application/json'});
	     res.end(JSON.stringify({error:'Server error..Please try again later'}))
	   });
	   break;
	case '/api/search':
	   // Getting formatted Flight Prices Data
	   middleTier.getFlightPrices({
	   	 source:url_parts.query.source, 
         destination:url_parts.query.destination,
         date:url_parts.query.date
	   }).then((data) => {
	   	 // If API call is a success
	   	 res.writeHead(200, {'Content-Type':'application/json'});
	     res.end(JSON.stringify(data))
	   }).catch((err) => {
	   	 // In case of any exceptions in middle tier
	   	 res.writeHead(500, {'Content-Type':'application/json'});
	     res.end(JSON.stringify({error:'Server error..Please try again later'}))
	   });
	   break;
	default: 
	   res.writeHead(404);
	   res.end();
  }
  
});
// Starting the node server
appServer.listen(config.port, () => {
  console.log(`server started on port:${config.port}`)
});

// Exception Management in case process crashes
process.on('beforeExit', (code) => {
  logger.error('Process beforeExit event with code: ', code);
  mailServer.triggerEmail('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  logger.error('Process exit event with code: ', code);
  mailServer.triggerEmail('Process exit event with code: ', code);
});