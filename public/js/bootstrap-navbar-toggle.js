const toggle = document.querySelectorAll('.navbar-toggle')[0],
  collapse = document.querySelectorAll('.navbar-collapse')[0];

// Toggle if navbar menu is open or closed
function toggleMenu() {
  collapse.classList.toggle('collapse');
  collapse.classList.toggle('in');
}

// Close dropdowns when screen becomes big enough to switch to open by hover
function closeMenusOnResize() {
  if (document.body.clientWidth >= 768) {
    collapse.classList.add('collapse');
    collapse.classList.remove('in');
  }
}

// Event listeners
window.addEventListener('resize', closeMenusOnResize, false);
toggle.addEventListener('click', toggleMenu, false);
