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

  renderTaskData(data, handler) {
    const html = `
          <div class="info">
              <svg><use href="icons.svg#icon-task"></use></svg>
              <div class="info__text">
                <p class="info--title">Name</p>
                <p class="info--name">${data.name}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-time"></use></svg>
              <div class="info__text">
                <p class="info--title">Category</p>
                <p class="info--about">${data.category}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-star"></use></svg>
              <div class="info__text">
                <p class="info--title">Status</p>
                <p class="info--date">${data.status}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-color"></use></svg>
              <div class="info__text">
                <p class="info--title">Color</p>
                <p class="info--gender">${data.color}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-calendar"></use></svg>
              <div class="info__text">
                <p class="info--title">Created Date</p>
                <p class="info--date">${data.createdDate}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-calendar"></use></svg>
              <div class="info__text">
                <p class="info--title">Due Date</p>
                <p class="info--date">${data.dueDate}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-history"></use></svg>
              <div class="info__text">
                <p class="info--title">Remaining Days</p>
                <p class="info--date">${data.remaininingDays < 0 ? `before ${data.remaininingDays}Days` : `after ${data.remaininingDays}Days`}</p>
              </div>
            </div>

          <div class="btns">
            <button class="delete">Delete</button>
          </div>
    `
    
    this.mainPage.innerHTML = '';
    this.mainPage.insertAdjacentHTML('beforeend', html);
    this.deleteBtn = document.querySelector('.delete');
    this.deleteBtn.addEventListener('click', () => {
      handler(this.taskData.name)
    })
  }
}

export default new taskView();