import View from './view.js';
class SearchTaskView extends View {
  _search = document.querySelector('.search-task');
  mainPage = document.querySelector('.main-page-2');
  _form = document.querySelector('.search-form')
  _input = document.querySelector(".search-task")
  data;
  history;
  _historyList = document.querySelector('.search-list');
  hidenTitle = document.querySelector(".page-title-2");
  currentTask;
  taskData;


  search(handler) {
  this._form.addEventListener('submit',  (e)=> {
    e.preventDefault();
    const data = this._input.value;
    handler(data);
    if (!this.data) return;
    const task = this.data[0];
    if (!this.history) return;

    console.log(this.history)
    this._historyList.innerHTML = '';
    this.history.forEach(el => {
      const html = `<p class="history-item caller call-1">${el[0].name}</p>`;

      this._historyList.insertAdjacentHTML("beforeend", html);
    });
    this._input.value = '';
  })
}

  clickItem(handler, caller) {
    this._historyList.addEventListener('click', (e) => {
      this.hidenTitle.innerHTML = "";

      const currTask = e.target.closest('.history-item');
      this.currentTask = currTask.innerHTML;
      handler()
      console.log(this.currentTask)

      if (this.taskData) {
        this.renderTaskData(this.taskData, caller)
        console.log(this.taskData)
              const html = `
      <p class="page__heading">Task (${this.currentTask})</p>
      `
      document.querySelector('.caller-page-2').classList.add('call')
      console.log(this._historyList)
      this.hidenTitle.innerHTML = '';
      this.hidenTitle.insertAdjacentHTML('afterbegin', html)
      }
    })
  }
  
}

export default new SearchTaskView();