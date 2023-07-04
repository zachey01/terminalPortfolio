window.addEventListener('DOMContentLoaded', function () {
  // Get references to HTML elements
  let cmdInput = document.getElementById('cmd');
  cmdInput.focus();
  let helpCmdListDiv = document.getElementById('helpCmdList');
  helpCmdListDiv.innerHTML = helpCmd;
  let outputDiv = document.getElementById('output');
  let mainInfoDiv = document.getElementById('mainInfo');
  let terminalDiv = document.getElementById('terminal');

  cmdInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      // Check if Enter key is pressed
      let cmd = cmdInput.value.trim(); // Get the command entered by the user and remove leading/trailing whitespace

      if (cmd === '') {
        return; // If the command is empty, do nothing
      }

      outputDiv.innerHTML +=
        "<div><span class='ownerTerminal'><b>zachey@profile</b></span>:<b>~$</b> " +
        cmd +
        '</div>'; // Display the entered command in the output div

      cmdInput.value = ''; // Clear the command input field

      // Check the entered command and take appropriate actions

      if (cmd === 'skills' || cmd === 's') {
        // Display the skills information in the output div
        outputDiv.innerHTML += skillsBar;
      }
      // Links
      else if (cmd === 'github' || cmd === 'gh') {
        window.location.href = 'https://github.com/zachey01'; // Redirect to GitHub profile
      } else if (cmd === 'discord' || cmd === 'ds') {
        window.location.href = 'https://discord.com/users/1033246411363471472'; // Redirect to Discord profile
      } else if (cmd === 'telegram' || cmd === 'tg') {
        window.location.href = 'https://t.me/ImZachey'; // Redirect to Telegram profile
      } else if (cmd === 'email' || cmd === 'em') {
        window.location.href = 'mailto:zachey@bk.ru'; // Open default email client with pre-filled email address
      } else if (cmd === 'steam' || cmd === 'st') {
        window.location.href = 'https://steamcommunity.com/id/zachey01'; // Redirect to Steam profile
      } else if (cmd === 'youtube' || cmd === 'yt') {
        window.location.href = 'https://www.youtube.com/@zachey01'; // Redirect to YouTube channel
      }

      // Pages
      else if (cmd === 'projects' || cmd === 'pj') {
        window.location.href = '/projects'; // Redirect to projects page
      } else if (cmd === 'blog') {
        window.location.href = '/blog'; // Redirect to blog page
      }

      // Other
      else if (cmd === 'help') {
        // Display available commands and contact information
        outputDiv.innerHTML += helpCmd;
      }

      // Clear terminal
      else if (cmd === 'clear' || cmd === 'c') {
        outputDiv.innerHTML = ''; // Clear the output div
        mainInfoDiv.innerHTML = ''; // Clear the main info div
      } else {
        outputDiv.innerHTML += '<div>Not found</div>'; // Display "Not found" message if the command is not recognized
      }

      outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to the bottom of the output div
    }
  });
});
