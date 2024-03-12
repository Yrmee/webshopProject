
// variablen
let openSideMenu = document.querySelector('#menu-icon');
let navSideBar = document.querySelector('.navlist');

// function: Open Navbar Menu when clicking the menu-icon
openSideMenu.onclick = () => {
    openSideMenu.classList.toggle('bx-x');
    navSideBar.classList.toggle('open');
}

// function: Close navSideBar when scrolling page
window.onscroll = () => {
    openSideMenu.classList.remove('bx-x');
    navSideBar.classList.remove('open');
}



// Filter the Collection JS
document.addEventListener('DOMContentLoaded', () => {
    const filterTabs = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const items = document.querySelectorAll('.n-content .row');
    // Function to handle filtering logic
    function filterItems(filterValue) {
        items.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block'; // Show item
            } else {
                item.style.display = 'none'; // Hide item
            }
        });
    }

    // Function to sort items by price (high-to-low or low-to-high)
    function sortItemsByPrice(sortValue) {
        const sortedItems = Array.from(items).sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.row-right h6').textContent.replace('€', '').trim());
            const priceB = parseFloat(b.querySelector('.row-right h6').textContent.replace('€', '').trim());
    
            if (sortValue === 'high-to-low') {
                return priceB - priceA;
            } else {
                return priceA - priceB;
            }
        });
    
        const grid = document.querySelector('.n-content');
        grid.innerHTML = ''; // Clear existing items
        sortedItems.forEach(item => grid.appendChild(item));
    }

    // Function to sort items alphabetically by title (A to Z)
    function sortItemsAlphabetically() {
        const sortedItems = Array.from(items).sort((a, b) => {
            const titleA = a.querySelector('.row h3').textContent.toLowerCase();
            const titleB = b.querySelector('.row h3').textContent.toLowerCase();
            return titleA.localeCompare(titleB);
        });
    
        const grid = document.querySelector('.n-content');
        grid.innerHTML = ''; // Clear existing items
        sortedItems.forEach(item => grid.appendChild(item));
    }

    // Function to sort items alphabetically by title (Z to A)
    function sortItemsReverseAlphabetically() {
        const sortedItems = Array.from(items).sort((a, b) => {
            const titleA = a.querySelector('.row h3').textContent.toLowerCase();
            const titleB = b.querySelector('.row h3').textContent.toLowerCase();
            return titleB.localeCompare(titleA);
        });
    
        const grid = document.querySelector('.n-content');
        grid.innerHTML = ''; // Clear existing items
        sortedItems.forEach(item => grid.appendChild(item));
    }
  
    // Event listeners for tabs/buttons
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove 'active' class from all buttons and add to the clicked one
            filterTabs.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
  
            // Filter items based on the clicked button's data-filter attribute
            const filterValue = this.getAttribute('data-filter');
            filterItems(filterValue);
        });
    });
  
    // Initialize page with the 'active' filter applied
    // Find the button with the 'active' class and filter items accordingly
    const activeTab = document.querySelector('.filter-btn.active');
    if (activeTab) {
        const initialFilter = activeTab.getAttribute('data-filter');
        filterItems(initialFilter);
    } else {
        // If no button has the 'active' class, default to showing all items
        filterItems('all');
    }

    // Event listener for sorting dropdown
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
    
        if (sortValue === 'high-to-low' || sortValue === 'low-to-high') {
            sortItemsByPrice(sortValue);
        } else if (sortValue === 'alphabetical') {
            sortItemsAlphabetically();
        } else if (sortValue === 'reverse-alphabetical') {
            sortItemsReverseAlphabetically();
        } else if (sortValue === 'sort-reset') {
            resetFilters(); 
        }
    });

    // funtion to reset filters and sorting
    // Function to reset filters and sorting
    function resetFilters() {
    // Reset filter buttons
    filterTabs.forEach(tab => tab.classList.remove('active'));
    // Set the 'all' filter as active
    const allTab = document.querySelector('.filter-btn[data-filter="all"]');
    allTab.classList.add('active');
    // Apply 'all' filter
    filterItems('all');
    // Reset sorting dropdown
    sortSelect.selectedIndex = 0; // Select the first option (default sorting)
    }
    
});
