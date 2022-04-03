'use strict'

const functions = require("firebase-functions");
const cors = require('cors')({origin: "*"});
const fetch = require('node-fetch');

exports.search = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Doing a search", {structuredData: true});
  return cors(request, response, async () => {
    if(request.method !== 'GET') {
      return response.status(401).json({
        message: 'Not allowed'
      })
    }
    try {
      const searchTerm = request.query?.search;
      // TODO api key should be in secrets manager. I couldn't get it to work correctly so left it here for now.
      const url = `https://www.giantbomb.com/api/games/?filter=name:${searchTerm}&field_list=name,description,image,guid&format=json&api_key=d0ede037ba952980a7051b28c0a7ad15baf6197b`;
  
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
