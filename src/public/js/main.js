let currentSuggestionIndex = -1;

function showSuggestions() {
  let cmdInput = document.getElementById('cmd');
  let input = cmdInput.value.trim();
  let suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';

  if (input === '') {
    cmdInput.classList.remove('command-entered');
    return;
  }

  let filteredSuggestions = suggestions.filter(function (suggestion) {
    return suggestion.startsWith(input);
  });

  filteredSuggestions.forEach(function (suggestion, index) {
    let suggestionDiv = document.createElement('div');
    suggestionDiv.textContent = suggestion;
    suggestionDiv.addEventListener('click', function () {
      cmdInput.value = suggestion;
      suggestionsDiv.innerHTML = '';
    });

    suggestionsDiv.appendChild(suggestionDiv);
  });

  if (filteredSuggestions.length > 0) {
    cmdInput.classList.add('command-entered');
  } else {
    cmdInput.classList.remove('command-entered');
  }
}

function handleKeyDown(event) {
  let suggestionsDiv = document.getElementById('suggestions');
  let suggestionDivs = suggestionsDiv.getElementsByTagName('div');

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (currentSuggestionIndex > 0) {
      currentSuggestionIndex--;
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (currentSuggestionIndex < suggestionDivs.length - 1) {
      currentSuggestionIndex++;
    }
  } else if (event.key === 'Enter') {
    let cmdInput = document.getElementById('cmd');
    let selectedSuggestion = suggestionDivs[currentSuggestionIndex];
    if (selectedSuggestion) {
      cmdInput.value = selectedSuggestion.textContent;
    }
    suggestionsDiv.innerHTML = '';
    cmdInput.classList.remove('command-entered');
  }

  for (let i = 0; i < suggestionDivs.length; i++) {
    let suggestionDiv = suggestionDivs[i];
    if (i === currentSuggestionIndex) {
      suggestionDiv.classList.add('selected');
    } else {
      suggestionDiv.classList.remove('selected');
    }
  }
}
