function fetchAndDisplayData() {
    const apiUrl = 'https://api.lmiforall.org.uk/api/v1/vacancies/search';
    const resultsContainer = document.getElementById("jobscontainer");

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching the API');
            }
            return response.json();
        })
        .then(data => {
            const vacancies = data;

            // Sort vacancies by earliest end date
            const sortedVacancies = vacancies.sort((a, b) => {
                return new Date(a.activedate.end) - new Date(b.activedate.end);
            });

            // Take the top 10 results
            const top10Vacancies = sortedVacancies.slice(0, 10);

            // Clear any previous results
            resultsContainer.innerHTML = '';

            // Create and append elements for each vacancy
            top10Vacancies.forEach(vacancy => {
                const vacancyDiv = document.createElement('div');
                vacancyDiv.classList.add('vacancy');

                const title = document.createElement('h3');
                title.textContent = vacancy.title;

                const company = document.createElement('p');
                company.textContent = `Company: ${vacancy.company}`;

                const endDate = document.createElement('p');
                endDate.textContent = `Closing Date: ${new Date(vacancy.activedate.end).toLocaleDateString()}`;

                const toggleButton = document.createElement('button');
                toggleButton.textContent = 'View Details';
                toggleButton.classList.add('toggle-button');

                const summary = document.createElement('p');
                summary.textContent = vacancy.summary;
                summary.classList.add('vacancy-summary');
                summary.style.display = 'none'; // Initially hidden

                // Toggle visibility of the summary
                toggleButton.addEventListener('click', () => {
                    const isCollapsed = summary.style.display === 'none';
                    summary.style.display = isCollapsed ? 'block' : 'none';
                    toggleButton.textContent = isCollapsed ? 'Collapse Details' : 'View Details';
                });

                // Add link button
                const linkButton = document.createElement('a');
                linkButton.textContent = 'Go to Vacancy';
                linkButton.href = vacancy.link; // Use the link from the API
                linkButton.target = '_blank'; // Open in a new tab
                linkButton.classList.add('link-button');
                
                // Append elements to the vacancy div
                vacancyDiv.appendChild(title);
                vacancyDiv.appendChild(company);
                vacancyDiv.appendChild(endDate);
                vacancyDiv.appendChild(toggleButton);
                vacancyDiv.appendChild(linkButton)
                vacancyDiv.appendChild(summary);

                // Append the vacancy div to the results container
                resultsContainer.appendChild(vacancyDiv);
            });

        })
        .catch(error => console.error('Error:', error));
}

// Call the function to fetch and display data
fetchAndDisplayData();


 // want a new function that upon entering an input into the search bar, 
// queries the new api for results, then displays the top 10 results for jobs
//  with the keywords

