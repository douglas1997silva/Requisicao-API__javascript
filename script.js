//UL
const containerVideos = document.querySelector(".videos__container");

async function buscarVideosApi() {
  try {
    const response = await fetch("http://localhost:3000/videos");
    const videos = await response.json();

    videos.forEach((video) => {
      if (!video.categoria) {
        throw new Error("Esse vídeo não tem categoria");
      }

      const li = document.createElement("li");
      li.className = "videos item";

      const iframe = document.createElement("iframe");
      iframe.src = video.url;
      iframe.title = video.titulo;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "");

      const divDescricao = document.createElement("div");
      divDescricao.className = "descricao-video";

      const imgCanal = document.createElement("img");
      imgCanal.className = "img-canal";
      imgCanal.src = video.imagem;
      imgCanal.alt = "logo do canal";

      const h3Titulo = document.createElement("h3");
      h3Titulo.className = "titulo-video";
      h3Titulo.textContent = video.titulo;

      const pDescricao = document.createElement("p");
      pDescricao.className = "titulo-canal";
      pDescricao.textContent = video.descricao;

      divDescricao.appendChild(imgCanal);
      divDescricao.appendChild(h3Titulo);
      divDescricao.appendChild(pDescricao);

      li.appendChild(iframe);
      li.appendChild(divDescricao);

      containerVideos.appendChild(li);
    });
  } catch (error) {
    containerVideos.innerHTML = `<p>Houve um erro ao carregar o vídeo: ${error}</p>`;
  }
}

buscarVideosApi();
