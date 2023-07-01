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

window.addEventListener('DOMContentLoaded', function () {
  var cmdInput = document.getElementById('cmd');
  cmdInput.focus();
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `<div>
  <pre>
  ███████╗░█████╗░░█████╗░██╗░░██╗███████╗██╗░░░██╗
  ╚════██║██╔══██╗██╔══██╗██║░░██║██╔════╝╚██╗░██╔╝
  ░░███╔═╝███████║██║░░╚═╝███████║█████╗░░░╚████╔╝░
  ██╔══╝░░██╔══██║██║░░██╗██╔══██║██╔══╝░░░░╚██╔╝░░
  ███████╗██║░░██║╚█████╔╝██║░░██║███████╗░░░██║░░░
  ╚══════╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝░░░╚═╝░░░
  </pre>
  jj
  </div>`;
  var terminalDiv = document.getElementById('terminal');

  cmdInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      var cmd = cmdInput.value.trim();
      if (cmd === '') {
        return;
      }

      outputDiv.innerHTML +=
        "<div><span class='ownerTerminal'>zachey@profile</span>:~$ " +
        cmd +
        '</div>';

      cmdInput.value = '';

      if (cmd === 'help') {
        outputDiv.innerHTML +=
          "<div>Available commands: <br>[<span class='commandName'>about</span>]<br>[<span class='commandName'>links</span>]<br><br>[<span class='commandName'>clear</span>]</div>";
      } else if (cmd === 'about') {
        outputDiv.innerHTML += '<div>About: <br> h</div>';
      } else if (cmd === 'hack') {
        var matrixElement = document.getElementById('hackcss');
        matrixElement.style.display = 'block';
      } else if (cmd === 'command3') {
        outputDiv.innerHTML += '<div>Вы выполнили command3</div>';
      } else if (cmd === 'view text.txt') {
        outputDiv.innerHTML += '<div>Содержимое файла text.txt</div>';
      } else if (cmd === 'settings new-theme') {
        terminalDiv.style.background = 'none';
        // Здесь можно добавить код для просмотра содержимого файла text.txt
      } else if (cmd === 'clear') {
        outputDiv.innerHTML = ''; // Удаление содержимого при вводе команды "clear"
      } else {
        outputDiv.innerHTML += '<div>Not found</div>';
      }

      outputDiv.scrollTop = outputDiv.scrollHeight;
    }
  });
});
