import View from './view.js';

class ProfileView extends View {
  parentEl = document.querySelector('.profile-info');
  
  render(data) {
    const html = `
            <div class="profile__img-box">
              <img src="${data.image}" alt="user_image">
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-profile"></use></svg>
              <div class="info__text">
                <p class="info--title">Name</p>
                <p class="info--name">${data.username}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-time"></use></svg>
              <div class="info__text">
                <p class="info--title">About</p>
                <p class="info--about">${data.about}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-color"></use></svg>
              <div class="info__text">
                <p class="info--title">Gender</p>
                <p class="info--gender">${data.gender}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-calendar"></use></svg>
              <div class="info__text">
                <p class="info--title">Birthdate</p>
                <p class="info--date">${data.birthdate}</p>
              </div>
            </div>

            <div class="info">
              <svg><use href="icons.svg#icon-star"></use></svg>
              <div class="info__text">
                <p class="info--title">Level</p>
                <p class="info--date">${data.level}</p>
              </div>
            </div>

            <div class="user-summary">
              <p>${data.userSummarise}</p>
            </div>
    `
    this.parentEl.innerHTML = ''
    this.parentEl.insertAdjacentHTML('beforeend', html)
  }
}

export default new ProfileView();