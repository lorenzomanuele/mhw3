function apriTendina1(event){
    const tendina1 = document.querySelector('#scomparsa1');
    tendina1.classList.remove('hidden');
    chiudiTendina2();
    document.querySelector('#eventi').removeEventListener('click', apriTendina1);
    document.querySelector('#eventi').addEventListener('click', chiudiTendina1);
    event.stopPropagation();
}

function chiudiTendina1(){
    const tendina1 = document.querySelector('#scomparsa1');
    tendina1.classList.add('hidden');
    document.querySelector('#eventi').removeEventListener('click', chiudiTendina1);
    document.querySelector('#eventi').addEventListener('click', apriTendina1);
}

function apriTendina2(event){
    const tendina2 = document.querySelector('#scomparsa2');
    tendina2.classList.remove('hidden');
    chiudiTendina1();
    document.querySelector('#localita').removeEventListener('click', apriTendina2);
    document.querySelector('#localita').addEventListener('click', chiudiTendina2);
    event.stopPropagation();
}

function chiudiTendina2(){
    const tendina2 = document.querySelector('#scomparsa2');
    tendina2.classList.add('hidden');
    document.querySelector('#localita').removeEventListener('click', chiudiTendina2);
    document.querySelector('#localita').addEventListener('click', apriTendina2);
}

document.querySelector('#eventi').addEventListener('click', apriTendina1);

document.querySelector('#localita').addEventListener('click', apriTendina2);

function ingrandisci(event){
    const item = event.target;
    item.classList.add('ingrandimento');
    item.addEventListener('mouseout', rimpicciolisci);
    event.stopPropagation();
}

function rimpicciolisci(event){
    const item = event.target;
    item.classList.remove('ingrandimento');
    item.addEventListener('mouseover', ingrandisci);
    event.stopPropagation();
}

document.querySelector("#first-container1").addEventListener('mouseover', ingrandisci);
document.querySelector("#second-container1").addEventListener('mouseover', ingrandisci);

document.querySelector(".container1").addEventListener('mouseover', ingrandisci);


function dettagliVoucher(event){
    const voucher = event.currentTarget;
    voucher.getAttribute("data-info");
}

document.querySelector('.voucher-covid').addEventListener('click', dettagliVoucher);



// Musicbrainz API

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}


function onJson(json) {
  console.log('JSON ricevuto');
  const library = document.querySelector('#contenitore');
  library.innerHTML = '';
  let num_results = json.count;
  if(num_results > 10)
    num_results = 10;
  for(let i=0; i<num_results; i++)
  {
    const doc = json.artists[i]
    const name = 'Nome: '+ doc.name;
    const paese = 'Paese: ' + doc.country;      
    const artista = document.createElement('div');
    artista.classList.add('artista');
    const caption = document.createElement('span');
    caption.textContent = name + paese;
    artista.appendChild(caption);
    library.appendChild(artista);
  }
}
  
  
function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}
  
function search(event) {
  event.preventDefault();
  const artist_input = document.querySelector('#artist');
  const artist_value = encodeURIComponent(artist_input.value);
  console.log('Eseguo ricerca: ' + artist_input);
  rest_url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artist_value + '&fmt=json';
  console.log('URL: ' + rest_url);
  fetch(rest_url).then(onResponse).then(onJson).catch(error => {
    console.error('Error fetching JSON data:', error);
    });
}


const form = document.querySelector('form');
form.addEventListener('submit', search);    
form.addEventListener('form', apriCopertina);

function apriCopertina(event){
  const copertina = document.querySelector('#copertina');
  copertina.classList.remove('hidden');
  const crocetta = document.querySelector('#crocetta');
  crocetta.classList.remove('hidden');
  crocetta.addEventListener('click', chiudiCopertina);
  document.querySelector('form').removeEventListener('click', apriCopertina);
  event.stopPropagation();
}

function chiudiCopertina(){
  const copertina = document.querySelector('#copertina');
  copertina.classList.add('hidden');
  const crocetta = document.querySelector('#crocetta');
  crocetta.classList.add('hidden');
  document.querySelector('form').removeEventListener('click', chiudiCopertina);
  document.querySelector('form').addEventListener('click', apriCopertina);
}

// Spotify API

function onJson2(json) {
  console.log('JSON ricevuto');
  const library = document.querySelector('#artist-view');
  library.innerHTML = '';
  const results = json.artists.items;
  let num_results = results.length;
  if(num_results > 10)
    num_results = 10;
  for(let i=0; i<num_results; i++)
  {
    const artist_data = results[i]
    const nome = artist_data.name;
    const selected_image = artist_data.images[0].url;
    const artist = document.createElement('div');
    artist.classList.add('artist');
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('span');
    caption.textContent = nome;
    artist.appendChild(img);
    artist.appendChild(caption);
    library.appendChild(artist);
  }
}

function onResponse2(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function Search2(event) {
  event.preventDefault();
  const artist_input = document.querySelector('#artist');
  const artist_value = encodeURIComponent(artist_input.value);
  console.log('Eseguo ricerca: ' + artist_value);
  fetch("https://api.spotify.com/v1/search?type=artist&q=" + artist_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse2).then(onJson2);
}

function onTokenJson(json) {
  token = json.access_token;
  console.log('token ricevuto')
}

function onTokenResponse(response) {
  return response.json();
}

const client_id = '5c95b5544df4430886ad5f4db8272689';
const client_secret = 'ef1b9a487ca741af8801397998ea1494';
let token;
fetch("https://accounts.spotify.com/api/token",
    {
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);


function apriView(event){
  const footer = document.querySelector('footer');
  footer.classList.add('hidden');
  const view = document.querySelector('#contenitore2');
  view.classList.remove('hidden');
  const crocetta = document.querySelector('#crocetta2');
  crocetta.classList.remove('hidden');
  crocetta.addEventListener('click', chiudiCopertina);
  document.querySelector('#barradiricerca').removeEventListener('click', apriView);
  event.stopPropagation();
}

function chiudiView(){
  const footer = document.querySelector('footer');
  footer.classList.add('hidden');
  const view = document.querySelector('#contenitore2');
  view.classList.add('hidden');
  const crocetta = document.querySelector('#crocetta2');
  crocetta.classList.add('hidden');
  document.querySelector('#barradiricerca').removeEventListener('click', chiudiView);
  document.querySelector('#barradiricerca').addEventListener('click', apriView);
}

const form2 = document.querySelector('form #barradiricerca');
form2.addEventListener('submit', Search2);    
form2.addEventListener('form #barradiricerca', apriView);