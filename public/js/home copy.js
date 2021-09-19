
//obtiene la referencia al contenedor main
const main = document.querySelector(".main");
var año="";
const text_año="&primary_release_year=";
const ClaseR="&certification_country=US&certification=R&sort_by=vote_average.desc";
const popular="/now_playing?";
envia("", "","part1")



function definiraño()
{ 
  select = document.getElementById("año");
  var cosa;
  cosa = document.defaño.año[document.defaño.año.selectedIndex].value;
  var selected = document.defaño.año[document.defaño.año.selectedIndex].text;
  if(!cosa)
  {
    año="";
  }
  else
  {
    año=text_año+selected;
    gen();
  }
}

function gen(){
  select = document.getElementById("part1");
  var cosa;
  cosa = document.form.part1[document.form.part1.selectedIndex].value; 
  var selected = document.form.part1[document.form.part1.selectedIndex].text;
  main.innerHTML=""
  if(!cosa)
 {  
  fetch(
    genres_list_http +
    new URLSearchParams({
      api_key: api_key,
    })+año+"&language=es"   
    )
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
      data.genres.forEach((item) => {
      //console.log(item.id+   item.name)
      fetchListaPeliculasPorGenero(item.id, item.name);
      envia(item.id, item.name,"part1")
     
    });
  });
 }
 else{
  main.innerHTML=""
  fetchListaPeliculasPorGenero(cosa, selected);
 }
}

  console.log(genres_list_http +
    new URLSearchParams({
      api_key: api_key,
  
    })+año+"&language=es")



fetch(
    genres_list_http +
    new URLSearchParams({
      api_key: api_key,
 
    })+año+"&language=es"
    
)
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((item) => {
      fetchListaPeliculasPorGenero(item.id, item.name);
      envia(item.id, item.name,"part1")
      
    
    });
  });

function envia(id,name,id2)
{
          select = document.getElementById(id2);
          option = document.createElement("option");
          option.value = id;
          option.text = name;;
          select.appendChild(option);
}


const fetchListaPeliculasPorGenero = (id, genres) => {
  fetch(
    movie_genres_http +
      new URLSearchParams({
        api_key: api_key,
       
        with_genres: id,
       //page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
      })+año+"&language=es"
     
  )    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      construirElementoCategoria(`${genres}_movies`, data.results);
      movie_genres_http +
        new URLSearchParams({
          api_key: api_key,
         
          with_genres: id,
         //page: Math.floor(Math.random() * 3) + 1, //trae pagina al azar
         
        })+año+"&language=es";
    })
    .catch((err) => console.log(err));
};

const fetchListaSeriesPorGenero = (id, genres) => {
  fetch(
    tv_genres_http +
      new URLSearchParams({
        api_key: api_key,
       
        with_genres: id,

      })+"&language=es"
     
  )    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      construirElementoCategoria2(`${genres}_Serie`, data.results);
      tv_genres_http +
        new URLSearchParams({
          api_key: api_key,
         
          with_genres: id,
         
         
        })+"&language=es";
    })
    .catch((err) => console.log(err));
};


function prueba7()
{
  fetch(
      tv_list_http +new URLSearchParams({api_key: api_key,})+"&language=es"
)
.then((res) => res.json())
.then((data) => {
  data.genres.forEach((item) => {
    main.innerHTML=""
    fetchListaSeriesPorGenero(item.id, item.name);
   
  
  });
});
}

function prueba6()
{
  fetch(
    movie_genres_http+new URLSearchParams({api_key: api_key,})+"&language=es"+ClaseR
)
.then((res) => res.json())
  .then((data) => {
    console.log(data);
    main.innerHTML=""
      construirElementoCategoria(`Mejores Clasificacion R`, data.results);
  });
 
}


function prueba5()
{
  main.innerHTML=""
  fetch(
    movie_detail_http +popular +
    new URLSearchParams({
      api_key: api_key,
    })+"&language=es"   
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
      construirElementoCategoria(`Actuales en cine`, data.results);
  });
 

 
  /*
  fetch(
    genres_list_http + popular +
    new URLSearchParams({
      api_key: api_key,
 
    })+"&language=es&page=1"   
    )
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((item) => {
      fetchListaPeliculasPorGenero(item.id, item.name);   
    });
  });

*/
}

/* crea el titulo de categoria */
const construirElementoCategoria = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas(category, data);
};
const construirElementoCategoria2 = (category, data) => {
  main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"> <img src="img/pre.png" alt=""></button>
          
          <h1 class="movie-category">${category.split("_").join(" ")}</h1>

          <div class="movie-container" id="${category}">
          </div>

        <button class="nxt-btn"> <img src="img/nxt.png" alt=""> </button>
    </div>
    `;
  construirTarjetas2(category, data);
};

const construirTarjetas = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};





const construirTarjetas2 = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}s'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.name}</p>
        </div>
        `;

    if (i == data.length - 1) {
      setTimeout(() => {
        setupScrolling();
      }, 100);
    }
  });
};













const fetchListaPeliculasPorGenero2 = (papapa) => {
  fetch(
    "https://api.themoviedb.org/3/movie/"+papapa+"?api_key=1e8e4540d5bee6eba435c503d993a3b9&language=es&append_to_response=release_dates"
     
  )
    .then((res) => res.json())
    .then((data) => {
     // console.log("a");      //console.log(data);
     //console.log(data.release_dates);
     for(var x=0;x<data.release_dates.results.length;x++)
     {
      if(data.release_dates.results[x].iso_3166_1=="US")
      {
        console.log(data.release_dates.results[x].iso_3166_1);
        for(var Y=0;Y<data.release_dates.results[x].release_dates.length;Y++)
        {
          if(!data.release_dates.results[x].release_dates[Y].certification)
          {
          }
          else{
            console.log(data.release_dates.results[x].release_dates[Y].certification);
          }   
        }
      }     
     }
     //console.log(data)
    })
    .catch((err) => console.log(err));
};



//https://api.themoviedb.org/3/discover/movie?api_key=1e8e4540d5bee6eba435c503d993a3b9&language=es&certification_country=US&certification.lte=R&sort_by=popularity.desc


