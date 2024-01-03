//UL
const containerVideos = document.querySelector(".videos__container");

async function buscarVideosApi() {
  try {
    // Lógica assíncrona que pode gerar exceções
    const buscar = await fetch("http://localhost:3000/videos");
    const videos = await buscar.json();

    videos.forEach((video) => {
      if (video.categoria === "") {
        throw new Error("Esse vídeo não tem categoria");
      }
      // Adicionei vídeos ao containerVideos
      containerVideos.innerHTML += `
         <li class="videos__item">
           <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
           <div class='descricao-video'>
             <img class='img-canal' src='${video.imagem}' alt='logo do canal'> 
             <h3 class="titulo-video"> ${video.titulo} </h3>
             <p class="titulo-canal">${video.descricao}</p>
           </div>
         </li>`;
    });
  } catch (error) {
    // Tratamento de erro, se ocorrer
    containerVideos.innerHTML = `<p>Houve um erro ao carregar o vídeo: ${error}</p>`;
  }
}

// Chamada da função buscarVideosApi
buscarVideosApi();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);


//filtro de pesquisa
function filtrarPesquisa() {
  const video = document.querySelectorAll(".videos__item");

  const videos = document.querySelectorAll(".videos__item");
  const valorFiltro = barraDePesquisa.value.toLowerCase();

  videos.forEach((video) => {
    const titulo = video
      .querySelector(".titulo-video")
      .textContent.toLowerCase();

    video.style.display = valorFiltro
      ? titulo.includes(valorFiltro)
        ? "block"
        : "none"
      : "block";
  });
}
