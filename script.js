const navList = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then((res) => res.json())
        .then((data) => showList(data.data.news_category));
}

const showList = (navList_data) => {
    const navContainer = document.getElementById("newsList");
    navList_data.forEach(single_data => {
        navContainer.innerHTML +=
            `<p class="cusID-button cursor-pointer" 
            onclick="newsCardList('${single_data.category_id}','${single_data.category_name}')">${single_data.category_name}</p>`
    });
}

const newsCardList = (showList_data, showList_name) => {
    var titleList = document.getElementsByClassName("cusID-button");
    for (single_title of titleList) {
        single_title.classList.remove('bg-indigo-100', 'text-indigo-700', 'px-1', 'py-1', 'rounded');
    }
    event.target.classList.add('bg-indigo-100', 'text-indigo-700', 'px-1', 'py-1', 'rounded');
    fetch(`https://openapi.programming-hero.com/api/news/category/${showList_data}`)
        .then((res) => res.json())
        .then((data) => showCard(data.data, showList_name));
}

const showCard = (newsCardList_data, showList_name) => {
    const cardContainer = document.getElementById("card-Container");
    const alertContainer = document.getElementById("alert-container");

    alertContainer.innerHTML =
        `
    <div class="alert bg-white shadow-lg">
        <div>
            <span class="text-black font-medium">${newsCardList_data.length} items found for category ${showList_name}</span>
        </div>
    </div>
    `

    cardContainer.innerHTML = "";
    newsCardList_data.forEach(single_data => {
        cardContainer.innerHTML +=
            `
        <div class="card card-side bg-white shadow-xl mb-6">
                <figure><img src="${single_data.thumbnail_url}" alt="Movie" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title text-black">${single_data.title} 
                    ${single_data.others_info.is_trending ? "<span class='badge badge-info'>Trending</span>" : ""}
                    ${single_data.others_info.is_todays_pick ? "<span class='badge badge-success'>Today's Pick</span>" : ""}
                    </h2>
                    <div class="card-actions">
                        <!-- The button to open modal -->
                        <label for="my-modal-6" class="btn btn-primary" onclick="newsFetch('${single_data._id}')">Details</label>
                    </div>
                </div>
            </div>
        `
    });
}

const newsFetch = (showCard_Data_newsID) => {
    fetch(`https://openapi.programming-hero.com/api/news/${showCard_Data_newsID}`)
        .then((res) => res.json())
        .then((data) => showNews(data.data[0]));
}

const showNews = (newsFetch_data) => {
    const titleDetails = document.getElementById("title-container");
    const newsDetails = document.getElementById("details-container");
    titleDetails.innerText = newsFetch_data.title;
    newsDetails.innerText = newsFetch_data.details;
}

navList();