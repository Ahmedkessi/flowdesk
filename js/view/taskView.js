import View from './view.js';

class taskView extends View {
  parentEl = document.querySelector('.selected-value');
  parentTask = document.querySelector('.tasks-list');
  hidenTitle = document.querySelector(".page-title-2");
  mainPage = document.querySelector('.main-page-2');
  currentTask;
  taskData;
  deleteBtn;

  render(categoriesName) {
    this.parentEl.innerHTML = ''
    categoriesName.forEach(data => {
      const html = `
          <option class="category-exist" value="${data}">${data}</option>
        `
      this.parentEl.insertAdjacentHTML('beforeend', html);
    });
  }


  showTaskData(handler, caller) {
  this.parentTask.addEventListener("click", (e) => {
    this.hidenTitle.innerHTML = "";
    const currTask = e.target.closest('.task-item').classList[1];
    this.currentTask = currTask;
    handler()

    if (this.taskData) {
      this.renderTaskData(this.taskData, caller)
    }

    const html = `
    <p class="page__heading">Task (${this.currentTask})</p>
    `
    this.hidenTitle.innerHTML = '';
    this.hidenTitle.insertAdjacentHTML('afterbegin', html)

  });
}
}

export default new taskView();