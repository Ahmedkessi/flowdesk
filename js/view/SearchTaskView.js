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
      this._historyList.innerHTML = "";
      this.history.forEach((el) => {
        const html = `<p class="history-item">${el.name}</p>`;
        this._historyList.insertAdjacentHTML("beforeend", html);
      });
    }, 1000);
  }

  search(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = this._input.value.toLowerCase();
      this.currentTask = data;
      handler(data);

      // const key = e.key.toLowerCase()
      // const smallLetter = this._acceptedKeys.map(word => word.toLowerCase())
      // const availableKey = smallLetter.filter(text => text === key)
      // if (availableKey.length === 0) return;

      // this._key.push(key);
      // const smallKey = this._key;
      // const sentece = smallKey.join("")
      // console.log(this._input)
      // console.log(sentece)
      // handler(sentece);

      if (!this.data) return;
      if (!this.history) return;

      this._historyList.innerHTML = "";
      this.history.forEach((el) => {
        const html = `<p class="history-item">${el.name}</p>`;
        this._historyList.insertAdjacentHTML("beforeend", html);
      });
      this._input.value = "";
      this.showTaskData();
    });
  }

  clickItem(handler) {
    this._historyList.addEventListener("click", (e) => {
      this.hidenTitle.innerHTML = "";

      const currTask = e.target.closest(".history-item");
      this.currentTask = currTask.innerHTML.toLowerCase();
      handler(this.currentTask);
      this.showTaskData();
    });
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
