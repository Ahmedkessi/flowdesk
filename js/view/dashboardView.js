import View from "./view.js";

class dashboardView extends View {
  parentEl = document.querySelector(".application");
  _dashboard = document.querySelector(".dashboard-page ");
  _nav = document.querySelector(".navigation");
  _dashboardHead = document.querySelector(".dashboard__header");
  _report = document.querySelector(".report");
  _topCategory = document.querySelector(".usefull-boxes");
  _newTasks = document.querySelector(".newest-tasks");
  _graph = document.querySelector(".graphs");
  parentTask = document.querySelector(".main-page");
  hidenTitle = document.querySelector(".page-title");
  msgIcon;
  topCategs;
  catTasks;
  currentMonth;
  monthData;
  parentMonth = document.querySelector(".transaction__items");
  logout = document.querySelector('.logout')

  renderNavigation(data, currentDate) {
    const html = `
        <div class="logo-box logo-app">
          <img src="images/FlowDesk_Logo.png" alt="logo_image" class="logo_image">
          <p class="local-date">${currentDate()}</p>
        </div>

        <div class="middle-nav">
          <div class="search-box">
            <input type="text" class="search-task" placeholder="Search task">
            <svg class="search"><use href="icons.svg#icon-search"></use></svg>
          </div>
          <div class="filter-box">
            <svg class="filter"><use href="icons.svg#icon-filter"></use></svg>
          <div class="filter-options">
            <p class="by-date">by date</p>
            <p class="by-name">by name</p>
            <p class="by-category">by category</p>
          </div>
          </div>
        </div>

        <div class="right-nav">
          <div class="msg-box caller call-1">
          <p class="msg-num">${data.data.notifications.length}</p>
          <svg><use href="icons.svg#icon-notification"></use></svg>
        </div>


        <div class="user-intro">
          <img src="${data.image}" class="intro__user-image">
          <p class="intro__user-name">${data.username}</p>
          <p class="intro__user-about">${data.about}</p>
        </div>
    </div>
    `;
    this._nav.innerHTML = "";
    this._nav.insertAdjacentHTML("afterbegin", html);
    this.msgIcon = document.querySelector(".msg-box");
  }

  renderHeader(data, time) {
    const html = `
          <h1 class="welcome">Welcome, <span class="guest">${data.username}!</span></h1>

          <h2 class="welcome_date">
          <span class="welcome--day">${time}</span>
          </h2>
    `;
    this._dashboardHead.innerHTML = "";
    this._dashboardHead.insertAdjacentHTML("afterbegin", html);
  }

  renderReport(data) {
    const html = `
              <div class="report__level">
                <div class="in-box">
                  <svg><use href="icons.svg#icon-star"></use></svg>
                  <p class="level-total">${data.level}</p>
                </div>
                <p class="report--name">Level</p>
              </div>

              <div class="report__category">
                <div class="in-box">
                  <svg><use href="icons.svg#icon-category"></use></svg>
                  <p class="category-total">${data.data.categories.length}</p>
                </div>
                <p class="report--name">Categories</p>
                <div class="track-box">
                  <div class="track"></div>
                </div>
              </div>

              <div class="report__tasks">
                <div class="in-box">
                  <svg><use href="icons.svg#icon-task"></use></svg>
                  <p class="task-total">${data.data.tasks.length}</p>
                </div>
                <p class="report--name">Tasks</p>
                <div class="track-box">
                  <div class="track"></div>
                </div>
              </div>

            </div>
    `;
    this._report.innerHTML = "";
    this._report.insertAdjacentHTML("afterbegin", html);
  }

  renderTopCategories(data) {
    this._topCategory.innerHTML = "";
    data.forEach((category) => {
      const html = `
                <div class="category-card ${category.name}  call-Tasks caller slide-card call-1">
                  <img class="category__img" src="${category.image}" alt="">

                  <div class="category__name">${category.name}</div>
                  <div class="category__total">${category.tasks.length}</div>
                </div>                
    `;
      this._topCategory.insertAdjacentHTML("beforeend", html);
      this.topCategs = document.querySelectorAll(".call-Tasks");
    });
  }

  renderNewestTasks(tasks) {
    const header = document.querySelector(".tasks-header");
    const taskMain = document.querySelector(".tasks-main");
    header.innerHTML = "";
    taskMain.innerHTML = "";

    tasks.forEach((task) => {
      const htmlhead = `
              <p class="category--header category--name">${task.category}</p>
      `;

      const htmlTasks = `
                <div class="item">
                  <div class="task-color" style="border: .5rem solid ${task.color};"></div>
                  <p class="task-name">${task.name}</p>
                  <p class="task-status ${task.status}">${task.status}</p>
                  <p class="task-date">${task.dueDate}</p>

                  <div class="list-icon">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                </div>
      `;
      header.insertAdjacentHTML("afterbegin", htmlhead);
      taskMain.insertAdjacentHTML("beforeend", htmlTasks);
    });
  }

