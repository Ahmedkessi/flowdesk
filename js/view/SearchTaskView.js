import View from "./view.js";
class SearchTaskView extends View {
  _search = document.querySelector(".search-task");
  mainPage = document.querySelector(".main-page-2");
  _form = document.querySelector(".search-form");
  _input = document.querySelector(".search-task");
  data;
  history;
  _historyList = document.querySelector(".search-list");
  hidenTitle = document.querySelector(".page-title-2");
  currentTask;
  _key = [];
  _acceptedKeys = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "_",
    "-",
  ];

  constructor() {
    super();
    setTimeout(() => {
      const historyNames = [...this.history.map(el=> el.name)];
      this._historyList.innerHTML = "";
      
      historyNames.forEach((name) => {
        const html = `<p class="history-item"><span>${name}</span> <span class="times ${name}">&times;</span> </p>`;
        this._historyList.insertAdjacentHTML("beforeend", html);
      });
      const del = document.querySelectorAll(`.times`);
console.log(this._historyList)


      del.forEach(btn => {
      btn.addEventListener("click", (e)=> { 

        console.log(e.target.classList[1])
        console.log(e.target.className.split(` `).at(1))
  
        if(1 === 1){

          const name = e.target.className.split(` `).at(1)
          const i = historyNames.findIndex(nam => nam === name);
          historyNames.splice(i, 1)
          
          this._historyList.innerHTML = "";

          historyNames.forEach((name) => {
          const html = `<p class="history-item"><span>${name}</span> <span class="times ${name}">&times;</span> </p>`;
          this._historyList.insertAdjacentHTML("beforeend", html);
        });
  
      };
      })
        
      })
      
    }, 1000);
  }

  search(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = this._input.value.toLowerCase();
      this.currentTask = data;
      handler(data);


      if (!this.data) return;
      if (!this.history) return;

      this._historyList.innerHTML = "";
      this.history.forEach((el) => {
        const html = `<p class="history-item"><span>${el.name}</span> <span class="times ${el.name}">&times;</span> </p>`;
        this._historyList.insertAdjacentHTML("beforeend", html);
      });
      this._input.value = "";
      this.showTaskData();
    });
  }

  clickItem(handler) {
    this._historyList.addEventListener("click", (e) => {
      if(e.target.classList[0] === `time`) {
        const historyNames = [...this.history.map(el=> el.name)];

          const name = e.target.classList[1]
          const i = historyNames.findIndex(nam => nam === name);
          historyNames.splice(i, 1)
          console.log(historyNames)
          this._historyList.innerHTML = "";

          historyNames.forEach((name) => {
          const html = `<p class="history-item"><span>${name}</span> <span class="times ${name}">&times;</span> </p>`;
          this._historyList.insertAdjacentHTML("beforeend", html);
        });
      }

      console.log(e)
      if(e.target.className === "history-item"){
        this.clickElement(e, handler)
      }
        
    });
  }

  clickElement(e, handler) {
  this.hidenTitle.innerHTML = "";

  const children = e.target.children;
  console.log(e)

  if(children.length === 0) return;
  const currTask = children[1].className.split(` `).at(1);

  this.currentTask = currTask.toLowerCase();
  handler(this.currentTask);
  this.showTaskData();
  }

  showTaskData() {
    if (this.data) {
      this.renderTaskData(this.data[0]);
      const html = `
        <p class="page__heading caller call-2">Task (${this.currentTask})</p>
        `;

      const classList = [...document.querySelector(".caller-page-2").classList];

      const call = classList.find((call) => call === "call");
      // const dec = classList.find(dec => dec === 'decline');

      if (!call) {
        document.querySelector(".caller-page-2").classList.add("call");
        document.querySelector(".caller-page-2").classList.remove("decline");
      }

      if (call) {
        document.querySelector(".caller-page-2").classList.remove("call");
        document.querySelector(".caller-page-2").classList.add("decline");
      }

      this.hidenTitle.innerHTML = "";
      this.hidenTitle.insertAdjacentHTML("afterbegin", html);
    }
  }
}

export default new SearchTaskView();
