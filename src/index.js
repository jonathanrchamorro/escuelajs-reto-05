const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
const $finish = document.getElementById('finish');
//
window.addEventListener('DOMContentLoaded', (e) => {
    this.localStorage.clear()
    console.log('se ha reiniciado todo')
});//

const getData = api => {
  //
  if(localStorage.getItem('next_fetch') !== null) {
    api = this.localStorage.getItem('next_fetch')
    }//
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      //
      const next_fetch = response.info.next
      const personajes = response.info.count
      console.log(next_fetch) //

      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      //

      this.localStorage.setItem('next_fetch', next_fetch)
      if(next_fetch === null) {
        $finish.innerHTML = '<p>Ya no hay personajes..</p>'
        intersectionObserver.disconnect($observe);
        console.log(`se acabaron los ${personajes} personajes y se desconecto el observer`)
      }//
    })
    .catch(error => console.log(error));
}

// const loadData = () => {
//   getData(API);

//
const loadData = async () => {
  try {
    await getData(API);
    console.log('loading....')
  }
  catch (error) {
    console.log(error)
  }
}

  const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  }, {
    rootMargin: '0px 0px 100% 0px',
} );

intersectionObserver.observe($observe);
