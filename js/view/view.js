export default class View {
  _spinner = document.querySelector('.animation-page')
  _msgBox = document.querySelector('.msg-box-page')
  data;

  formSubmit(handler) {
    this._form.addEventListener('submit', function (e) {
    e.preventDefault();
    const dataArr = [...new FormData(this)];
    const data = Object.fromEntries(dataArr);
    handler(data);
    })
  }

  showPage() {
    this.parentEl.style.display = 'block';
    this._spinner.style.display = 'none';
  }

  Spinner() {
    this.parentEl.style.display = 'none';
    this._spinner.style.display = 'flex';
  }

  hidePage() {
    this.parentEl.style.display = 'none';
  }

  msgBox(msg) {
    this._msgBox.style.display = 'flex';
    this._msgBox.innerHTML = '';
    this._msgBox.insertAdjacentHTML('afterbegin', msg);
    if (msg === 'close') {
      this._msgBox.style.display = 'none';
      this._msgBox.innerHTML = '';
    }  
  }

  
  imgUpload(handler) {
    this._imgForm.addEventListener('change', (e) => {
      this.imgFiles = e.target.files;
      this.userImg.style.display = 'block';
      this._uploadSvg.style.display = 'none';
      handler();
    })
  }

  renderTasks(tasks) {
    this.parentTask.innerHTML = '';
    tasks.forEach(task => {
      const formatClass = task.name.split(' ').join('_')

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
    `
      this.parentTask.insertAdjacentHTML('beforeend', html)
    })
  }
}
