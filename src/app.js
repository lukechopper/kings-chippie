import '../styles/style.scss';
import {addAndRemoveClasses, trashSVG, trashSVG2} from './partials/utils.js';
import {gsap} from 'gsap';
import axios from 'axios';
import * as map from './partials/map';
import * as ele from './partials/elements';
import * as navBar from './partials/navBar';
import {submitOrder} from './submitOrder';

export let overlayMeshMenuItem = {menuItem: null, overlay: false};
export let beforeOverlayMeshMenuItem = null;

function addMenuItemEventListener(){
    let menuItems = document.querySelectorAll('.menu-item');
    menuItems = Array.prototype.slice.call(menuItems);
    menuItems.push(ele.orderContainer);
    menuItems.forEach(item => {
        item.onmouseenter  = (e) => {
            overlayMeshMenuItem.menuItem = item;
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
            if(overlayMeshMenuItem.overlay) return;
            if(innerWidth < 994) return;
            item.style.transform = `scale(${1})`;
        }
    });
}
addMenuItemEventListener();

let scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

addEventListener('scroll', () => {
    scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    navBar.sortNavHeight(scroll);
    //OPEN section
    if(scroll < ele.aboutSection.offsetTop - 200){
        if(!ele.navLinks[0].classList.contains('selected')) return;
        addAndRemoveClasses('', 'selected', ele.navLinks);
        return;
    }
    //ABOUT section
    if(scroll >= ele.aboutSection.offsetTop - 200 && scroll < ele.menuSection.offsetTop - 200){
        if(ele.navLinks[0].classList.contains('selected')) return;
        addAndRemoveClasses('selected', '', ele.navLinks[0]);
        addAndRemoveClasses('', 'selected', ele.navLinks.slice(1));
    }
    //MENU section
    if(scroll >= ele.menuSection.offsetTop - 200 && scroll < ele.locationSection.offsetTop - 200){
        if(ele.navLinks[1].classList.contains('selected')) return;
        addAndRemoveClasses('selected', '', ele.navLinks[1]);
        addAndRemoveClasses('', 'selected', [...ele.navLinks.slice(2), ele.navLinks[0]]);
    }
    //LOCATION section
    if(scroll >= ele.locationSection.offsetTop - 200 && scroll < ele.contactSection.offsetTop - 200){
        if(ele.navLinks[2].classList.contains('selected')) return;
        addAndRemoveClasses('selected', '', ele.navLinks[2]);
        addAndRemoveClasses('', 'selected', [...ele.navLinks.slice(0, 2), ele.navLinks[3]]);
        if(document.querySelector('.mapboxgl-control-container') === (undefined || null)){
            map.loadLocation();
        }
    }
    if(scroll >= ele.contactSection.offsetTop - 200){
        addAndRemoveClasses('selected', '', ele.navLinks[3]);
        addAndRemoveClasses('', 'selected', [...ele.navLinks.slice(0, 3)]);
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

addEventListener('resize', () => {
    //Animate nav-bar. Related to CSS media queries. Counter 'sortNavHeight' function.
    if(innerWidth < 994){
        ele.nav.style.height = '';
        ele.navLogo.style.width = '';
        ele.nav.style.transition = 'all 0.15s ease-in-out';
        ele.navLogo.style.transition = 'all 0.15s ease-in-out';
    }else if(innerWidth >= 994 && scroll > 0){
        ele.nav.style.height = '90px';
        ele.navLogo.style.width = '80px';
        ele.nav.style.transition = '';
        ele.navLogo.style.transition = '';
    }
    if(innerWidth < 780){
        //MENU
        let menuCol = document.querySelectorAll('.menu-col');
        if(menuCol.length < 1) return;
        smallMenu();
        return;
    }
    if(innerWidth >= 780){
        navBar.setHamburgerOpen(false);
        gsap.to(ele.navItems, {duration: 0, height:'0' });
        gsap.to(ele.hl1, {duration: 0,  top: '0', rotate: '0'});
        gsap.to(ele.hl2, {duration: 0,  opacity: '1'});
        gsap.to(ele.hl3, {duration: 0,  top: '0', rotate: '0'});
    }
    if(innerWidth >= 780 && document.querySelectorAll('.menu-col').length < 1){
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

export function prepareOverlay(){
    beforeOverlayMeshMenuItem = overlayMeshMenuItem.menuItem;
    overlayMeshMenuItem.menuItem = null;
    overlayMeshMenuItem.overlay = true;
}

export function unprepareOverlay(){
    setTimeout(() => {
        overlayMeshMenuItem.overlay = false;
        if(beforeOverlayMeshMenuItem !== overlayMeshMenuItem.menuItem){
            beforeOverlayMeshMenuItem.style.transform = `scale(${1})`;
        }
    }, 10);
}

let menuScores = [];
let menuItem = null; //Call after GET request

function menuFunc(){

    menuScores = [];

    let priceContainer = menuContainer.querySelectorAll('.price-title');
    let addBtns = menuContainer.querySelectorAll('.add-btn');

    priceContainer.forEach((item, index) => {
        const parentId = item.getAttribute('parent-id');
        const childId = item.getAttribute('child-id');
        let price = item.querySelector('.price').innerHTML;
        price = price.match(/[\d|\.]/g);
        price = Number(price.join(''));
        const menuItem = {parentId, childId, price};
        menuScores.push(menuItem);
    });

    addBtns.forEach((item, index) => {
        item.onclick = () => {

            const menuScore = menuScores[index];
            axios.get('/menu/'+menuScore.parentId+'/'+menuScore.childId).then(res => {
                prepareOverlay();
                menuItem = res.data.data;
                const overlay = document.createElement('div');
                overlay.id = 'overlay';
                overlay.classList.add('overlay');
                overlay.onclick = (e) => {
                    if(e.target.id !== 'overlay') return;
                    e.target.remove();
                    document.body.style.overflow = '';
                    unprepareOverlay();
                }
                const card = document.createElement('div');
                card.setAttribute('menu-score-index', index);
                card.id = 'card';
                card.classList.add('card');
                const cross = document.createElement('div');
                cross.innerHTML = 'x';
                cross.classList.add('cross');
                card.prepend(cross);
                cross.onclick = (e) => {
                    overlay.remove();
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        overlayMeshMenuItem.overlay = false;
                        if(beforeOverlayMeshMenuItem !== overlayMeshMenuItem.menuItem){
                            beforeOverlayMeshMenuItem.style.transform = `scale(${1})`;
                        }
                    }, 10);
                }
                card.insertAdjacentHTML('beforeend', `<h1>${menuItem.title}</h1>`);
                card.insertAdjacentHTML('beforeend', `<p class="price">${menuItem.price}</p>`);
                card.insertAdjacentHTML('beforeend', `<p class="sub-para">${menuItem.desc}</p>`);
                const sides = menuItem.sides[0];
                if(sides){
                    card.insertAdjacentHTML('beforeend', `<p class="sides-title">${sides.title ? sides.title : 'Choose One'}</p>`);
                    sides.option.forEach(option => {
                        const optionRow = document.createElement('div');
                        optionRow.classList.add('option-row');
                        optionRow.setAttribute('row-num', '0');
                        optionRow.setAttribute('extra-options', option.options.length >= 1 ? 'true' : 'false');
                        if(sides.select) optionRow.setAttribute('extra-options', 'isExtraOptions');
                        card.append(optionRow);
                        if(sides.select){
                            optionRow.addEventListener('click', clickMenuItemSelect);
                        }else{
                            optionRow.addEventListener('click', clickMenuItem);
                        }
                        optionRow.insertAdjacentHTML('beforeend', `<p>${option.type}</p>
                        ${option.price ? `<p price-type="${typeof option.price === 'string' ? 'string' : 'number'}">${typeof option.price === 'string' ? '£'+(menuScore.price + Number(option.price.replace('+',''))) : '£'+option.price.toFixed(2)}</p>` : ''}`);
                    });
                }else{
                    card.insertAdjacentHTML('beforeend', `<div class="counter-container">
                    <div class="minus no-select">—</div>
                    <div>1</div>
                    <div class="plus">+</div>
                    </div>`);
                    card.querySelector('.minus').addEventListener('click', cardMinusClick);
                    card.querySelector('.plus').addEventListener('click', cardPlusClick);
                }
                const priceBtn = document.createElement('div');
                priceBtn.addEventListener('click', submitOrder);
                priceBtn.classList.add('price-btn');
                if(sides) priceBtn.classList.add('no-select');
                priceBtn.innerHTML = `<p>Add to order</p><p>£${menuScore.price.toFixed(2)}</p>`
                card.append(priceBtn);

                overlay.prepend(card);
                document.body.prepend(overlay);
                document.body.style.overflow = 'hidden';
            });
        }
    });
}
menuFunc();

export function clickMenuItem(e){
    let index = Number(e.target.getAttribute('row-num'));
    let rowEle = e.target;
    if(!e.target.classList.contains('option-row')){
        index = Number(e.target.parentNode.getAttribute('row-num'));
        rowEle = e.target.parentNode;
    }
    let extraOptions = rowEle.getAttribute('extra-options');
    if(extraOptions === 'true'){
        if(rowEle.nextSibling.getAttribute('extra-title') !== 'true'){
            let options = menuItem.sides[index].option.find(opt => opt.type === rowEle.getElementsByTagName('p')[0].innerHTML);
            const subOptionsTitle = document.createElement('p');
            subOptionsTitle.classList.add('sides-title');
            subOptionsTitle.setAttribute('extra-title', 'true');
            subOptionsTitle.innerHTML = options.type;
            rowEle.insertAdjacentElement('afterend', subOptionsTitle);
            const optionRowContainer = document.createElement('div');
            options.options.forEach(opt => {
                const optionRow = document.createElement('div');
                optionRow.classList.add('option-row');
                optionRow.setAttribute('extra-options-row', 'true');
                optionRow.addEventListener('click', clickOptionRow);
                optionRowContainer.append(optionRow);
                optionRow.insertAdjacentHTML('beforeend', `<p class="sub-options-type">${opt.type}</p>
                ${opt.price ? `<div class="sub-options-price"><p class="row-price">${'£'+opt.price.toFixed(2)}</p>` : ''}</div>`);
            });
            subOptionsTitle.insertAdjacentElement('afterend',optionRowContainer);
        }
    }
    let sameRowEle = rowEle.parentNode.querySelectorAll(`.option-row[row-num="${index}"]`);
    sameRowEle = Array.prototype.slice.call(sameRowEle);
    let rowIndex = sameRowEle.indexOf(rowEle);
    const card = document.getElementById('card');
    const priceBtn = card.childNodes[card.childNodes.length - 1];
    const sides = menuItem.sides[index + 1];
    //Clicked on price
    let checkIfNumberPriceRow = null;
    const numberElement = card.querySelectorAll('.counter-container div')[1];
    let numberOfItems = numberElement ? Number(numberElement.innerHTML) : 1;
    sameRowEle.forEach((sameRow, index) => {
        //Remove sub options
        if(sameRow.getAttribute('extra-options') === 'true' && sameRow.nextSibling.getAttribute('extra-title') === 'true' && index !== rowIndex){
            sameRow.nextSibling.remove();
            sameRow.nextSibling.remove();
        }
        if(!sameRow.getElementsByTagName('p')[1]) return;
        if(sameRow.getElementsByTagName('p')[1].getAttribute('price-type') === 'number' && sameRow.classList.contains('highlighted')){
            checkIfNumberPriceRow = index;
        }
    });
    if(checkIfNumberPriceRow !== null){
        let oldPrice = Number(priceBtn.getElementsByTagName('p')[1].innerHTML.replace('£',''));
        let price = sameRowEle[checkIfNumberPriceRow].getElementsByTagName('p')[1];
        price = Number(price.innerHTML.replace('£',''));
        priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(oldPrice - (price * numberOfItems)).toFixed(2);
    }
    if(rowEle.getElementsByTagName('p').length > 1){
        let price = rowEle.getElementsByTagName('p')[1];
        let priceType = price.getAttribute('price-type');
        price = Number(price.innerHTML.replace('£',''));
        if(priceType === 'string'){
            priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(price * numberOfItems).toFixed(2);
        }else if(priceType === 'number'){
            let oldPrice = Number(priceBtn.getElementsByTagName('p')[1].innerHTML.replace('£',''));
            priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(oldPrice + (price * numberOfItems)).toFixed(2);
        }
    }
    addAndRemoveClasses('highlighted', '', rowEle);
    addAndRemoveClasses('', 'highlighted', [...sameRowEle.slice(0, rowIndex), ...sameRowEle.slice(rowIndex + 1)]);
    if(sides){
        if(rowEle.parentNode.querySelectorAll(`.option-row[row-num="${index + 1}"]`).length > 1) return;
        priceBtn.insertAdjacentHTML('beforebegin', `<p class="sides-title">Choose One</p>`);
        sides.option.forEach(option => {
            const optionRow = document.createElement('div');
            optionRow.classList.add('option-row');
            optionRow.setAttribute('row-num', `${index + 1}`);
            optionRow.setAttribute('extra-options', option.options.length >= 1 ? 'true' : 'false');
            priceBtn.insertAdjacentElement('beforebegin', optionRow);
            optionRow.addEventListener('click', clickMenuItem);
            optionRow.insertAdjacentHTML('beforeend', `<p>${option.type}</p>
            ${option.price ? `<p price-type="${typeof option.price === 'string' ? 'string' : 'number'}" extra-options="${option.options ? 'true' : 'false'}">${typeof option.price === 'string' ? '£'+(menuScore.price + Number(option.price.replace('+',''))) : '£'+option.price.toFixed(2)}</p>` : ''}`);
        });
    }else if(!card.querySelector('.counter-container')){
        priceBtn.classList.remove('no-select');
        priceBtn.insertAdjacentHTML('beforebegin', `<div class="counter-container">
        <div class="minus no-select">—</div>
        <div>1</div>
        <div class="plus">+</div>
        </div>`);
        card.querySelector('.minus').addEventListener('click', cardMinusClick);
        card.querySelector('.plus').addEventListener('click', cardPlusClick);
    }
};

export function cardMinusClick(e){
    if(e.target.classList.contains('no-select')) return;
    let element = e.target;
    let numberElement = element.nextSibling.nextSibling;
    let newNumber = Number(numberElement.innerHTML) - 1;
    numberElement.innerHTML = newNumber;
    if(newNumber <= 1){
        addAndRemoveClasses('no-select', '', element);
    }
    let menuScoreIndex = Number(document.getElementById('card').getAttribute('menu-score-index'));
    const menuScore = menuScores[menuScoreIndex];
    let extraPrice = 0;
    let extraOptionsPrice = 0;
    let isStringType = {is: false, ele: null};
    document.getElementById('card').querySelectorAll('.option-row').forEach(row => {
        if(!row.getElementsByTagName('p')[1]) return;
        if(row.getAttribute('extra-options-row') === 'true'){
            if(!row.querySelector('.options-counter')) return;
            let optionsCounter = row.querySelector('.options-counter');
            extraOptionsPrice += Number(row.getElementsByTagName('p')[1].innerHTML.replace('£', '')) * Number(optionsCounter.innerHTML.replace('£', ''));
        }
        if(!row.classList.contains('highlighted')) return;
        if(row.getElementsByTagName('p')[1].getAttribute('price-type') === 'string'){
            isStringType.is = true;
            isStringType.ele = Number(row.getElementsByTagName('p')[1].innerHTML.replace('£', ''));
            return;
        }
        extraPrice += Number(row.getElementsByTagName('p')[1].innerHTML.replace('£', ''));
    });
    const priceBtn = e.target.parentNode.nextSibling;
    if(isStringType.is){
        priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(isStringType.ele * newNumber).toFixed(2);
        return;
    }
    priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(((menuScore.price + extraPrice) * (newNumber)) + extraOptionsPrice).toFixed(2);
};
export function cardPlusClick(e){
    let numberElement = e.target.previousSibling.previousSibling;
    let minusElement = e.target.parentNode.querySelector('.minus');
    let newNumber = Number(numberElement.innerHTML) + 1;
    if(newNumber > 1) addAndRemoveClasses('', 'no-select', minusElement);
    numberElement.innerHTML = newNumber;
    let menuScoreIndex = Number(document.getElementById('card').getAttribute('menu-score-index'));
    const menuScore = menuScores[menuScoreIndex];
    let extraPrice = 0;
    let extraOptionsPrice = 0;
    let isStringType = {is: false, ele: null};
    document.getElementById('card').querySelectorAll('.option-row').forEach(row => {
        if(!row.getElementsByTagName('p')[1]) return;
        if(row.getAttribute('extra-options-row') === 'true'){
            if(!row.querySelector('.options-counter')) return;
            let optionsCounter = row.querySelector('.options-counter');
            extraOptionsPrice += Number(row.getElementsByTagName('p')[1].innerHTML.replace('£', '')) * Number(optionsCounter.innerHTML.replace('£', ''));
        }
        if(!row.classList.contains('highlighted')) return;
        if(row.getElementsByTagName('p')[1].getAttribute('price-type') === 'string'){
            isStringType.is = true;
            isStringType.ele = Number(row.getElementsByTagName('p')[1].innerHTML.replace('£', ''));
            return;
        }
        extraPrice += Number(row.getElementsByTagName('p')[1].innerHTML.replace('£', ''));
    });
    const priceBtn = e.target.parentNode.nextSibling;
    if(isStringType.is){
        priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(isStringType.ele * newNumber).toFixed(2);
        return;
    }
    priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(((menuScore.price + extraPrice) * (newNumber)) + extraOptionsPrice).toFixed(2);
};

export function clickOptionRow(e){
    if(e.target.classList.contains('row-price')) return;
    let targetTag = e.target;
    if(e.target.tagName === 'path' || e.target.tagName === 'g'){
        while(targetTag.tagName !== 'svg'){
            targetTag = targetTag.parentNode;
        }
    }
    //Clicked delete icon
    if(targetTag.tagName === 'svg'){
        const optionRow = targetTag.parentNode.parentNode;
        const optionsCounter = optionRow.querySelector('.options-counter');
        if(optionsCounter.innerHTML === 'Max 10'){
            optionsCounter.innerHTML = '9';
        }else if(Number(optionsCounter.innerHTML) < 2){
            optionsCounter.remove();
            targetTag.remove();
        }else{
            optionsCounter.innerHTML = Number(optionsCounter.innerHTML) - 1;
        }
        const price = Number(optionRow.getElementsByTagName('p')[1].innerHTML.replace('£',''));
        if(price){
            const priceBtn = document.getElementById('card').childNodes[card.childNodes.length - 1];
            let oldPrice = Number(priceBtn.getElementsByTagName('p')[1].innerHTML.replace('£',''));
            priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(oldPrice - price).toFixed(2);
        }
        return;
    }
    if(e.target.classList.contains('sub-options-price')) return;
    let optionRow = e.target;
    if(!e.target.classList.contains('option-row')){
        optionRow = e.target.parentNode;
    }
    if(optionRow.getElementsByTagName('p')[0].getElementsByTagName('span').length < 1){
        optionRow.getElementsByTagName('p')[0].insertAdjacentHTML('afterbegin', '<span class="options-counter">0</span>');
        if(optionRow.getElementsByTagName('p')[1]){
            optionRow.querySelector('.sub-options-price').insertAdjacentHTML('beforeend', trashSVG);
        }else{
            optionRow.insertAdjacentHTML('beforeend', trashSVG);
        }
    }
    const optionsCounter = optionRow.querySelector('.options-counter');
    if(optionsCounter.innerHTML === 'Max 10') return;
    if((Number(optionsCounter.innerHTML) + 1) > 9){
        optionsCounter.innerHTML = 'Max 10';
    }else{
        optionsCounter.innerHTML = Number(optionsCounter.innerHTML) + 1;
    }
    if(optionRow.getElementsByTagName('p')[1]){
        const card = document.getElementById('card');
        const priceBtn = card.childNodes[card.childNodes.length - 1];
        let oldPrice = Number(priceBtn.getElementsByTagName('p')[1].innerHTML.replace('£',''));
        let newPrice = Number(optionRow.getElementsByTagName('p')[1].innerHTML.replace('£', ''));
        priceBtn.getElementsByTagName('p')[1].innerHTML = '£'+(oldPrice+newPrice).toFixed(2);
    }
}

export function clickMenuItemSelect(e){
    const card = document.getElementById('card');
    let targetTag = e.target;
    const priceBtn = card.childNodes[card.childNodes.length - 1];
    if(e.target.tagName === 'path' || e.target.tagName === 'g'){
        while(targetTag.tagName !== 'svg'){
            targetTag = targetTag.parentNode;
        }
    }
    //Clicked delete icon
    if(targetTag.tagName === 'svg'){
        priceBtn.classList.add('no-select');
        const optionRow = targetTag.parentNode;
        const optionsCounter = optionRow.querySelector('.options-counter');
        if(Number(optionsCounter.innerHTML) < 2){
            optionsCounter.remove();
            targetTag.remove();
        }else{
            optionsCounter.innerHTML = Number(optionsCounter.innerHTML) - 1;
        }
        return;
    }
    let selectNum = menuItem.sides[0].select;
    let numSelected = 0;
    card.querySelectorAll('.options-counter').forEach(oc => {
        numSelected += Number(oc.innerHTML);
    });
    if(numSelected >= selectNum){
        return;
    }
    let optionRow = e.target;
    if(!e.target.classList.contains('option-row')){
        optionRow = e.target.parentNode;
    }
    if(optionRow.getElementsByTagName('p')[0].getElementsByTagName('span').length < 1){
        optionRow.getElementsByTagName('p')[0].insertAdjacentHTML('afterbegin', '<span class="options-counter">0</span>');
        optionRow.insertAdjacentHTML('beforeend', trashSVG2);
    }
    const optionsCounter = optionRow.querySelector('.options-counter');
    optionsCounter.innerHTML = Number(optionsCounter.innerHTML) + 1;
    if(numSelected + 1 >= selectNum){
        priceBtn.classList.remove('no-select');
        return;
    }
};


//URL FRAGMENT
const loadURLHash = window.location.hash;
if(loadURLHash === '#Home') ele.openSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#About') ele.aboutSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#Menu') ele.menuSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#Location') ele.locationSection.scrollIntoView({behavior: 'smooth'});
if(loadURLHash === '#Contact') ele.contactSection.scrollIntoView({behavior: 'smooth'});