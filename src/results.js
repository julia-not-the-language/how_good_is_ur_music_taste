// Function to fetch Spotify data
export async function fetchSpotifyData(accessToken) {
    try {
        // Request the top artists
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=25', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        document.getElementById('results').innerText = 'Failed to load data.';
    }
}

// Function to display the fetched results
function displayResults(data) {
    const resultsDiv = document.getElementById('results');

    if (data.items && data.items.length > 0) {
        data.items.forEach(artist => {
            const artistDiv = document.createElement('div');
            artistDiv.innerHTML = `
                <strong>${artist.name}</strong>
                <br>
                <img src="${artist.images[0]?.url}" alt="${artist.name}" style="width: 100px; height: 100px;">
                <br><br>
            `;
            resultsDiv.appendChild(artistDiv);
        });
    } else {
        resultsDiv.innerText = 'No top artists found.';
    }
}

// On page load, retrieve the access token and fetch data
document.addEventListener('DOMContentLoaded', () => {
    const accessToken = sessionStorage.getItem('spotifyAccessToken');
    
    if (accessToken) {
        fetchSpotifyData(accessToken);
    } else {
        document.getElementById('results').innerText = 'No access token found. Please log in again.';
    }
});
