import {prepareOverlay, unprepareOverlay, cardMinusClick, cardPlusClick, clickMenuItemSelect, clickMenuItem, clickOptionRow} from './app';
import * as ele from './partials/elements';
import {escapeHtml} from './partials/utils';
import {trashSVG3} from './partials/utils.js';

let orderOverlayStore = [];
let orderOverlayInformationStore = [];

export function submitOrder(e){
    let orderAlreadyExists = false;
    let whereOrderAlreadyExists = 0;
    const currentOverlay = document.getElementById('overlay');
    const menuTitle = currentOverlay.querySelector('#card h1').innerHTML;
    let overlayOptions = [];
    let overlayOptionsJoined = null;
    let overlayInformation = {};
    currentOverlay.querySelectorAll('#card .option-row').forEach(opt => {
        if(opt.getAttribute('extra-options-row') === 'true' || opt.getAttribute('extra-options') === 'isExtraOptions'){
            if(!opt.querySelector('.options-counter')) return;
            overlayOptions.push(escapeHtml(opt.querySelector('.options-counter').nextSibling.data));
            return;
        }
        if(!opt.classList.contains('highlighted')) return;
        overlayOptions.push(opt.getElementsByTagName('p')[0].innerHTML);
    });
    overlayOptionsJoined = overlayOptions.join(', ');
    //Find of order already exists
    ele.orderContainer.querySelectorAll('.row').forEach(row => {
        if(menuTitle === row.querySelector('.title-options').getElementsByTagName('p')[0].innerHTML){
            if(!row.querySelector('.options') || row.getAttribute('isExtraOptions') === 'true'){
                orderAlreadyExists = true;
                whereOrderAlreadyExists = Number(row.getAttribute('row-index'));
                return;
            }
            if(overlayOptionsJoined === row.querySelector('.options').innerHTML){
                orderAlreadyExists = true;
                whereOrderAlreadyExists = Number(row.getAttribute('row-index'));
            }
        }
    });
    let target = e.target;
    if(target.tagName === 'P'){
        target = target.parentNode;
    }
    if(target.classList.contains('no-select')) return;
    if(orderAlreadyExists){
        orderOverlayStore[whereOrderAlreadyExists] = currentOverlay;
    }else{
        orderOverlayStore.push(currentOverlay);
    }
    currentOverlay.remove();
    document.body.style.overflow = '';
    unprepareOverlay();
    overlayInformation.title = menuTitle;
    overlayInformation.options = overlayOptionsJoined;
    overlayInformation.price = currentOverlay.querySelector('#card .price-btn').getElementsByTagName('p')[1].innerHTML;
    let amountNum = currentOverlay.querySelector('#card .counter-container .minus');
    if(amountNum) amountNum = Number(amountNum.nextElementSibling.innerHTML);
    overlayInformation.amount = amountNum ? amountNum : null;
    if(orderAlreadyExists){
        orderOverlayInformationStore[whereOrderAlreadyExists] = overlayInformation;
    }else{
        orderOverlayInformationStore.push(overlayInformation);
    }
    
    renderOutOverlayInformation();
}

function renderOutOverlayInformation(){
    let firstTime = false;
    //First time the method has been called
    if(ele.orderContainer.querySelector('.no-orders')){
        firstTime = true;
        ele.orderContainer.querySelector('.no-orders').remove();
        ele.orderContainer.classList.remove('flex-mode');
        ele.orderContainer.childNodes.forEach(node => {
            if(!(node instanceof HTMLElement)) return;
            node.classList.remove('hidden');
            if(node.classList.contains('bottom-order')) node.childNodes.forEach(cn => {if(cn instanceof HTMLElement) cn.classList.remove('hidden')});
        });
    }
    const rows = ele.orderContainer.querySelectorAll('.row');
    //Everything has been removed
    if(rows.length < 1 && !firstTime){
        ele.orderContainer.childNodes.forEach(node => {
            if(!(node instanceof HTMLElement)) return;
            node.classList.add('hidden');
            if(node.classList.contains('bottom-order')) node.childNodes.forEach(cn => {if(cn instanceof HTMLElement) cn.classList.add('hidden')});
        });
        ele.orderContainer.insertAdjacentHTML('afterbegin', `<h1 class="no-orders">No Orders</h1>`);
        ele.orderContainer.classList.add('flex-mode');
        return;
    }
    //Remove Everything
    rows.forEach(row => row.remove());
    let totalPrice = 0;
    orderOverlayInformationStore.forEach((data, index) => {
        const rowEle = document.createElement('div');
        rowEle.classList.add('row');
        rowEle.setAttribute('row-index', index);
        rowEle.insertAdjacentHTML('beforeend', `<div class="num-and-name">
        ${data.amount ? `<div class="amount">${data.amount}</div>` : ''}<div class="title-options"><p>${data.title}</p>${data.options ? `<p class="options">${data.options}</p>` : ''}</div></div>
        <div class="price-and-delete"><p class="price">${data.price}</p>${trashSVG3}</div>`);
        ele.orderContainer.querySelector('#total').insertAdjacentElement('beforebegin', rowEle);
        rowEle.addEventListener('click', clickRowEle);
        totalPrice += Number(data.price.replace('£', ''));
    });
    const totalPriceEle = document.getElementById('total-price');
    totalPriceEle.innerHTML = '£'+totalPrice.toFixed(2);
};

