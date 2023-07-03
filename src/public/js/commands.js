var suggestions = ['help', 'skills', 'clear', 'projects'];

window.addEventListener('DOMContentLoaded', function () {
  var cmdInput = document.getElementById('cmd');
  cmdInput.focus();
  var outputDiv = document.getElementById('output');
  var mainInfoDiv = document.getElementById('mainInfo');
  var terminalDiv = document.getElementById('terminal');

  cmdInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      var cmd = cmdInput.value.trim();
      if (cmd === '') {
        return;
      }

      outputDiv.innerHTML +=
        "<div><span class='ownerTerminal'><b>zachey@profile</b></span>:<b>~$</b> " +
        cmd +
        '</div>';

      cmdInput.value = '';

      if (cmd === 'skills' || cmd === 's') {
        outputDiv.innerHTML += `
  <div class="container">
    <div class="flex">
      <h2>HTML/EJS:</h2>
      <div class="skillBar">
        <div class="skillBarItem1"></div>
      </div>
      <h3>100%</h3>
    </div>
  
    <div class="flex">
      <h2>CSS/SCSS:</h2>
      <div class="skillBar">
        <div class="skillBarItem2"></div>
      </div>
      <h3>100%</h3>
    </div>
  
    <div class="flex">
      <h2>JS:</h2>
      <div class="skillBar">
        <div class="skillBarItem3"></div>
      </div>
      <h3>95%</h3>
    </div>
  
    <div class="flex">
      <h2>TS:</h2>
      <div class="skillBar">
        <div class="skillBarItem4"></div>
      </div>
      <h3>55%</h3>
    </div>
  
    <div class="flex">
      <h2>NODE.JS:</h2>
      <div class="skillBar">
        <div class="skillBarItem5"></div>
      </div>
      <h3>85%</h3>
    </div>
  
    <div class="flex">
      <h2>REACT.JS:</h2>
      <div class="skillBar">
        <div class="skillBarItem6"></div>
      </div>
      <h3>15%</h3>
    </div>
  
    <div class="flex">
      <h2>GO:</h2>
      <div class="skillBar">
        <div class="skillBarItem7"></div>
      </div>
      <h3>5%</h3>
    </div>
  
    <div class="flex">
    <h2>RUST:</h2>
    <div class="skillBar">
      <div class="skillBarItem8"></div>
    </div>
    <h3>5%</h3>
  </div>
  </div>`;
      }
      // Links
      else if (cmd === 'github' || cmd === 'gh') {
        window.location.href = 'https://github.com/zachey01';
      } else if (cmd === 'discord' || cmd === 'ds') {
        window.location.href = 'https://discord.com/users/1033246411363471472';
      } else if (cmd === 'telegram' || cmd === 'tg') {
        window.location.href = 'https://t.me/ImZachey';
      } else if (cmd === 'email' || cmd === 'em') {
        window.location.href = 'mailto:zachey@bk.ru';
      } else if (cmd === 'steam' || cmd === 'st') {
        window.location.href = 'https://steamcommunity.com/id/zachey01';
      } else if (cmd === 'spotify' || cmd === 'sp') {
        window.location.href = 'https://steamcommunity.com/id/zachey01';
      } else if (cmd === 'youtube' || cmd === 'yt') {
        window.location.href = 'https://www.youtube.com/@zachey01';
      }

      // Pages
      else if (cmd === 'projects' || cmd === 'pj') {
        window.location.href = '/projects';
      } else if (cmd === 'blog') {
        window.location.href = '/blog';
      }

      // Other
      else if (cmd === 'help') {
        outputDiv.innerHTML += `<br>Available commands: <br />[<span class="commandName">skills</span>] or
        [<span class="commandName">s</span>] <br />[<span class="commandName"
          >projects</span
        >] or [<span class="commandName">pj</span>] <br /><br />[<span
          class="commandName"
          >clear</span
        >] <br /><br />Contact me: <br />[<span class="commandName">github</span>]
        <br />[<span class="commandName">discord</span>] <br />[<span
          class="commandName"
          >telegram</span
        >] <br />[<span class="commandName">email</span>] <br />[<span
          class="commandName"
          >steam</span
        >] <br />[<span class="commandName">youtube</span>]`;
      }

      // Clear terminal
      else if (cmd === 'clear' || cmd === 'c') {
        outputDiv.innerHTML = ''; // Удаление содержимого при вводе команды "clear"
        mainInfoDiv.innerHTML = '';
      } else {
        outputDiv.innerHTML += '<div>Not found</div>';
      }

      outputDiv.scrollTop = outputDiv.scrollHeight;
    }
  });
});
