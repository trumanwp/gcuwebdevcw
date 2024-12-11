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

// JavaScript file for the Vacancies Page

const searchInput = document.getElementById("search");
const jobsContainer = document.getElementById("jobscontainer");

let debounceTimeout;

// Function to fetch job vacancies based on user input using the first API
async function fetchJobVacancies(query) {
  try {
    const response = await fetch(`https://api.lmiforall.org.uk/api/v1/vacancies/search?keywords=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Error fetching vacancies");
    }
    const data = await response.json();
    return data.slice(0, 10); // Limit to top 10 results
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return [];
  }
}

// Function to render job vacancies
function renderJobVacancies(vacancies) {
  jobsContainer.innerHTML = ""; // Clear previous results

  if (vacancies.length === 0) {
    jobsContainer.innerHTML = "<p>No vacancies found. Try a different keyword.</p>";
    return;
  }

  vacancies.forEach((vacancy) => {
    const vacancyDiv = document.createElement("div");
    vacancyDiv.classList.add("vacancy");

    // Create job listing content to match the default structure
    const title = document.createElement("h3");
    title.textContent = vacancy.title;

    const company = document.createElement("p");
    company.textContent = `Company: ${vacancy.company || "N/A"}`;

    const endDate = document.createElement("p");
    endDate.textContent = `Closing Date: ${vacancy.closingDate ? new Date(vacancy.closingDate).toLocaleDateString() : "N/A"}`;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = 'View Details';
    toggleButton.classList.add('toggle-button');

    const summary = document.createElement("p");
    summary.textContent = vacancy.summary || "No details available.";
    summary.classList.add("vacancy-summary");
    summary.style.display = 'none'; // Initially hidden

    // Toggle visibility of the summary
    toggleButton.addEventListener("click", () => {
      const isCollapsed = summary.style.display === "none";
      summary.style.display = isCollapsed ? "block" : "none";
      toggleButton.textContent = isCollapsed ? "Collapse Details" : "View Details";
    });

    // Add link button (Go to Vacancy)
    const linkButton = document.createElement("a");
    linkButton.textContent = "Go to Vacancy";
    linkButton.href = vacancy.link;
    linkButton.target = "_blank"; // Open in a new tab
    linkButton.classList.add("link-button");

    // Append elements to the vacancy div
    vacancyDiv.appendChild(title);
    vacancyDiv.appendChild(company);
    vacancyDiv.appendChild(endDate);
    vacancyDiv.appendChild(toggleButton);
    vacancyDiv.appendChild(linkButton);
    vacancyDiv.appendChild(summary);

    // Append the vacancy div to the results container
    jobsContainer.appendChild(vacancyDiv);
  });
}

// Debounce function to limit API calls
function debounce(func, delay) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
}

// Event listener for the search input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    debounce(async () => {
      const vacancies = await fetchJobVacancies(query);
      renderJobVacancies(vacancies);
    }, 500); // 500ms delay
  } else {
    jobsContainer.innerHTML = "<p>Please enter at least 3 characters to search.</p>";
  }
});
