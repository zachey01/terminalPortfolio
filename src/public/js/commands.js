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
      } else if (cmd === 'clear' || cmd === 'c') {
        outputDiv.innerHTML = ''; // Удаление содержимого при вводе команды "clear"
        mainInfoDiv.innerHTML = '';
      } else {
        outputDiv.innerHTML += '<div>Not found</div>';
      }

      outputDiv.scrollTop = outputDiv.scrollHeight;
    }
  });
});
