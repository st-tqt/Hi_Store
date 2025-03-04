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
