const card = document.getElementsByClassName("card");
const btnAdd = document.getElementsByClassName("btn-warning");
const btnCart = document.querySelector(".btn-cart");
const cartList = document.querySelector(".shopping-cart-list");

const productList = document.querySelector(".myplist")

class Shopping{
    constructor(title,price,image){
        this.image = image;
        this.title = title;
        this.price = price;
    }
}

class UI{

    addToCart(shopping){
        const listItem = document.createElement("div");
        listItem.classList = "list-item";

        listItem.innerHTML = 
        `
        <div class="row align-items-center text-white">
            <div class="col-md-3">
                <img src="${shopping.image}" alt="product" class="img-fluid">
            </div>
            <div class="col-md-5">
                <div class="title">${shopping.title}</div>
            </div>
            <div class="col-md-2">
                <div class="price">${shopping.price}</div>
            </div>
            <div class="col-md-2">
                <button class="btn btn-delete">
                    <i class="fas fa-trash-alt text-light"></i>
                </button>
            </div>
        </div>
        `
        cartList.appendChild(listItem);
    }

    removeCart(){
        let btnRemove = document.getElementsByClassName("btn-delete");
        let self = this;
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", function(){
                this.parentElement.parentElement.parentElement.remove();
                self.cartCount();
            })
            
        }
    }

    cartCount(){
        let cartListItem = cartList.getElementsByClassName("list-item");
        let itemCount = document.getElementById("item-count");
        itemCount.innerHTML = cartListItem.length;
    }

    cartToggle(){
        btnCart.addEventListener("click", function(){
            cartList.classList.toggle("d-none");
        })
    }
    
}


var myData = fetch("./products-list.json")
.then(response => {
   return response.json();
})
.then(jsondata => {
    


    jsondata.forEach(element => {
          productList.innerHTML +=`
          <div class="col-lg-3 col-md-6 mb-3">
          <div class="card" > 
            <img src="${element.image}"  alt="product" class="card-img-top img-fluid">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <li data-category="${element.category}" style="display: none;" ></li>
              <p class="cart-text">
              ${element.description}</p>
              <div class="d-flex justify-content-between">
                <a class="btn btn-warning text-dark" href="#">Add to Cart</a>
                <span class="price badge rounded-pill bg-light text-dark d-flex align-items-center">${element.price} $</span>
              </div>
            </div>
          </div>
        </div> 
          `;
        });

        for (let i = 0; i < card.length; i++) {
            btnAdd[i].addEventListener("click", function(e){
                let title = card[i].getElementsByClassName("card-title")[0].textContent;
                let price = card[i].getElementsByClassName("price")[0].textContent;
                let image = card[i].getElementsByClassName("card-img-top")[0].src;
                btnAdd[i].classList.add("disabled");
                btnAdd[i].textContent = "In Card";
                let shopping = new Shopping(title,price,image);
                let ui = new UI();
        
                ui.addToCart(shopping);
                ui.removeCart()
                ui.cartCount();
        
        
                e.preventDefault();
            })
        }
        document.addEventListener("DOMContentLoaded", ()=> {
            let ui = new UI();
        
            ui.cartToggle();
        })

        const mySrc = document.getElementById('mysrc')
        mySrc.addEventListener('input',(e)=>{
            productList.innerHTML  = ``
            jsondata.forEach(element => {

                if (element.title.includes(e.srcElement.value)) {
                    productList.innerHTML +=`
                <div class="col-lg-3 col-md-6 mb-3">
                <div class="card" >
                  <img src="${element.image}"  alt="product" class="card-img-top img-fluid">
                  <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="cart-text">
                    ${element.description}</p>
                    <div class="d-flex justify-content-between">
                      <a class="btn btn-warning text-dark" href="#">Add to Cart</a>
                      <span class="price badge rounded-pill bg-light text-dark d-flex align-items-center">${element.price} $</span>
                    </div>
                  </div>
                </div>
              </div> 
                `; 
                }
               
              });
        })
    
});

for (let i = 0; i < card.length; i++) {
    btnAdd[i].addEventListener("click", function(e){
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        let price = card[i].getElementsByClassName("price")[0].textContent;
        let image = card[i].getElementsByClassName("card-img-top")[0].src;
        btnAdd[i].classList.add("disabled");
        btnAdd[i].textContent = "In Card";
        let shopping = new Shopping(title,price,image);
        let ui = new UI();

        ui.addToCart(shopping);
        ui.removeCart()
        ui.cartCount();


        e.preventDefault();
    })
}
document.addEventListener("DOMContentLoaded", ()=> {
    let ui = new UI();

    ui.cartToggle();
})