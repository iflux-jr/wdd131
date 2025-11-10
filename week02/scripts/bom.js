// Declare variables that hold references to the input, button, and list elements
const input = document.getElementById('chapter');
const button = document.getElementById('add');
const list = document.getElementById('list');

// Function to update chapter count display
function updateChapterCount() {
    const count = list.children.length;
    const title = document.querySelector('h1');
    
    // Update or create count display
    let countDisplay = document.getElementById('chapter-count');
    if (!countDisplay) {
        countDisplay = document.createElement('span');
        countDisplay.id = 'chapter-count';
        countDisplay.style.cssText = 'font-size: 1rem; color: #666; margin-left: 10px;';
        title.appendChild(countDisplay);
    }
    countDisplay.textContent = `(${count} chapters)`;
}

// Function to add a chapter
function addChapter() {
    const chapterName = input.value.trim();
    
    // Check to make sure the input is not blank
    if (chapterName === '') {
        // Provide visual feedback for empty input
        input.style.borderColor = '#e74c3c';
        setTimeout(() => {
            input.style.borderColor = '#ddd';
        }, 1000);
        return;
    }
    
    // Check for duplicates
    const existingChapters = Array.from(list.children).map(li => 
        li.textContent.replace('❌', '').trim()
    );
    if (existingChapters.includes(chapterName)) {
        alert('This chapter is already in your list!');
        input.focus();
        return;
    }
    
    // Create li element
    const listItem = document.createElement('li');
    
    // Create span for chapter text (for better styling)
    const chapterText = document.createElement('span');
    chapterText.textContent = chapterName;
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${chapterName}`);
    deleteButton.classList.add('delete');
    deleteButton.title = 'Remove chapter'; // Additional accessibility
    
    // Append elements to list item
    listItem.appendChild(chapterText);
    listItem.appendChild(deleteButton);
    
    // Add animation for new items
    listItem.style.opacity = '0';
    list.appendChild(listItem);
    
    // Animate the new item
    setTimeout(() => {
        listItem.style.transition = 'opacity 0.3s ease';
        listItem.style.opacity = '1';
    }, 10);
    
    // Change the input value to nothing and refocus
    input.value = '';
    input.focus();
    
    // Update chapter count
    updateChapterCount();
    
    // Save to localStorage
    saveChapters();
}

// Function to save chapters to localStorage
function saveChapters() {
    const chapters = Array.from(list.children).map(li => 
        li.textContent.replace('❌', '').trim()
    );
    localStorage.setItem('bomChapters', JSON.stringify(chapters));
}

// Function to load chapters from localStorage
function loadChapters() {
    const savedChapters = localStorage.getItem('bomChapters');
    if (savedChapters) {
        const chapters = JSON.parse(savedChapters);
        chapters.forEach(chapter => {
            input.value = chapter;
            addChapter();
        });
    }
    updateChapterCount();
}

// Create a click event listener for the Add Chapter button
button.addEventListener('click', addChapter);

// Add event listener to the list for delete button clicks (Event Delegation)
list.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const listItem = e.target.parentElement;
        
        // Add removal animation
        listItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            list.removeChild(listItem);
            updateChapterCount();
            saveChapters();
        }, 300);
    }
});

// Allow adding chapters by pressing Enter key
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addChapter();
    }
});

// Add input validation for better UX
input.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        this.style.borderColor = '#27ae60';
    } else {
        this.style.borderColor = '#ddd';
    }
});

// Clear input on escape key
input.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        this.value = '';
        this.focus();
    }
});

// Load saved chapters when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadChapters();
    
    // Add some sample chapters if empty
    if (list.children.length === 0) {
        const sampleChapters = ['1 Nephi 3', '2 Nephi 2'];
        sampleChapters.forEach(chapter => {
            input.value = chapter;
            addChapter();
        });
    }
});