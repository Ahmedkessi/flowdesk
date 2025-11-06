export function initDesignView() {
  //Naming variables;
const icons_Side = document.querySelector('.icons-side');
const links_Side = document.querySelector('.links-side');
const tapLinks = document.querySelectorAll('.link');
const closeSide = document.querySelector('.close-page');
const backToDashboard = document.querySelectorAll('.back');
const view_Width = window.getComputedStyle(document.body).width.slice(0, -2);
  
const categoryCard = document.querySelectorAll('.slide-card');
const leftBtn = document.querySelector('.left-category')
const rightBtn = document.querySelector('.right-category')

const callers = document.querySelectorAll('.caller');
const closeCallPage = document.querySelectorAll('.close-call-page')
  
const addTask = document.querySelector('.add-task')
const addCategory = document.querySelector('.add-category')
const taskPage = document.querySelector('.add-task-page') 
const categoryPage = document.querySelector('.add-category-page') 

///////////////////////////////////////////////////////////

//Functions;
function closeTap() {
  links_Side.classList.remove('openSide')
  links_Side.classList.add('closeSide')
  if (+view_Width <= 600) return;  
  document.body.style.paddingLeft = '5.5rem'
}

function openTap() {
  links_Side.classList.remove('closeSide')
  links_Side.classList.add('openSide')
  if (+view_Width <= 600) return;
  document.body.style.paddingLeft = '25rem'
}

function showPage(link) {
  const pages = document.querySelectorAll('.page');
  [...pages].forEach(page => page.classList.add('hidden'))
  if (!link) return;
  const page = document.querySelector(`.page-${link}`);
  page.classList.remove('hidden')
}

function tapLinkColor(item) {
  tapLinks.forEach(li => li.classList.remove('active-link'))
  item?.classList.add('active-link')
}
  ////////////

document.querySelector('.user-intro').addEventListener('click', () => {
  showPage(1)
})
  

  let currentCard = 0;
  let maxCard = categoryCard.length;  
  function goTo(cardN) {
    categoryCard.forEach((el, i) => {
      el.style.transform = `translateX(${100 * (i - cardN)}%)`;  
    })  
  }

  function nextCard() {
    if (currentCard === maxCard - 1) {
      currentCard = 0;
    } 
    else {
      currentCard++
    }
    goTo(currentCard)
  }

  function prevCard() {
    if (currentCard === 0) {
      currentCard = maxCard - 1;
    }
    else {
      currentCard--
    }
    goTo(currentCard)
  }
  //////////////////
  



  function callPage(e) {
    const caller = e.target.closest('.caller');
    const targetClass = [...caller.classList].at(-1);
    const pageN = targetClass.at(-1)
    const page = document.querySelector(`.caller-page-${pageN}`);

    document.querySelectorAll('.caller-page').forEach(page => page.classList.remove('call'));
    page.classList.add('call');
    page.classList.remove('decline');
  }

////////////////////////////////////////////////////////////



//Event Handler;
icons_Side.addEventListener('click', e => {
  const btn = e.target.closest('.icon');
  const data = btn?.dataset?.ln;
  const item = document.querySelector(`.link-${data}`)
  if (!btn || e.target.closest('.close-page')) return;
  openTap()
  tapLinkColor(item)
  showPage(data)
})
  


links_Side.addEventListener('click', e => {
  const item = e.target.closest('.link');
  if (!item) return;
  const data = [...item.classList][1].at(-1);
  tapLinkColor(item)
  showPage(data)
})

closeSide.addEventListener('click', closeTap)

backToDashboard.forEach(back => {
  back.addEventListener('click', () => {
  const pages = document.querySelectorAll('.page');
  [...pages].forEach(page => page.classList.add('hidden'))
    document.querySelector('.page-2').classList.remove('hidden')
    closeTap()

  })
})
  
// leftBtn.addEventListener('click', prevCard);
// rightBtn.addEventListener('click', nextCard)
  
callers.forEach(caller => {
  caller.addEventListener('click', (e) => {
  callPage(e)
})
})
  
closeCallPage.forEach(icon => {
  icon.addEventListener('click', () => {
  const pages = document.querySelectorAll('.caller-page');

  pages.forEach(page => {
    page.classList.remove('call');
    page.classList.add('decline');
  })
}) 
})

addTask.addEventListener('click', () => {
  taskPage.classList.remove('decline');
  taskPage.classList.add('call')
})

addCategory.addEventListener('click', () => {
  categoryPage.classList.remove('decline');
  categoryPage.classList.add('call')
})

  //////////////////////////////////////////////////////////

}