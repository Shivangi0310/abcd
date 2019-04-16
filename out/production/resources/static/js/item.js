if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
var total_points=0;

function ready() {
    // console.log("js is fired")
    let removeCartItemButtons = document.getElementsByClassName('remove')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('item_btn')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

    fetchPoints()
    console.log("total"+total_points)
     let data1= document.getElementById('fetchpt').innerText;
    console.log(data1);

    if (total_points > data1)
        alert("Insufficient balance for purchase!")

    else if(total_points==0)
        alert('Please select items to redeem points')
    else
        alert('Thank you for your purchase')
1
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement

    let title = shopItem.getElementsByClassName('product')[0].innerText
    let price = shopItem.getElementsByClassName('item_btn')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('item-image')[0].src

    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-name')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

    let cartRowContents =
        `
        <div class="cart-item-title cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-name">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-item-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1"  min="1" max="5">
            <button class="remove" type="button">x</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total =0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value

        total = total + (price * quantity)
        total_points=total
    }
    total = Math.round(total * 100) / 100
    console.log("ajajab"+total_points)
    buyItemData.totalPointsRedeemed = total_points;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

var point;

let buyItemData = {
    "itemList" :[],
    "totalPointsRedeemed":0
}

function buyItems() {

}

function fetchPoints() {
    point=0;
    // console.log("fetch"+point);
    axios.get("/api/fetchPoints").then(res => {
      point+=(res.data.points);
      console.log("fetcg ophd"+ point);
    }).then(()=>{
      $("#fetchpt").html(point);
    })

}
