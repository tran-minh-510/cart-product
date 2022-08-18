var tbodyList = document.querySelector(".list-product tbody");
var cartProduct = document.querySelector(".cart-product");
var carts = [];

var listProduct = [
    {
        name: "Sản phẩm 1",
        price: 1000,
    },
    {
        name: "Sản phẩm 2",
        price: 2000,
    },
    {
        name: "Sản phẩm 3",
        price: 3000,
    },
    {
        name: "Sản phẩm 4",
        price: 4000,
    },
];

function noProduct() {
    cartProduct.innerHTML = `<p>Giỏ hàng chưa có sản phẩm</p>`;
}

noProduct();

function renderListProduct(listProduct) {
    var renderListProduct = listProduct
        .map(function (product, index) {
            return `<tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
        <input value="1" min="0" type="number">
        <button data-btnadd=${index}>Thêm vào giỏ hàng</button>
        </td>
    </tr>`;
        })
        .join("");
    tbodyList.innerHTML = renderListProduct;
}

renderListProduct(listProduct);

var btnsAddProduct = document.querySelectorAll(".list-product button");

btnsAddProduct.forEach(function (btnAdd) {
    btnAdd.addEventListener("click", function () {
        var product = {
            name: listProduct[this.dataset.btnadd].name,
            price: listProduct[this.dataset.btnadd].price,
            amount:
                this.previousElementSibling.value > 0
                    ? this.previousElementSibling.value
                    : alert("Số lượng sản phẩm không đúng") = undefined,
            total:
                listProduct[this.dataset.btnadd].price *
                this.previousElementSibling.value,
        };

        var checkDuplicate = carts.some(function (item) {
            return item.name === product.name;
        });

        if (product.amount !== undefined && !checkDuplicate) {
            carts.push(product);
            renderCart();
            eventProduct();
        } else {
            var handleDuplicate = carts.find(function (item) {
                return item.name === product.name;
            });
            handleDuplicate.amount =
                Number(handleDuplicate.amount) + Number(product.amount);
            handleDuplicate.total = handleDuplicate.total += product.total;
            renderCart();
            eventProduct();
        }
        localStorage.setItem('data', JSON.stringify(carts))
        carts = JSON.parse(localStorage.getItem('data'))
        renderCart()
    });
});

function totalAmount() {
    var totalAmount = 0;
    carts.forEach(function (item) {
        totalAmount += Number(item.amount);
    });
    return totalAmount;
}

function totalPrice() {
    var totalPrice = 0;
    carts.forEach(function (item) {
        totalPrice += item.total;
    });
    return totalPrice;
}

function renderCart() {
    var listCart = carts
        .map(function (cart, index) {
            return `<tr>
        <td>${index + 1}</td>
        <td>${cart.name}</td>
        <td>${cart.price}</td>
        <td><input value=${cart.amount} type=number></input></td>
        <td>${cart.total}</td>
        <td><button data-btnremove=${index} class="remove">Xóa</button></td>
    </tr>`;
        })
        .join("");
    var tableCart = `<table cellpadding="0" cellspacing="0" width="100%" border="1" id="product_table">
    <thead>
        <tr>
        <th style="width: 10%;">STT</th>
        <th>Tên sản phẩm</th>
        <th style="width: 20%;">Giá</th>
        <th style="width: 10%;">Số lượng</th>
        <th style="width: 20%;">Thành tiền</th>
        <th style="width: 10%;">Xóa</th>
        </tr>
    </thead>
    <tbody>
    ${listCart}
    <tr>
    <td colspan="3">Tổng</td>
    <td>${totalAmount()}</td>
    <td colspan="2">${totalPrice()}</td>
    </tr>
    </tbody>
</table>
<hr>
<button class="remove-all">Xóa giỏ hàng</button>;
<button class="update">Cập nhật giỏ hàng</button>`;

    cartProduct.innerHTML = tableCart;
}

function eventProduct() {
    cartProduct.onclick = function (e) {
        if (e.target.closest(".remove")) {
            if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                carts.splice(e.target.dataset.btnremove, 1);
                renderCart();
                eventProduct();
                if (carts.length === 0) {
                    noProduct();
                }
                localStorage.setItem('data', JSON.stringify(carts))
            }
        }
        if (e.target.closest(".remove-all")) {
            if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
                carts = [];
                noProduct();
                localStorage.setItem('data', JSON.stringify(carts))
            }
        }
        if (e.target.closest(".update")) {
            alert('Cập nhật giỏ hàng thành công')
            newProduct()
        }
    };
}

function newProduct() {
    var allInputCart = document.querySelectorAll('.cart-product input')
    carts = carts.map(function (item, index) {
        return {
            name: item.name,
            price: item.price,
            amount: allInputCart[index].value,
            total:
                item.price *
                allInputCart[index].value,
        }
    })

    carts = carts.filter(function (item) {
        return item.amount > 0
    })
    localStorage.setItem('data', JSON.stringify(carts))
    renderCart()
    if (carts.length === 0) {
        noProduct();
    }
}

function saveProduct() {
    carts = JSON.parse(localStorage.getItem('data'))
    renderCart()
    eventProduct()
    if (carts.length === 0) {
        noProduct();
    }
}

saveProduct()
