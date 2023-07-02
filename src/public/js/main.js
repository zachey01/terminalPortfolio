var suggestions = ['help', 'about', 'links', 'hack', 'clear'];
var currentSuggestionIndex = -1;

function showSuggestions() {
  var cmdInput = document.getElementById('cmd');
  var input = cmdInput.value.trim();
  var suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';

  if (input === '') {
    return;
  }

  var filteredSuggestions = suggestions.filter(function (suggestion) {
    return suggestion.startsWith(input);
  });

  filteredSuggestions.forEach(function (suggestion, index) {
    var suggestionDiv = document.createElement('div');
    suggestionDiv.textContent = suggestion;
    suggestionDiv.addEventListener('click', function () {
      cmdInput.value = suggestion;
      suggestionsDiv.innerHTML = '';
    });
    suggestionsDiv.appendChild(suggestionDiv);

    if (index === currentSuggestionIndex) {
      suggestionDiv.classList.add('selected');
    }
  });
}

function handleKeyDown(event) {
  var suggestionsDiv = document.getElementById('suggestions');
  var suggestionDivs = suggestionsDiv.getElementsByTagName('div');

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
    var cmdInput = document.getElementById('cmd');
    var selectedSuggestion = suggestionDivs[currentSuggestionIndex];
    if (selectedSuggestion) {
      cmdInput.value = selectedSuggestion.textContent;
    }
    suggestionsDiv.innerHTML = '';
  }

  for (var i = 0; i < suggestionDivs.length; i++) {
    var suggestionDiv = suggestionDivs[i];
    if (i === currentSuggestionIndex) {
      suggestionDiv.classList.add('selected');
    } else {
      suggestionDiv.classList.remove('selected');
    }
  }
}
