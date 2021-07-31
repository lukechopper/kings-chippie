import '../styles/style.scss';
import {addAndRemoveClasses, trashSVG} from './utils.js';
import {gsap} from 'gsap';
import * as map from './map';

const nav = document.getElementById('nav');
const navLogo = document.getElementById('nav-logo');
const openSection = document.getElementById('open');
const openArrow = document.getElementById('open-arrow');
const hamburger = document.getElementById('hamburger');
const navItems = document.getElementById('nav-items');
const hl1 = document.getElementById('hl-1');
const hl2 = document.getElementById('hl-2');
const hl3 = document.getElementById('hl-3');

const sortNavHeight = (function(){

    let scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let newScroll = null;

    return function(scrollArg){
        if(innerWidth < 994) return;
        nav.style.transition = '';
        navLogo.style.transition = '';
        newScroll = scrollArg;
        if(newScroll !== scroll || newScroll === 0){
            nav.style.transition = 'all 0.15s ease-in-out';
            navLogo.style.transition = 'all 0.15s ease-in-out';
        }
        
        if(newScroll > 0){
            nav.style.height = '90px';
            navLogo.style.width = '80px';
            return;
        }
        nav.style.height = '120px';
        navLogo.style.width = '100px';
    }
})();
sortNavHeight();

navLogo.onclick = () => {
    openSection.scrollIntoView({behavior: 'smooth'});
    window.location.hash = '#Home';
}
let hamburgerOpen = false;
hamburger.onclick = () => {
    hamburgerOpen = !hamburgerOpen;
    if(hamburgerOpen){
        gsap.to(navItems, {duration: 0.5, height:'328px', ease: 'easeInOut'});
        gsap.to(hl1, {duration: 0.5, ease: 'easeInOut', top: '25px', rotate: '45deg'});
        gsap.to(hl2, {duration: 0.5, ease: 'easeInOut', opacity: '0'});
        gsap.to(hl3, {duration: 0.5, ease: 'easeInOut', top: '-19px', rotate: '-45deg'});
        return;
    }
    gsap.to(navItems, {duration: 0.5, height:'0', ease: 'easeInOut'});
    gsap.to(hl1, {duration: 0.5, ease: 'easeInOut', top: '0', rotate: '0'});
    gsap.to(hl2, {duration: 0.5, ease: 'easeInOut', opacity: '1'});
    gsap.to(hl3, {duration: 0.5, ease: 'easeInOut', top: '0', rotate: '0'});
}

const aboutSection = document.getElementById('about');
let navLinks = document.querySelectorAll('.nav-links');
navLinks = Array.prototype.slice.call(navLinks);

openArrow.onclick = () => {
    aboutSection.scrollIntoView({behavior: 'smooth'});
}
navLinks[0].onclick = () => {
    aboutSection.scrollIntoView({behavior: 'smooth'});
}

const menuSection = document.getElementById('menu');
function addMenuItemEventListener(){
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.onmouseenter  = (e) => {
            if(innerWidth < 994) return;
            let height = item.clientHeight;
            // console.log(height);
            let scale = 1.04;
            if(height >= 1000 && height < 2000) scale = 1.03;
            if(height >= 2000 && height < 3000) scale = 1.02;
            if(height >= 3000) scale = 1.01;
            item.style.transform = `scale(${scale})`;
        }
        item.onmouseleave  = () => {
            if(innerWidth < 994) return;
            item.style.transform = `scale(${1})`;
        }
    });
}
addMenuItemEventListener();

navLinks[1].onclick = () => {
    menuSection.scrollIntoView({behavior: 'smooth'});
}

const locationSection = document.getElementById('location');

navLinks[2].onclick = () => {
    locationSection.scrollIntoView({behavior: 'smooth'});
}

const contactSection = document.getElementById('contact');

navLinks[3].onclick = () => {
    contactSection.scrollIntoView({behavior: 'smooth'});
}

let scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

addEventListener('scroll', () => {
    scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    sortNavHeight(scroll);
    //OPEN section
    if(scroll < aboutSection.offsetTop - 200){
        if(!navLinks[0].classList.contains('selected')) return;
        addAndRemoveClasses('', 'selected', navLinks);
        return;
    }
    //ABOUT section
    if(scroll >= aboutSection.offsetTop - 200 && scroll < menuSection.offsetTop - 200){
        if(navLinks[0].classList.contains('selected')) return;
        addAndRemoveClasses('selected', '', navLinks[0]);
        addAndRemoveClasses('', 'selected', navLinks.slice(1));
    }
    //MENU section
    if(scroll >= menuSection.offsetTop - 200 && scroll < locationSection.offsetTop - 200){
        if(navLinks[1].classList.contains('selected')) return;
        addAndRemoveClasses('selected', '', navLinks[1]);
        addAndRemoveClasses('', 'selected', [...navLinks.slice(2), navLinks[0]]);
    }
    //LOCATION section
    if(scroll >= locationSection.offsetTop - 200 && scroll < contactSection.offsetTop - 200){
        if(navLinks[2].classList.contains('selected')) return;
        addAndRemoveClasses('selected', '', navLinks[2]);
        addAndRemoveClasses('', 'selected', [...navLinks.slice(0, 2), navLinks[3]]);
        if(document.querySelector('.mapboxgl-control-container') === (undefined || null)){
            map.loadLocation();
        }
    }
    if(scroll >= contactSection.offsetTop - 200){
        addAndRemoveClasses('selected', '', navLinks[3]);
        addAndRemoveClasses('', 'selected', [...navLinks.slice(0, 3)]);
    }
});

