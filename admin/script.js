function toggleHeadAccDrop() {
    const dropdown = document.getElementById('headAccDrop');
    const isVisible = dropdown.style.display === 'block';

    dropdown.style.display = isVisible ? 'none' : 'block';
}

window.onclick = function(event) {
    const dropdown = document.getElementById('headAccDrop');
    const arrowButton = document.querySelector('.head-acc-action');

    if (!event.target.matches('.head-acc-action') && !event.target.matches('.head-acc-drop') && !event.target.matches('.head-subacc-info')) {
        dropdown.style.display = 'none';
    }
}

function refreshNotifications() {
    alert('Notifications refreshed!');
}

function toggleNotification() {
    const notificationSidebar = document.querySelector('.head-notify-bar');
    if (notificationSidebar.style.display === 'block') {
        notificationSidebar.style.display = 'none';
    } else {
        notificationSidebar.style.display = 'block';
    }
}

function toggleSideMenu(menuId) {
    var menuContent = document.getElementById(menuId);
    var arrow = menuContent.previousElementSibling.querySelector('.side-menu-drop');

    if (menuContent.style.display === "none" || menuContent.style.display === "") {
        menuContent.style.display = "block";
        arrow.classList.add('open');
    } else {
        menuContent.style.display = "none";
        arrow.classList.remove('open');
    }
}

window.onload = function() {
    // Open all side menus by default
    const sideMenus = document.querySelectorAll('.side-menu-content');
    sideMenus.forEach(function(menu) {
        menu.style.display = 'block'; // Ensure side menus are expanded
        var arrow = menu.previousElementSibling.querySelector('.side-menu-drop');
        if (arrow) {
            arrow.classList.add('open'); // Add open class to arrows to indicate expanded state
        }
    });
}