function clickRowEle(e){
    let rowEle = e.target;
    while(!rowEle.classList.contains('row')){
        rowEle = rowEle.parentNode;
    }
    const rowIndex = Number(rowEle.getAttribute('row-index'));
    if(e.target.tagName === 'svg' || e.target.tagName === 'g' || e.target.tagName === 'path'){
        orderOverlayStore.splice(rowIndex, 1);
        orderOverlayInformationStore.splice(rowIndex, 1);
        rowEle.remove();
        renderOutOverlayInformation();
        return;
    }
    //Clicked on main section
    let oldOverlayEle = orderOverlayStore[rowIndex];
    oldOverlayEle = oldOverlayEle.cloneNode(true);
    //Re-Add Event Listeners
    if(oldOverlayEle.querySelector('#card .minus')) oldOverlayEle.querySelector('#card .minus').addEventListener('click', cardMinusClick);
    if(oldOverlayEle.querySelector('#card .plus')) oldOverlayEle.querySelector('#card .plus').addEventListener('click', cardPlusClick);
    oldOverlayEle.onclick = (e) => {
        if(e.target.id !== 'overlay') return;
        e.target.remove();
        document.body.style.overflow = '';
        unprepareOverlay();
    };
    oldOverlayEle.querySelector('#card .cross').onclick = (e) => {
        document.body.style.overflow = '';
        oldOverlayEle.remove();
        unprepareOverlay();
    };
    oldOverlayEle.querySelectorAll('#card .option-row').forEach(row => {
        if(row.getAttribute('extra-options') === 'isExtraOptions'){
            row.addEventListener('click', clickMenuItemSelect);
            return;
        }
        if(row.getAttribute('extra-options-row') === 'true'){
            row.addEventListener('click', clickOptionRow);
            return;
        }
        row.addEventListener('click', clickMenuItem);
    });
    oldOverlayEle.querySelector('#card .price-btn').addEventListener('click', submitOrder);
    oldOverlayEle.setAttribute('row-index', rowIndex);
    oldOverlayEle.querySelector('#card .price-btn').getElementsByTagName('p')[0].innerHTML = 'Ok';
    document.body.style.overflow = 'hidden';
    prepareOverlay();
    document.body.prepend(oldOverlayEle);
}

function regenerateOverlayInformation(overlay, rowIndex){
    let oldInformation = orderOverlayInformationStore[rowIndex];
    let newInformation = {};
    let overlayOptions = [];
    let overlayOptionsJoined = null;
    overlay.querySelectorAll('#card .option-row').forEach(opt => {
        if(opt.getAttribute('extra-options-row') === 'true' || opt.getAttribute('extra-options') === 'isExtraOptions'){
            if(!opt.querySelector('.options-counter')) return;
            overlayOptions.push(opt.querySelector('.options-counter').nextSibling.data);
            return;
        }
        if(!opt.classList.contains('highlighted')) return;
        overlayOptions.push(opt.getElementsByTagName('p')[0].innerHTML);
    });
    overlayOptionsJoined = overlayOptions.join(', ');
    newInformation.options = overlayOptionsJoined;
    let amountNum = overlay.querySelector('#card .counter-container .minus');
    if(amountNum) amountNum = Number(amountNum.nextElementSibling.innerHTML);
    newInformation.amount = amountNum ? amountNum : null;
    let matchOrNot = true;
    for(const key in newInformation){
        if(oldInformation[key] !== newInformation[key]){
            matchOrNot = false;
        }
    }
    return matchOrNot;
}

export function checkIfOverlayInStore(){
    const overlay = document.getElementById('overlay');
    let rowIndex = overlay.getAttribute('row-index');
    if(!rowIndex) return;
    rowIndex = Number(rowIndex);
    const priceBtnText = overlay.querySelector('.price-btn').getElementsByTagName('p')[0];
    if(!regenerateOverlayInformation(overlay, rowIndex)){
        priceBtnText.innerHTML = 'Add to order';
    }else{
        priceBtnText.innerHTML = 'Ok';
    }
}