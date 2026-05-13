// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "XOZqQmqtgZ8y1sQVKp3B0JAQcgBMkLJi";
axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}`).then(response => console.log(response));

document.getElementById("search-form").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission behavior
            const searchTerm = document.getElementById("search-input").value; 
            giphyRequest(searchTerm);
          });

document.getElementById("remove-gifs").addEventListener("click", function() {
    const giphyContainer = document.getElementById("giphy-container");
    giphyContainer.innerHTML = ""; // Clear all GIFs from the container
  });

let gifIndex = 0;
let lastSearchTerm = null;

async function giphyRequest(searchTerm) {
    if (searchTerm !== lastSearchTerm) {
        gifIndex = 0;
        lastSearchTerm = searchTerm;
    }
    try {
        const response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${giphyApiKey}`);
        const gifUrl = response.data.data[gifIndex].images.original.url;
        const imgElement = document.createElement("img");
        imgElement.src = gifUrl;
        document.getElementById("giphy-container").appendChild(imgElement);
        gifIndex++;
    } catch (error) {
        const imgElement = document.createElement("img");
        imgElement.src = "https://placehold.co/220x220/1a0d2e/ff00ff?text=API+Error";
        imgElement.alt = "API Error";
        document.getElementById("giphy-container").appendChild(imgElement);
    }
  }
