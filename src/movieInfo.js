const axios = require('axios');
const env = require('../config/env');

async function movieInfo(imdb) {

    function movieData(id) {
        return axios.get("https://api.themoviedb.org/3/find/"+id+"?api_key="+env.API_KEY+"&language=pt-BR&external_source=imdb_id")
                .then(response => {                
                    return response.data.movie_results[0];
                }).catch((err) => {
                    console.error("ops! ocorreu um erro movieData " + err);
                });
    }
    
    function watchMovie(id) {
        let name = "";
        return axios.get("https://api.themoviedb.org/3/movie/"+id+"/watch/providers?api_key="+env.API_KEY)
                .then(response => {
                    const providers = response.data.results.BR.flatrate;
                    providers.forEach(element => {
                        name = name+element.provider_name+"  ";
                    });
                    return name;
                }).catch((err) => {
                    console.error("ops! ocorreu um erro watchMovie" + err);
                });
    }

    const data = await movieData(imdb);
    const watch = await watchMovie(data.id);

    const movie = {
        name: data.title,
        subtitle: data.title+'\r\nAno: '+data.release_date.slice(0, 4)+
        '\r\n'+data.overview+
        '\r\nOnde assistir: '+watch,
        media: "https://image.tmdb.org/t/p/original"+data.poster_path
    };

    return movie;
}

module.exports = movieInfo;