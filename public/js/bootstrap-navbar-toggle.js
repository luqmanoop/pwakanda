const toggle = document.querySelectorAll('.navbar-toggle')[0],
  collapse = document.querySelectorAll('.navbar-collapse')[0];

// Toggle if navbar menu is open or closed
function toggleMenu() {
  collapse.classList.toggle('collapse');
  collapse.classList.toggle('in');
}

// Close all dropdown menus
function closeMenus() {
  dropdowns.forEach(dropdown => {
    dropdown
      .querySelectorAll('.dropdown-toggle')[0]
      .classList.remove('dropdown-open');
    dropdown.classList.remove('open');
  });
}

// Close dropdowns when screen becomes big enough to switch to open by hover
function closeMenusOnResize() {
  if (document.body.clientWidth >= 768) {
    closeMenus();
    collapse.classList.add('collapse');
    collapse.classList.remove('in');
  }
}

// Event listeners
window.addEventListener('resize', closeMenusOnResize, false);
toggle.addEventListener('click', toggleMenu, false);