let menuCols = document.querySelectorAll('.menu-col');
let menuCol1Content = menuCols[0].innerHTML;
let menuCol2Content = menuCols[1].innerHTML;
const menuContainer = document.getElementById('menu-container');
const menuTotal = document.getElementById('total');
const menuTotalPrice = document.getElementById('total-price');

function smallMenu(){
    let menuItems = document.querySelectorAll('.menu-item');
        menuItems = Array.prototype.slice.call(menuItems);
        menuItems.sort((a, b) => {
            return Number(a.getAttribute('order-by')) - Number(b.getAttribute('order-by'));
        });
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            menuContainer.append(item);
        });
}

if(innerWidth < 780){
    smallMenu();
}
let priceContainer = menuContainer.querySelectorAll('.price-title');
let counterContainer = menuContainer.querySelectorAll('.counter-container');

addEventListener('resize', () => {
    //Animate nav-bar. Related to CSS media queries. Counter 'sortNavHeight' function.
    if(innerWidth < 994){
        nav.style.height = '';
        navLogo.style.width = '';
        nav.style.transition = 'all 0.15s ease-in-out';
        navLogo.style.transition = 'all 0.15s ease-in-out';
    }else if(innerWidth >= 994 && scroll > 0){
        nav.style.height = '90px';
        navLogo.style.width = '80px';
        nav.style.transition = '';
        navLogo.style.transition = '';
    }
    if(innerWidth < 780){
        //MENU
        let menuCol = document.querySelectorAll('.menu-col');
        if(menuCol.length < 1) return;
        smallMenu();
        return;
    }
    if(innerWidth >= 780){
        hamburgerOpen = false;
        gsap.to(navItems, {duration: 0, height:'0' });
        gsap.to(hl1, {duration: 0,  top: '0', rotate: '0'});
        gsap.to(hl2, {duration: 0,  opacity: '1'});
        gsap.to(hl3, {duration: 0,  top: '0', rotate: '0'});
    }
    if(innerWidth >= 780 && document.querySelectorAll('.menu-col').length < 1){
        populateOrderNum(counterContainer);
        let col1 = document.createElement('div');
        col1.classList.add('menu-col');
        let col2 = document.createElement('div');
        col2.classList.add('menu-col');
        col1.innerHTML = menuCol1Content;
        col2.innerHTML = menuCol2Content;
        menuContainer.innerHTML = '';
        menuContainer.prepend(col2);
        menuContainer.prepend(col1);
        addMenuItemEventListener();
        //MENU FUNC
        menuFunc();
    }
});

let menuScores = [];
let orderNum = [];
const orderContainer = document.getElementById('order-container');
let totalPrice = 0;

function populateOrderNum(){
    orderNum = [];
    counterContainer.forEach((item, index) => {
        const number = Number(item.querySelector('.number').innerHTML);
        orderNum.push(number);
    });
}

