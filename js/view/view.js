
export default class View {
  _spinner = document.querySelector(".animation-page");
  _msgBox = document.querySelector(".msg-box-page");
  data;
  _inp = document.querySelectorAll(".inp");

  formSubmit(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(this._form)];
      const data = Object.fromEntries(dataArr);
      handler(data);
        this._inp.forEach((i) => (i.value = ""));
    });
  }

  showPage() {
    this.parentEl.style.display = "block";
    this._spinner.style.display = "none";
  }

  Spinner() {
    this.parentEl.style.display = "none";
    this._spinner.style.display = "flex";
  }

  hidePage() {
    this.parentEl.style.display = "none";
  }

  msgBox(msg) {
    this._msgBox.style.display = "flex";
    this._msgBox.innerHTML = "";
    this._msgBox.insertAdjacentHTML("afterbegin", msg);
    if (msg === "close") {
      this._msgBox.style.display = "none";
      this._msgBox.innerHTML = "";
    }
  }

  imgUpload(handler) {
    this._imgForm.addEventListener("change", (e) => {
      this.imgFiles = e.target.files;
      this.userImg.style.display = "block";
      this._uploadSvg.style.display = "none";
      handler();
    });
  }

  renderTasks(tasks) {
    const tasksLength = document.querySelector(`.tasks-length`)
    tasksLength.innerHTML = tasks.length;
    this.parentTask.innerHTML = "";
    tasks.forEach((task) => {
      const formatClass = task.name.split(" ").join("_");

      const html = `
        <div class="item ${formatClass} task-item caller call-2">
          <div class="task-color" style="border: .5rem solid ${task.color};"></div>
          <p class="task-name">${task.name}</p>
          <p class="task-status ${task.status}">${task.status}</p>
          <p class="task-type">${task.category}</p>
          <p class="task-date">${task.dueDate}</p>

          <div class="list-icon">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
    `;
      this.parentTask.insertAdjacentHTML("beforeend", html);
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
                <p class="info--date">${
                  data.remaininingDays < 0
                    ? `before ${Math.abs(data.remaininingDays)}Days`
                    : `after ${data.remaininingDays}Days`
                }</p>
              </div>
            </div>

          <div class="btns">
            <button class="delete">Delete</button>
          </div>
    `;

    this.mainPage.innerHTML = "";
    this.mainPage.insertAdjacentHTML("beforeend", html);
    this.deleteBtn = document.querySelector(".delete");
    this.deleteBtn.addEventListener("click", () => {
      handler(this.taskData.name);
    });
  }
}
