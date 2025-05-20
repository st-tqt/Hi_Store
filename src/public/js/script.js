document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = window.location.pathname; // Lấy đường dẫn URL hiện tại
    const navLinks = document.querySelectorAll(".navbar li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === '/' + currentLocation.split("/").pop()) {
            navLinks.forEach(nav => nav.classList.remove("active")); // Xóa tất cả 'active'
            link.classList.add("active"); // Thêm 'active' cho mục phù hợp
        }
    });
});

// product detail
// function updateQuantity(change) {
//       let input = document.querySelector('.quantity-selector input');
//       let value = parseInt(input.value);
//       value = Math.max(1, value + change);
//       input.value = value;
//     }

// Hàm định dạng giá (ví dụ: 6500000 -> 6.500.000đ)
function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

// Hàm chuyển chuỗi giá thành số (ví dụ: 6.500.000đ -> 6500000)
function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/[\.đ]/g, ''));
}

function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    cartItems.forEach(item => {
        const price = parsePrice(item.querySelector('.price').textContent);
        const quantity = parseInt(item.querySelector('.quantity-selector input').value);
        total += price * quantity;
    });
    document.querySelector('.cart-footer .total-amount').textContent = formatPrice(total);
}

// Hàm cập nhật số lượng và giá
function updateQuantity(change, button) {
    // Tìm phần tử cart-item chứa nút được nhấn
    const cartItem = button.closest('.cart-item');
    const input = cartItem.querySelector('.quantity-selector input');
    const priceElement = cartItem.querySelector('.price');
    const totalElement = cartItem.querySelector('.total-amount');

    // Lấy số lượng hiện tại và cập nhật
    let value = parseInt(input.value);
    value = Math.max(1, value + change); // Không cho phép số lượng nhỏ hơn 1
    input.value = value;

    // Tính thành tiền (đơn giá × số lượng)
    const price = parsePrice(priceElement.textContent);
    const total = price * value;

    // Cập nhật thành tiền cho sản phẩm
    totalElement.textContent = formatPrice(total);

    // Cập nhật tổng tiền giỏ hàng
    updateCartTotal();
}