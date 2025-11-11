// Cultural Safety in Schools - Search Functionality

let allResources = [];
let filteredResources = [];
let currentPage = 1;
const resultsPerPage = 12;

document.addEventListener('DOMContentLoaded', async function() {
    // Load resources from JSON
    await loadResources();

    // Set up event listeners
    setupSearchListeners();

    // Check for URL parameters
    applyUrlFilters();

    // Initial display
    filterAndDisplay();
});

// Load resources from JSON file
async function loadResources() {
    try {
        const response = await fetch('data/resources.json');
        if (!response.ok) {
            throw new Error('Failed to load resources');
        }
        allResources = await response.json();
        filteredResources = [...allResources];
    } catch (error) {
        console.error('Error loading resources:', error);
        document.getElementById('results-count').textContent = 'Error loading resources. Please refresh the page.';
    }
}

// Set up event listeners for search and filters
function setupSearchListeners() {
    // Keyword search
    const keywordSearch = document.getElementById('keyword-search');
    keywordSearch.addEventListener('input', debounce(filterAndDisplay, 300));

    // Audience filters
    const audienceCheckboxes = document.querySelectorAll('input[name="audience"]');
    audienceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterAndDisplay);
    });

    // Topics filters
    const topicsCheckboxes = document.querySelectorAll('input[name="topics"]');
    topicsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterAndDisplay);
    });

    // Format filters
    const formatCheckboxes = document.querySelectorAll('input[name="format"]');
    formatCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterAndDisplay);
    });

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', filterAndDisplay);

    // Clear filters button
    const clearButton = document.getElementById('clear-filters');
    clearButton.addEventListener('click', clearAllFilters);
}

// Apply filters from URL parameters
function applyUrlFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for audience parameter
    const audience = urlParams.get('audience');
    if (audience) {
        const checkbox = document.querySelector(`input[name="audience"][value="${audience}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    }
}

// Filter and display resources
function filterAndDisplay() {
    // Reset to page 1 when filters change
    currentPage = 1;

    // Get filter values
    const keyword = document.getElementById('keyword-search').value.toLowerCase();
    const selectedAudiences = getSelectedValues('audience');
    const selectedTopics = getSelectedValues('topics');
    const selectedFormats = getSelectedValues('format');
    const sortBy = document.getElementById('sort-select').value;

    // Filter resources
    filteredResources = allResources.filter(resource => {
        // Keyword search (weighted scoring)
        if (keyword) {
            const titleMatch = resource.title.toLowerCase().includes(keyword);
            const summaryMatch = resource.summary.toLowerCase().includes(keyword);
            const publisherMatch = resource.publisher.toLowerCase().includes(keyword);
            const topicsMatch = resource.topics.some(topic => topic.toLowerCase().includes(keyword));
            
            if (!titleMatch && !summaryMatch && !publisherMatch && !topicsMatch) {
                return false;
            }
        }

        // Audience filter
        if (selectedAudiences.length > 0) {
            const hasMatchingAudience = resource.audience.some(aud => 
                selectedAudiences.includes(aud)
            );
            if (!hasMatchingAudience) return false;
        }

        // Topics filter
        if (selectedTopics.length > 0) {
            const hasMatchingTopic = resource.topics.some(topic => 
                selectedTopics.includes(topic)
            );
            if (!hasMatchingTopic) return false;
        }

        // Format filter
        if (selectedFormats.length > 0) {
            if (!selectedFormats.includes(resource.format)) return false;
        }

        return true;
    });

    // Calculate relevance scores for keyword search
    if (keyword) {
        filteredResources.forEach(resource => {
            let score = 0;
            const titleMatch = resource.title.toLowerCase().includes(keyword);
            const summaryMatch = resource.summary.toLowerCase().includes(keyword);
            const publisherMatch = resource.publisher.toLowerCase().includes(keyword);
            
            if (titleMatch) score += 3;
            if (summaryMatch) score += 2;
            if (publisherMatch) score += 1;
            
            resource.relevanceScore = score;
        });
    }

    // Sort resources
    sortResources(sortBy);

    // Display results
    displayResults();
    updateResultsCount();
    renderPagination();
}

// Get selected checkbox values
function getSelectedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Sort resources
function sortResources(sortBy) {
    switch(sortBy) {
        case 'relevance':
            if (document.getElementById('keyword-search').value) {
                filteredResources.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
            }
            break;
        case 'newest':
            filteredResources.sort((a, b) => b.year - a.year);
            break;
        case 'az':
            filteredResources.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
}

// Display results
function displayResults() {
    const container = document.getElementById('results-container');
    const noResults = document.getElementById('no-results');
    
    if (filteredResources.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    // Calculate pagination
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const pageResources = filteredResources.slice(startIndex, endIndex);

    // Generate HTML
    const html = pageResources.map(resource => `
        <div class="resource-card">
            <div class="card-header">
                <h4>${escapeHtml(resource.title)}</h4>
                <span class="badge">${escapeHtml(resource.format)}</span>
            </div>
            <p class="summary">${escapeHtml(resource.summary)}</p>
            <div class="meta">
                <span class="publisher">${escapeHtml(resource.publisher)}</span>
                <span class="year">${resource.year}</span>
            </div>
            <div class="tags">
                ${resource.topics.map(topic => `<span class="tag">${escapeHtml(topic)}</span>`).join('')}
            </div>
            <a href="${escapeHtml(resource.url)}" class="btn-secondary" target="_blank" rel="noopener noreferrer">View Resource</a>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Update results count
function updateResultsCount() {
    const count = document.getElementById('results-count');
    const total = filteredResources.length;
    
    if (total === 0) {
        count.textContent = 'No resources found';
    } else if (total === 1) {
        count.textContent = '1 resource found';
    } else {
        const startIndex = (currentPage - 1) * resultsPerPage + 1;
        const endIndex = Math.min(currentPage * resultsPerPage, total);
        count.textContent = `Showing ${startIndex}-${endIndex} of ${total} resources`;
    }
}

// Render pagination
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredResources.length / resultsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let html = '';

    // Previous button
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Previous</button>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<span>...</span>';
        }
    }

    // Next button
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button>`;

    paginationContainer.innerHTML = html;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredResources.length / resultsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayResults();
    updateResultsCount();
    renderPagination();
    
    // Scroll to top of results
    document.querySelector('.results-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Clear all filters
function clearAllFilters() {
    // Clear keyword search
    document.getElementById('keyword-search').value = '';

    // Uncheck all checkboxes
    const allCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset sort
    document.getElementById('sort-select').value = 'relevance';

    // Refilter
    filterAndDisplay();
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
