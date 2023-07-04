let suggestions = [
  'help',
  'skills',
  'clear',
  'projects',
  'blog',
  'tools',
  // Links
  'github',
  'telegram',
  'discord',
  'email',
  'steam',
  'youtube',
];

// Commands
let helpCmd = `
  <br>Available commands: <br />
  [<span class="commandName">skills</span>] or [<span class="commandName">s</span>]
  <br />
  [<span class="commandName">projects</span>] or [<span class="commandName">pj</span>]
  <br />
  [<span class="commandName">blog</span>]
  <br /><br />
  [<span class="commandName">clear</span>]
  <br /><br />
  Contact me: <br />
  [<span class="commandName">github</span>]
  <br />
  [<span class="commandName">discord</span>]
  <br />
  [<span class="commandName">telegram</span>]
  <br />
  [<span class="commandName">email</span>]
  <br />
  [<span class="commandName">steam</span>]
  <br />
  [<span class="commandName">youtube</span>]`;

let skillsBar = `
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

let projectCmd = `
<div class="projectsDiv">
<article
  class="article-wrapper"
  onclick="linkHref('https://github.com/zachey01/MimiCMS/')"
>
  <div class="project-info">
    <div class="flex-pr">
      <div class="project-title text-nowrap">MimiCMS</div>
    </div>
    <div class="flex-pr">
      <p class="project-description">
        Modular, fast CMS for <code>CS:GO</code>, <code>CS2</code> (coming soon)
        servers.
      </p>
    </div>
  </div>
</article>

<article
  class="article-wrapper"
  onclick="linkHref('https://github.com/zachey01/terminalPortfolio')"
>
  <div class="project-info">
    <div class="flex-pr">
      <div class="project-title text-nowrap">terminal<br />Portfolio</div>
    </div>
    <div class="flex-pr">
      <p class="project-description">
        A personal website styled for UNIX terminal.
      </p>
    </div>
  </div>
</article>

</div>
`;

let blogCmd = `
<div class="blogArticle" id="blogArticles">

</div>
`;
