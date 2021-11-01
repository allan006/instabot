const fs = require('fs');
const axios = require('axios');

async function downloader(url, name) {
    return axios({
        method: 'get',
        url: url,
        responseType: 'stream'
      })
        .then(function (response) {
          response.data.pipe(fs.createWriteStream('./media/'+name+'.jpeg'))
        });
}
module.exports = downloader;