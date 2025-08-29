"use strict"
import { initDesignView } from "./view/designView.js";
import * as module from '../js/module.js'
import view from "./view/view.js";
import registerView from "./view/registerView.js";
import dashboardView from "./view/dashboardView.js";
import profileView from "./view/profileView.js";
import addCategoryView from "./view/addCategoryView.js";
import categoryView from "./view/categoryView.js";
import addTaskView from "./view/addTaskView.js";
import { currentDate } from "./helper.js";
import taskView from "./view/taskView.js";
import showTasks from "./view/showTasks.js";


function initLoadingPage() {
  if (!module.personData.logged) {
    setTimeout(() => {
      registerView.showPage();
    },3000)
  }
  else {
    dashboardView.Spinner();
    setTimeout(() => {
      dashboardView.showPage();
    },2000)
  }
}

// The timers waiting the input file image while reading and  loading image;
function register(data) {
  //Check form
  const msg = module.checkRegistForm(data, 'data')
  registerView.msgBox(msg);  
  //message box hide
  setTimeout(() => {
    registerView.msgBox('close')
  }, 1000);

  //completed form
  if (msg === 'Register completed') {
    module.registData(data)
    registerView.Spinner();
  
    setTimeout(() => {
      dashboardView.showPage()
      updateRender();
    }, 1500);
    setTimeout(() => {
      window.location.reload()
    }, 2200);
  }
  ///////////////////////////////
}

function loaded() {
  const files = registerView.imgFiles || addCategoryView.imgFiles;
  const img = registerView.imgFiles ? registerView.userImg : addCategoryView.userImg;
  module.readInput(files, img)
}


function updateRender() {
  profileView.render(module.personData)
  categoryView.render(module.personData.data.categories);
  const name = module.personData.data.categories.map(category => category.name);
  taskView.render(name)
  taskView.renderTasks(module.personData.data.tasks)
  currentDate()
  module.statusLoad();
  dashboardRender(module.personData);
  dashboardView.showNotifications(module.personData.data.notifications);
  initDesignView();
}

function dashboardRender(data) {
  dashboardView.renderNavigation(data, currentDate)
  dashboardView.renderHeader(data, module.shortDate())
  dashboardView.renderReport(data)
  dashboardView.renderTopCategories(module.sortCategory())
  dashboardView.renderNewestTasks(module.newestTasks());
  dashboardView.renderStatus(module.personData.data.Status, module.personData.data.tasks)
  dashboardView.showCategoryTasks(categoryData)
  dashboardView.showMonthTasks(monthData)
  taskView.showTaskData(taskData, deleteTask);
  categoryView.showCategoryData(categoryInfo)
}

function categoryAdder(data) {
    //Check form
  const msg = module.checkRegistForm(data, 'category')
  addCategoryView.msgBox(msg);
  //message box hide
  setTimeout(() => {
    addCategoryView.msgBox('close')
  }, 1000);

  //completed form
  if (msg === 'Register completed') {
    module.addCategory(data);

    setTimeout(() => { 
      updateRender();
      window.location.reload()
    }, 1500);
  }
}

function taskAdder(data) {
  module.addTask(data);
  updateRender()
  setTimeout(() => {
  window.location.reload()
}, 500);
}

function categoryData() {
  module.categTasks(dashboardView.categ)
  dashboardView.catTasks = module.categTasks(dashboardView.categ)
}

function monthData() {
  dashboardView.monthData = module.monthTasks(dashboardView.currentMonth);
}

function taskData() {
  const className = taskView.currentTask.split('_').join(' ')
  taskView.currentTask = className;
  taskView.taskData = module.task(className);
}

function categoryInfo() {
  const className = categoryView.currentCategory.split('_').join(' ')
  categoryView.currentCategory = className;
  categoryView.categoryData = module.category(className);
  categoryView.deleteCategory(deleteCateg)
}

function deleteCateg(name) {
  module.deleteCategory(name);
  updateRender();
  setTimeout(() => {
  window.location.reload()
  }, 200);
}

function deleteTask(name) {
  module.deleteTask(name)
  setTimeout(() => {
  updateRender();
  window.location.reload()
  }, 600);
}

function logout() {
  setTimeout(() => {
    module.logoutApp()
    window.location.reload();
  }, 500);
}


function init() {
  initDesignView();
  initLoadingPage();
  updateRender();
  registerView.formSubmit(register);
  registerView.imgUpload(loaded);
  addCategoryView.imgUpload(loaded);
  addCategoryView.formSubmit(categoryAdder);
  addTaskView.formSubmit(taskAdder)
  dashboardView.logoutApp(logout)
}


init()