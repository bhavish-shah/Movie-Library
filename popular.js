const API_KEY = 'api_key=e5f753b2cd879d7a7ea6e4d3eda605da';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const top_rated ='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&'+API_KEY;
const upcoming='https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

let selectedGenre=[];

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

setGenre();

function setGenre() {
  tagsEl.innerHTML= '<h1>Genre</h1>';
  genres.forEach(genre => {
      const t = document.createElement('div');
      t.classList.add('tag');
      t.id=genre.id;
      t.innerHTML = '<i class="fa-solid fa-compact-disc"></i>&nbsp; '+genre.name;
      t.addEventListener('click', () => {
          if(selectedGenre.length == 0){
              selectedGenre.push(genre.id);
          }else{
              if(selectedGenre.includes(genre.id)){
                  selectedGenre.forEach((id, idx) => {
                      if(id == genre.id){
                          selectedGenre.splice(idx, 1);
                      }
                  })
              }else{
                  selectedGenre.push(genre.id);
              }
          }
          console.log(selectedGenre)
          getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
          highlightSelection()
      })
      tagsEl.append(t);
  })
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
      tag.classList.remove('highlight')
  })
  clearBtn()
  if(selectedGenre.length !=0){   
      selectedGenre.forEach(id => {
          const hightlightedTag = document.getElementById(id);
          hightlightedTag.classList.add('highlight');
      })
  }

}
function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
      clearBtn.classList.add('highlight')
  }else{
          
      let clear = document.createElement('div');
      clear.classList.add('tag','highlight');
      clear.id = 'clear';
      clear.innerText = 'Clear x';
      clear.addEventListener('click', () => {
          selectedGenre = [];
          setGenre();            
          getMovies(API_URL);
      })
      tagsEl.append(clear);
  }
  
}

form.addEventListener('submit', (e) => {
  e.preventDefault();


  const searchTerm = search.value;
  selectedGenre=[];
  setGenre();
  if(searchTerm) {
      getMovies(searchURL+'&query='+searchTerm)
  }else{
      getMovies(API_URL);
  }

})

getMovies(API_URL);
function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);}
            else{
              main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
          }
         
      })
  
  }
 
  
  function showMovies(data) {
    main.innerHTML = '';
    
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        const styleuh=document.querySelector('style');
        
        movieEl.classList.add('movie');
        let rat=(vote_average/2).toFixed(1);
        let pat=parseFloat((rat%1).toFixed(1));
        let class_rat='botch';
        let movie_html='';
        if (pat===0.1) {
          class_rat='rat1';
        }
        else if (pat===0.2) {
          class_rat='rat2';
        }
        else if (pat===0.3) {
          class_rat='rat3';
        }
        else if (pat===0.4){
          class_rat='rat4';
        }
        else if (pat===0.5){
          class_rat='rat5';
        }
        else if (pat===0.6){
          class_rat='rat6';
        }
        else if (pat===0.7){
          class_rat='rat7';
        }
        else if (pat===0.8){
          class_rat='rat8';
        }
        else if (pat===0.9){
          class_rat='rat9';
        }
        movie_html = `

        <div  class="movie-box">
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
        <div class="name-rating">
          <h2 class="movie-name">${title}</h2>
          <div class="rating">
          
        `
        for (let i = 0; i < 5; i++) {
          if (rat>=1) {
            rat--;
          movie_html  += `<i class="fa-solid fa-star"></i>`
          }
          else if (rat<1&&rat>0) {
            movie_html += `<i id="hi" class="fa-solid fa-star ${class_rat}"
            style="
            background: linear-gradient(to left,
  
              white ${(pat)*100}%,
              #546E7A 0%
            );
      -webkit-background-clip: text;
      color: transparent;
            "
            ></i>`
            
            rat=0;
          }
          else{
            movie_html += `<i class="fa-solid fa-star"
            style="
            color: white;
             " 
            ></i>`
          }
        }
        movie_html += `
        </div>
        </div>
      </div>
      `
     

    
      
      movieEl.innerHTML = movie_html;

        main.appendChild(movieEl);

        const movieBox = movieEl.querySelector('.movie-box');
        movieBox.addEventListener('click', () => {
            openNav(movie);
        });
        
        
        
    })
}

const overlayContent = document.getElementById('overlay-content');
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let {name, key, site} = video

          if(site == 'YouTube'){
              
            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        })
        
        var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        
        ${embed.join('')}
        <br/>

        <div class="dots">${dots.join('')}</div>
        
        `
        overlayContent.innerHTML = content;
        activeSlide=0;
        showVideos();
      }else{
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

const radioButtons = document.querySelectorAll('input[type="radio"]'); 
// Add event listener to each radio button
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    
    // Call your function or perform action based on the selected value
    switch(selectedValue) {
      case 'option1':
        getMovies(API_URL);
        break;
      case 'option2':
        getMovies(top_rated);
        break;
      case 'option3':
        
        getMovies(upcoming);
        break;
        default:
          break;
    }
  });
});