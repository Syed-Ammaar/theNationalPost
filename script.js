const API_KEY = "3b90323ae7f741e392db588f2bd6a1a8";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer= document.getElementById("cards-container");
    const newsTemplate= document.getElementById("template-card");

    cardsContainer.innerHTML='';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const Clone= newsTemplate.content.cloneNode(true);

        fillData(Clone, article);
        cardsContainer.appendChild(Clone);


    });
}


function fillData(Clone, article){
    const newsImg = Clone.querySelector('#news-img');
    const newsTitle = Clone.querySelector('#news-title');
    const newsSource = Clone.querySelector('#news-source');
    const newsDesc = Clone.querySelector('#news-desc');

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML= article.description;
    const date= new Date(article.publishedAt).toLocaleString("en-uS",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML= `${article.source.name} . ${date}`;

    Clone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    }) 
}

const searchButton = document.getElementById('search-button');
const searchText= document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
});