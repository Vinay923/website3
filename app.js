const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;





const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.listen(PORT);
app.use(cors());



const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjAyZTQ5YTU5MjEyNmM5NWMyMmE3OWU1OGFjNThmYSIsIm5iZiI6MTczMTQ5Mjc3My41NDQ0OTYsInN1YiI6IjY2ZjJkYTUyZmMwMDk4MzkxNDhkODRmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zdniJ4cnVp58Oozh0sSEhfI_zhS_jDOVBd5wq1LHJW4'
    }
};





app.get('/upcoming', (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';

    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/now_playing', (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/popular', (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/top_rated', (req, res) => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/recommended/:id', (req, res) => {
    const id = req.params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;

    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/movie_details/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US`;
    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/title/:id', (req, res) => {
    const val = req.params.id;
    var id = "";
    var page = "";
    for(var i=0;i<val.length;i++){
        if(val[i]==='t'){
            id = val.substring(i+1);
            break;
        }
        page+= val[i];
    }
    console.log(val);
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&page=${page}`;
    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/recommendation/:id', (req, res) => {
    const val = req.params.id;
    var id = "";
    var page = "";
    for(var i=0;i<val.length;i++){
        if(val[i]==='t'){
            id = val.substring(i+1);
            break;
        }
        page+= val[i];
    }
    console.log(`request made with id:${id} and page:${page}`);
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`;
    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})
app.get('/search/:id', (req, res) => {
    const val = req.params.id;
    var id = "";
    var page = "";
    for(var i=0;i<val.length;i++){
        if(val[i]==='t'){
            id = val.substring(i+1);
            break;
        }
        page+= val[i];
    }
    // console.log(`request made with id:${id} and page:${page}`);
    const url = `https://api.themoviedb.org/3/search/movie?query=${id}&include_adult=false&language=en-US&page=${page}`;
    fetch(url, options)
        .then(response => response.json())
        .then(json => res.send(json))
        .catch(err => console.error(err));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});