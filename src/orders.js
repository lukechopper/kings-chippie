import '../styles/orders.scss';
import axios from 'axios';

function renderEverything(){
    axios.get('/fetch-orders').then(res => {
        document.body.innerHTML = '';
        const data = res.data.data;
        data.forEach(item => {
            let options = '';
            item.orders.forEach(order => {
                options += `<div class="flex-row"><strong>${order.amount}</strong>
                <div class="flex-col">
                <div>${order.title}</div>
                <div class="options">${order.options}</div>
                </div>
            </div>`
            });
            document.body.insertAdjacentHTML('beforeend', `<div class="order">
            <div class="flex-row center-row"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="delete-icon"
                width="24" height="24"
                viewBox="0 0 172 172"
                style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ff1a00"><path d="M71.66667,14.33333l-7.16667,7.16667h-28.66667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667c0,3.956 3.21067,7.16667 7.16667,7.16667h100.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667h-28.66667l-7.16667,-7.16667zM35.83333,50.16667v93.16667c0,7.88333 6.45,14.33333 14.33333,14.33333h71.66667c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-93.16667zM67.43945,74.63411c1.82929,0 3.65914,0.6917 5.05306,2.08561l13.50749,13.50749l13.50749,-13.50749c2.78783,-2.78783 7.31828,-2.78783 10.10612,0c2.78783,2.78783 2.78783,7.31828 0,10.10612l-13.50749,13.50749l13.50749,13.50749c2.78783,2.78783 2.78783,7.31828 0,10.10612c-2.78783,2.78783 -7.31828,2.78783 -10.10612,0l-13.50749,-13.50749l-13.50749,13.50749c-2.78783,2.78783 -7.31828,2.78783 -10.10612,0c-2.78783,-2.78783 -2.78783,-7.31828 0,-10.10612l13.50749,-13.50749l-13.50749,-13.50749c-2.78783,-2.78783 -2.78783,-7.31828 0,-10.10612c1.39392,-1.39392 3.22377,-2.08561 5.05306,-2.08561z"></path></g></g></svg><div class="order-id">Order Id: ${item.orderId}</div></div>
                <div class="flex-row"><strong>Price: </strong><div>${item.price}</div></div>
            <div class="flex-row"><div><strong>Name: </strong>${item.name}</div><div><strong>Email: </strong>${item.email}</div></div>
            ${options}
        </div>`)
        });

        const deleteIcons = document.querySelectorAll('.delete-icon');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', deleteOrder);
        });
        setTimeout(searchForNewOrders, 60000);
    }).catch(err => {
        console.log(err);
    });
}

renderEverything();


function deleteOrder(e){
    let deleteIcon = e.target;
    if(deleteIcon.tagName === 'g' || deleteIcon.tagName === 'path'){
        while(!deleteIcon.classList.contains('delete-icon')){
            deleteIcon = deleteIcon.parentNode;
        }
    }
    const orderNode = deleteIcon.parentNode.parentNode;
    let orderId = orderNode.querySelector('.order-id').innerHTML;
    orderId = orderId.match(/\d/g).join('');
    axios.post('/delete-order', {orderId}).then(res => {
        renderEverything();
    }).catch(err => {
        console.log(err);
    });
}

function searchForNewOrders(){
    renderEverything();
    setTimeout(searchForNewOrders, 60000);
}