function menuFunc(){

    menuScores = [];

    priceContainer = menuContainer.querySelectorAll('.price-title');
    counterContainer = menuContainer.querySelectorAll('.counter-container');

    priceContainer.forEach((item, index) => {
        let price = item.querySelector('.price').innerHTML;
        const title = item.querySelector('.title').innerHTML;
        price = price.match(/[\d|\.]/g);
        price = Number(price.join(''));
        const total = orderNum[index];
        const menuItem = {index, title, price, total};
        menuScores.push(menuItem);
    });
    
    counterContainer.forEach((item, index) => {
        const plusEle = item.querySelector('.plus');
        const minusEle = item.querySelector('.minus');
        const numberEle = item.querySelector('.number');
        plusEle.onclick = () => {
            let menuItem = menuScores[index];
            ++menuItem.total;
            numberEle.innerHTML = menuItem.total;
            //MENU PRICE
            totalPrice += menuItem.price;
            menuTotalPrice.innerHTML = '£'+Math.abs(totalPrice).toFixed(2);
            //ORDER CONTAINER
            const orderContainerRows = orderContainer.querySelectorAll('.row');

            let foundTitleMatch = false;
            let outerIndex = index;
            let indexOfMatch = 0;
            orderContainerRows.forEach((row, index) => {
                if(row.getAttribute('menu-index') == outerIndex){
                    foundTitleMatch = true;
                    indexOfMatch = index;
                }
            });
            if(!foundTitleMatch){
                menuTotal.insertAdjacentHTML('beforebegin', `<div class="row" menu-index="${index}"><p class="row-title"><span class="title-span">${menuItem.title}</span>${trashSVG}</p>
                    <p class="row-total"><span class="minus">—</span><span class="span-total">${menuItem.total}</span><span class="plus">+</span></p><p class="row-price">£${menuItem.price.toFixed(2)}</p></div>`);
                    orderContainer.querySelectorAll('.delete-icon').forEach(icon => {
                        icon.onclick = () => {
                            let menuIndex = Number(icon.parentNode.parentNode.getAttribute('menu-index'));
                            icon.parentNode.parentNode.remove();
                            let menuItem = menuScores[menuIndex];
                            let menuElement = counterContainer[menuIndex];
                            totalPrice -= (menuItem.total * menuItem.price);
                            menuItem.total = 0;
                            menuElement.querySelector('.number').innerHTML = menuItem.total;
                            menuTotalPrice.innerHTML = '£'+Math.abs(totalPrice).toFixed(2);
                        };
                    });
                    orderContainer.querySelectorAll('.minus').forEach(minus => {
                        minus.onclick = () => {
                            let menuIndex = Number(minus.parentNode.parentNode.getAttribute('menu-index'));
                            let menuItem = menuScores[menuIndex];
                            let menuElement = counterContainer[menuIndex];
                            --menuItem.total;
                            if(menuItem.total < 1){
                                minus.parentNode.parentNode.remove();
                            }
                            menuElement.querySelector('.number').innerHTML = menuItem.total;
                            totalPrice -= menuItem.price;
                            menuTotalPrice.innerHTML = '£'+Math.abs(totalPrice).toFixed(2);
                            const spanTotal = minus.parentNode.querySelector('.span-total');
                            spanTotal.innerHTML = menuItem.total;
                            const rowPrice = minus.parentNode.parentNode.querySelector('.row-price');
                            rowPrice.innerHTML = '£'+(menuItem.total * menuItem.price).toFixed(2);
                        };
                    });
                    orderContainer.querySelectorAll('.plus').forEach(plus => {
                        plus.onclick = () => {
                            let menuIndex = Number(plus.parentNode.parentNode.getAttribute('menu-index'));
                            let menuItem = menuScores[menuIndex];
                            let menuElement = counterContainer[menuIndex];
                            ++menuItem.total;
                            menuElement.querySelector('.number').innerHTML = menuItem.total;
                            totalPrice += menuItem.price;
                            menuTotalPrice.innerHTML = '£'+totalPrice.toFixed(2);
                            const spanTotal = plus.parentNode.querySelector('.span-total');
                            spanTotal.innerHTML = menuItem.total;
                            const rowPrice = plus.parentNode.parentNode.querySelector('.row-price');
                            rowPrice.innerHTML = '£'+(menuItem.total * menuItem.price).toFixed(2);
                        };
                    });
                    return;
            }
            const rowTotal = orderContainerRows[indexOfMatch].querySelector('.span-total');
            const rowPrice = orderContainerRows[indexOfMatch].querySelector('.row-price');
            rowTotal.innerHTML = menuItem.total;
            rowPrice.innerHTML = '£'+(menuItem.total * menuItem.price).toFixed(2);
        }
        minusEle.onclick = () => {
            let menuItem = menuScores[index];
            if(menuItem.total < 1) return;
            --menuItem.total;
            numberEle.innerHTML = menuItem.total;
            //MENU PRICE
            totalPrice -= menuItem.price;
            menuTotalPrice.innerHTML = '£'+Math.abs(totalPrice).toFixed(2);
            //ORDER CONTAINER
            const orderContainerRows = orderContainer.querySelectorAll('.row');
            
            let foundTitleMatch = false;
            let outerIndex = index;
            let indexOfMatch = 0;
            orderContainerRows.forEach((row, index) => {
                if(row.getAttribute('menu-index') == outerIndex){
                    foundTitleMatch = true;
                    indexOfMatch = index;
                }
            });
            if(!foundTitleMatch) return;
            const rowTotal = orderContainerRows[indexOfMatch].querySelector('.span-total');
            const rowPrice = orderContainerRows[indexOfMatch].querySelector('.row-price');
            if(menuItem.total < 1){
                orderContainerRows[indexOfMatch].remove();
                return;
            }
            rowTotal.innerHTML = menuItem.total;
            rowPrice.innerHTML = '£'+(menuItem.total * menuItem.price).toFixed(2);
        }
            numberEle.innerHTML = orderNum[index];
    });
}
populateOrderNum();
menuFunc();

//URL FRAGMENT
const loadURLHash = window.location.hash;
if(loadURLHash === '#Home') openSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#About') aboutSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#Menu') menuSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#Location') locationSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#Contact') contactSection.scrollIntoView({behavior: 'smooth'});