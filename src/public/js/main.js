let currentSuggestionIndex = -1; // Variable to keep track of the currently selected suggestion index

function showSuggestions() {
  let cmdInput = document.getElementById('cmd'); // Get the input element with the id 'cmd'
  let input = cmdInput.value.trim(); // Get the trimmed value of the input
  let suggestionsDiv = document.getElementById('suggestions'); // Get the suggestions div element
  suggestionsDiv.innerHTML = ''; // Clear the suggestions div

  if (input === '') {
    cmdInput.classList.remove('command-entered'); // Remove the 'command-entered' class from the input
    return;
  }

  let filteredSuggestions = suggestions.filter(function (suggestion) {
    return suggestion.startsWith(input); // Filter the suggestions array to find suggestions that start with the input value
  });

  filteredSuggestions.forEach(function (suggestion, index) {
    let suggestionDiv = document.createElement('div'); // Create a new div element for each suggestion
    suggestionDiv.textContent = suggestion; // Set the text content of the div to the suggestion
    suggestionDiv.addEventListener('click', function () {
      cmdInput.value = suggestion; // Set the input value to the clicked suggestion
      suggestionsDiv.innerHTML = ''; // Clear the suggestions div
    });

    suggestionsDiv.appendChild(suggestionDiv); // Append the suggestion div to the suggestions div
  });

  if (filteredSuggestions.length > 0) {
    cmdInput.classList.add('command-entered'); // Add the 'command-entered' class to the input if there are filtered suggestions
  } else {
    cmdInput.classList.remove('command-entered'); // Remove the 'command-entered' class from the input if there are no filtered suggestions
  }
}

function handleKeyDown(event) {
  let suggestionsDiv = document.getElementById('suggestions'); // Get the suggestions div element
  let suggestionDivs = suggestionsDiv.getElementsByTagName('div'); // Get all the suggestion divs

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (currentSuggestionIndex > 0) {
      currentSuggestionIndex--; // Decrease the current suggestion index when the up arrow key is pressed
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (currentSuggestionIndex < suggestionDivs.length - 1) {
      currentSuggestionIndex++; // Increase the current suggestion index when the down arrow key is pressed
    }
  } else if (event.key === 'Enter') {
    let cmdInput = document.getElementById('cmd'); // Get the input element with the id 'cmd'
    let selectedSuggestion = suggestionDivs[currentSuggestionIndex]; // Get the currently selected suggestion div
    if (selectedSuggestion) {
      cmdInput.value = selectedSuggestion.textContent; // Set the input value to the text content of the selected suggestion
    }
    suggestionsDiv.innerHTML = ''; // Clear the suggestions div
    cmdInput.classList.remove('command-entered'); // Remove the 'command-entered' class from the input
  }

  for (let i = 0; i < suggestionDivs.length; i++) {
    let suggestionDiv = suggestionDivs[i];
    if (i === currentSuggestionIndex) {
      suggestionDiv.classList.add('selected'); // Add the 'selected' class to the currently selected suggestion div
    } else {
      suggestionDiv.classList.remove('selected'); // Remove the 'selected' class from other suggestion divs
    }
  }
}

function linkHref(href) {
  window.location.href = href; // Redirect the page to the specified href
}
