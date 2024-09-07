// Function to fetch Spotify data
export async function fetchSpotifyData(accessToken) {
    try {
        // Request the top 0 to 50 artists
        const response1 = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response1.ok) {
            throw new Error('Network response was not ok');
        }

        // Request the top 50 to 100 artists
        const response2 = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=50', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        const merged = {
            items: data1.items.concat(data2.items)
        };

        const similarity = getSimilarity(merged);

        displayResults(merged);
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        document.getElementById('results').innerText = 'Failed to load data.';
    }
}

// Function to calculate how similar the two are
function getSimilarity(data) {
    fetch('config/Julias_Top_100.json')
    .then(juliaResponse => {
        if (!juliaResponse.ok) {
          throw new Error('Network response was not ok ' + juliaResponse.statusText);
        }
        return juliaResponse.json();
      })
      .then(juliaData => {
        // console.log(juliaData); // Use the data from your JSON file
        const juliaIds = Object.keys(juliaData);
        const ids = data.items.map(item => item.id);

        const setJuliaIds = new Set(juliaIds);
        const setIds = new Set(ids);
        const commonIds = [...setJuliaIds].filter(id => setIds.has(id));
    
        const count = commonIds.length;
    
        console.log(count)

        displayResults(count)
      })
      .catch(error => {
        // TODO: Clean this up so that the entire method is not within a .then() statement.
        console.error('Error fetching the config JSON file:', error);
      });
    

}

// Function to display the fetched results
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `Your music taste is ${data}% good.`;

    if (data >= 66) {
        const textDiv = document.createElement('div');
        textDiv.innerHTML = '<p><span style="color: #00ff00;">Your music taste is super rad. You are cool.&nbsp;<img src="https://html5-editor.net/tinymce/plugins/emoticons/img/smiley-cool.gif" alt="cool" /></span></p>'
        resultsDiv.appendChild(textDiv);
    } else if (data >= 33) {
        const textDiv = document.createElement('div');
        textDiv.innerHTML = '<p><span style="color: #ff9900;">Your music taste is okay I guess. It could be better</span>&nbsp;<img src="https://html5-editor.net/tinymce/plugins/emoticons/img/smiley-undecided.gif" alt="undecided" /></p>'
        resultsDiv.appendChild(textDiv);
    } else {
        const textDiv = document.createElement('div');
        textDiv.innerHTML = '<p><span style="color: #ff0000;">YOU SUCK!!!!! You should kill yourself.</span>&nbsp;<img src="https://html5-editor.net/tinymce/plugins/emoticons/img/smiley-money-mouth.gif" alt="money-mouth" /></p>'
        resultsDiv.appendChild(textDiv);
    }    

    // if (data.items && data.items.length > 0) {
    //     data.items.forEach(artist => {
    //         const artistDiv = document.createElement('div');
    //         artistDiv.innerHTML = `
    //             <strong>${artist.name}</strong>
    //             <br>
    //             <img src="${artist.images[0]?.url}" alt="${artist.name}" style="width: 100px; height: 100px;">
    //             <br><br>
    //         `;
    //         resultsDiv.appendChild(artistDiv);
    //     });
    // } else {
    //     resultsDiv.innerText = 'No top artists found.';
    // }
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
