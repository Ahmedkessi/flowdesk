import View from './view.js';

class RegisterView extends View {
  parentEl = document.querySelector('.register');
  _form = document.querySelector('.register__form');
  userImg = document.querySelector('.uploaded-image');
  _uploadSvg = document.querySelector('.regist-img');
  _imgForm = document.querySelector('.upload-image');
  imgFiles;
}

export default new RegisterView()