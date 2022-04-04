'use strict'

const functions = require("firebase-functions");
const cors = require('cors')({origin: "*"});
const fetch = require('node-fetch');

exports.search = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Starting a search", {structuredData: true});
  return cors(request, response, async () => {
    if(request.method !== 'GET') {
      return response.status(401).json({
        message: 'Not allowed'
      })
    }
    try {
      // TOD should validate if search parameter was sent
      const searchTerm = request.query?.search;

      // TODO api key should be in secrets manager. I couldn't get it to work correctly so left it here for now.
      // TODO also probably want to add limit and offset for search
      const url = `https://www.giantbomb.com/api/games/?filter=name:${searchTerm}&sort=name:asc&field_list=name,deck,image,guid&format=json&api_key=d0ede037ba952980a7051b28c0a7ad15baf6197b`;
  
      const rawResult = await fetch(
        url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const parsedResult = await rawResult.json();
      response.status(200).send(parsedResult);
    } catch (err) {
      functions.logger.error("Search error", err);
      response.status(500).send();
    }
  });
});
