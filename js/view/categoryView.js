import View from "./view.js";

class categoryView extends View {
  parentEl = document.querySelector(".category-cards");
  parentCard = document.querySelector(".category-cards");
  hidenTitle = document.querySelector(".page-title-2");
  mainPage = document.querySelector(".main-page-2");
  currentCategory;
  categoryData;
  parentTask;
  deleteBtn;
  editBtn;

  render(dataMain) {
    if (dataMain.length <= 0) return;

    this.parentEl.innerHTML = "";
    dataMain.forEach((data) => {
      const formatClass = data.name.split(" ").join("_");
      const html = `
      <p class="category--index">Category(<span class="category-total"> ${dataMain.length} </span>)</p>

        <div class="category-card ${formatClass} call-Tasks caller call-2" style="background-color: ${data.color}">
          <img src="${data.image}" alt="" class="category__img">
          <p class="category__name">${data.name}</p>
          <p class="category__total">${data.tasks.length}</p>
        </div>
        
        `;
      this.parentEl.insertAdjacentHTML("beforeend", html);
    });
  }

  showCategoryData(handler) {
    this.parentCard.addEventListener("click", (e) => {
      this.hidenTitle.innerHTML = "";
      const currCategory = e.target.closest(".category-card").classList[1];
      if (!currCategory) return;
      this.currentCategory = currCategory;
      handler();

      if (this.categoryData) {
        this.renderCategoryData(this.categoryData);
      }

      const html = `
      <p class="page__heading">Category (${this.currentCategory})</p>
      <p class="page__text">Total Tasks: <span>${
        this.categoryData.tasks.length || 0
      }</span></p>
      `;
      this.hidenTitle.innerHTML = "";
      this.hidenTitle.insertAdjacentHTML("afterbegin", html);
    });
  }

  renderCategoryData(data) {
    const html = `
          <div class="profile__img-box">
            <img src="${data.image}" alt="">
          </div>

          <div class="info">
              <svg><use href="icons.svg#icon-category"></use></svg>
              <div class="info__text">
                <p class="info--title">Name</p>
                <p class="info--name">${data.name}</p>
              </div>
          </div>

            <div class="info">
              <svg><use href="icons.svg#icon-color"></use></svg>
              <div class="info__text">
                <p class="info--title">Color</p>
                <p class="info--gender">${data.color}</p>
              </div>
            </div>

          <div class="btns">
            <button class="delete">Delete</button>
          </div>

            <div class="main-page-3">

            </div>

    `;

    this.mainPage.innerHTML = "";
    this.mainPage.insertAdjacentHTML("beforeend", html);
    this.parentTask = document.querySelector(".main-page-3");
    this.renderTasks(data.tasks);
    this.deleteBtn = document.querySelector(".delete");
  }

  deleteCategory(handler) {
    setTimeout(() => {
      this.deleteBtn.addEventListener("click", () => {
        handler(this.categoryData.name);
      });
    }, 1000);
  }
}

export default new categoryView();
