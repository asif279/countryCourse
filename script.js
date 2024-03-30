document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('resultsContainer');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementsByClassName('close')[0];

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        if (searchTerm.trim() !== '') {
            fetchCountryData(searchTerm);
        } else {
            alert('Please enter a country name.');
        }
    });

    function fetchCountryData(countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                displayCountryData(data);
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
            });
    }

    function displayCountryData(data) {
        resultsContainer.innerHTML = '';
        data.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('grid-item');
            countryDiv.innerHTML = `
                <h3>${country.name.common}</h3>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
                <button class="detailsButton">More Details</button>
            `;
            resultsContainer.appendChild(countryDiv);

            const detailsButton = countryDiv.querySelector('.detailsButton');
            detailsButton.addEventListener('click', () => {
                displayAdditionalData(country);
            });
        });
    }

    function displayAdditionalData(country) {
        modalContent.innerHTML = `
            <h2>${country.name.common}</h2>
            <p>Flag: <img src="${country.flags.png}" alt="Flag"></p>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
        `;
        modal.style.display = 'block';
    }

    modalClose.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
