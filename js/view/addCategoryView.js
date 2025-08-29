import View from './view.js';

class addCategoryView extends View {
  parentEl = document.querySelector('.add-category-page');
  _form = document.querySelector('.submit-category');
  userImg = document.querySelector('.uploaded-category-img');
  _uploadSvg = document.querySelector('.upload-icon');
  _imgForm = document.querySelector('.upload-category-img');
  imgFiles


}

export default new addCategoryView()