  renderStatus(status, tasks) {
  const compeletedPer = Math.trunc((status["completed"].length / tasks.length) * 100);
  const notStartPer = Math.trunc((status["notStarted"].length / tasks.length) * 100);
  const inproPer = Math.trunc((status["inprocess"].length / tasks.length) * 100);
    
  const completed = `
    <div class="graph">
      <div class="graph__in-box">
        <svg><use href="icons.svg#icon-refresh"></use></svg>
        <p class="graph__num">${status["completed"].length}</p>
        <div class="track-box">
          <div class="graph-track">
            <div class="track" style="width: ${compeletedPer >= 0 ? compeletedPer : 0}%;"></div>
          </div>
          <div class="track-num">${compeletedPer >= 0 ? compeletedPer : 0}%</div>
        </div>
      </div>
      <p class="graph__name">Completed</p>
    </div>
  `;
      
    const notStarted = `
      <div class="graph">
        <div class="graph__in-box">
          <svg><use href="icons.svg#icon-lock"></use></svg>
          <p class="graph__num">${status["notStarted"].length}</p>
          <div class="track-box">
            <div class="graph-track">
              <div class="track" style="width: ${notStartPer >= 0 ? notStartPer : 0}%;"></div>
            </div>
            <div class="track-num">${notStartPer >= 0 ? notStartPer : 0}%</div>
          </div>
        </div>
        <p class="graph__name">Not started</p>
      </div>
    `;

    const Inprocess = `
      <div class="graph">
        <div class="graph__in-box">
          <svg><use href="icons.svg#icon-task"></use></svg>
          <p class="graph__num">${status["inprocess"].length}</p>
          <div class="track-box">
            <div class="graph-track">
              <div class="track" style="width: ${inproPer >= 0 ? inproPer : 0}%;"></div>
            </div>
            <div class="track-num">${inproPer >= 0 ? inproPer : 0}%</div>
          </div>
        </div>
        <p class="graph__name">Inprocess</p>
      </div>
    `;
      
    const graphs = [completed, notStarted, Inprocess];
    this._graph.innerHTML = '';
    graphs.forEach(graph => {
      this._graph.insertAdjacentHTML("afterbegin", graph);
    })
  }

  showNotifications(data) {
    this.parentTask.innerHTML = "";
    this.msgIcon.addEventListener("click", () => {
      this.renderTasks(data);

      const html = `
    <p class="page__heading">Notifications</p>
    <p class="page__text">Total: <span>${data.length}</span></p>
    `;

      this.hidenTitle.innerHTML = "";
      this.hidenTitle.insertAdjacentHTML("afterbegin", html);
    });
  }

  showCategoryTasks(handler) {
    if (!this.topCategs) return;
    this.topCategs.forEach((categ) => {
      categ.addEventListener("click", (e) => {
        this.hidenTitle.innerHTML = "";
        this.parentTask.innerHTML = "";

        const currCategory = e.target.closest(".category-card").classList[1];
        this.categ = currCategory;
        handler();
        this.renderTasks(this.catTasks);

        const categoryName = this.catTasks[0].category;
        const html = `
      <p class="page__heading">Category (${categoryName})</p>
      <p class="page__text">Total: <span>${this.catTasks.length}</span></p>
      `;

        this.hidenTitle.innerHTML = "";
        this.hidenTitle.insertAdjacentHTML("afterbegin", html);
      });
    });
  }

  showMonthTasks(handler) {
    this.parentMonth.addEventListener("click", (e) => {
      this.hidenTitle.innerHTML = "";
      this.parentTask.innerHTML = "";

      const currMonth = e.target.closest(".tr__date").classList[1];

      this.currentMonth = currMonth;
      handler()

      if (this.monthData) {
        this.renderTasks(this.monthData)
      }
 

      const html = `
      <p class="page__heading">Month (${currMonth})</p>
      <p class="page__text">Total: <span>${this.monthData.length}</span></p>
      `
      this.hidenTitle.innerHTML = '';
      this.hidenTitle.insertAdjacentHTML('afterbegin', html)
    });
  }

  logoutApp(handler) {
    this.logout.addEventListener('click', () => {
      handler();
    })
  }
}

export default new dashboardView();
