import {prepareOverlay, unprepareOverlay, cardMinusClick, cardPlusClick, clickMenuItemSelect, clickMenuItem, clickOptionRow, setOverlayAlreadyOpen} from './app';
import * as ele from './partials/elements';
import {escapeHtml} from './partials/utils';
import {trashSVG3} from './partials/utils.js';
import axios from 'axios';

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
            let counterNum = opt.querySelector('.options-counter').innerHTML;
            if(counterNum === 'Max 10') counterNum = '<span remove-this="true">10</span>';
            else counterNum = '<span remove-this="true">'+counterNum+'</span>';
            overlayOptions.push(counterNum + ' ' + escapeHtml(opt.querySelector('.options-counter').nextSibling.data));
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
            if(overlayOptionsJoined.replace(/<span remove-this="true">\d+<\/span>/g, '') === row.querySelector('.options').innerHTML.replace(/<span remove-this="true">\d+<\/span>/g, '')){
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
    setOverlayAlreadyOpen(false);
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
            let counterNum = opt.querySelector('.options-counter').innerHTML;
            if(counterNum === 'Max 10') counterNum = '10';
            overlayOptions.push(counterNum + ' ' + escapeHtml(opt.querySelector('.options-counter').nextSibling.data));
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
};

const stripe = Stripe('pk_test_51JIxRpG3l6QD3bv6m4RrOIKcF24zLC0YzirUmVitFvGCN7NxQcBycUfgBM74tgKwgRJPnAeuol5RISrQ5pJ974mR0047ALGT9t');
const elements = stripe.elements();

let loadingPayment = false;

ele.orderBtn.onclick = () => {
    if(loadingPayment) return;
    let totalPrice = 0;
    orderOverlayInformationStore.forEach(item => {
        totalPrice += Number(item.price.replace('£', ''));
    });
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.classList.add('overlay');
    prepareOverlay();
    ele.orderBtn.style.color = '#f5bb3d';
    overlay.innerHTML = `<form action="/charge" method="POST" class="payment" autocomplete="off">
    <div class="cross">x</div>
    <div class="form-total">Total: £${totalPrice.toFixed(2)}</div>
    <div id="card-error"></div>
    <input type="hidden" name="price" value="${totalPrice}" />
    <input type="text" name="name" placeholder="Fullname" />
    <input type="text" name="email" placeholder="Email" />
    <div id="card-element"></div>
    <button type="submit" class="submit-payment-btn">Submit Payment</button>
    </form>`;
    document.body.prepend(overlay);
    document.body.style.overflow = 'hidden';
    const cardStyle = {
        style:{
            base: {
                fontSize: '1.25rem'
            }
        }
    }
    const card = elements.create('card', cardStyle);
    const paymentForm = overlay.querySelector('.payment');
    const errorEl = paymentForm.querySelector('#card-error');
    const submitBtn = paymentForm.querySelector('.submit-payment-btn');
    card.mount('#card-element');
    let formData = {info: orderOverlayInformationStore, stripeToken: null, name: null, email: null, price: null};
    //Add token to form so that it gets sent along on POST request
    const stripeTokenHandler = token => {
        formData.stripeToken = token.id;

        axios.post('/charge', formData).then(function (response) {
            loadingPayment = false;
            window.location.href = "/charge";
          })
          .catch(function (error) {
            errorEl.textContent = 'Sorry. There was an error with your payment.';
            loadingPayment = false;
          });
    }
    paymentForm.addEventListener('submit', e => {
        loadingPayment = true;
        e.preventDefault();
        //Error checking
        const inputName = e.target.querySelector('input[name="name"]').value;
        const inputEmail = e.target.querySelector('input[name="email"]').value;

        if(!inputName){
            errorEl.classList.add('card-error');
            errorEl.textContent = 'You need to enter your name.';
            return;
        }
        if(!inputEmail){
            errorEl.classList.add('card-error');
            errorEl.textContent = 'You need to enter your email.';
            return;
        }
        const inputEmailMatch = inputEmail.match(/[\.@]/g) ? inputEmail.match(/[\.@]/g).length > 1 : null;
        if(!inputEmailMatch){
            errorEl.classList.add('card-error');
            errorEl.textContent = 'You need to enter a proper email.';
            return;
        }

        stripe.createToken(card).then(res => {
            if(res.error){
                errorEl.classList.add('card-error');
                errorEl.textContent = res.error.message;
                loadingPayment = false;
                return;
            }
            formData.name = inputName;
            formData.email = inputEmail;
            formData.price = e.target.querySelector('input[name="price"]').value;
            submitBtn.insertAdjacentHTML('beforebegin', '<div class="loader-small"></div>');
            submitBtn.remove();
            stripeTokenHandler(res.token);
        });
    });
    overlay.onclick = (e) => {
        if(loadingPayment) return;
        if(e.target.id !== 'overlay') return;
        e.target.remove();
        document.body.style.overflow = '';
        ele.orderBtn.style.color = '';
        unprepareOverlay();
        card.destroy();
    };
    overlay.querySelector('.cross').onclick = e => {
        if(loadingPayment) return;
        overlay.remove();
        document.body.style.overflow = '';
        ele.orderBtn.style.color = '';
        unprepareOverlay();
        card.destroy();
    }
};