updateNavbar();

function login(username, modal, image) {
    localStorage.setItem('currentLogin', 'true');
    localStorage.setItem('savedUsername', username);

    image ? localStorage.setItem('pfp', image) : localStorage.setItem('pfp', '/images/pfp/unknown.jpg');

    if (localStorage.getItem('savedUsername') && (document.querySelector('#password-register').value || document.querySelector('#password-login').value)) {
        $(modal).modal('hide');
        updateNavbar();
    } 
}

document.querySelector('.signin-js').addEventListener('click', () => {
    login(document.querySelector('#username-login').value, document.querySelector('.signin-modal'));
});

document.querySelector('.reg-js').addEventListener('click', () => {
    const fileInput = document.querySelector('#file');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            login(document.querySelector('#username-reg').value, document.querySelector('.reg-modal'), imageData);
        }
        reader.readAsDataURL(file);
    } else {
        login(document.querySelector('#username-reg').value, document.querySelector('.reg-modal'));
    }
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('logout')) {
      localStorage.setItem('currentLogin', 'false');
      localStorage.clear();
      updateNavbar();
    }
  });

function updateNavbar() {
    let navHTML = '';
    if (localStorage.getItem('currentLogin') === 'true') {
        navHTML = `
            <li class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle p-0" role="button" data-bs-toggle="dropdown">
                    <div class="d-inline-block mb-0">
                        <img src="${localStorage.getItem('pfp')}" alt="" class="pfp">
                        <span class="fs-6">Hello,<span class="fw-semibold"> ${localStorage.getItem('savedUsername')}</span> </span>
                    </div>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="" class="dropdown-item profile-view">Profile</a></li>
                    <li><a href="" class="dropdown-item logout">Logout</a></li>
                </ul>
            </li>`;
    } else {
        // Default navbar HTML when the user is not logged in
        navHTML = `
            <li class="nav-item me-2">
            <a href="/user/login">
                <button class="btn btn-success rounded-5">Sign in</button>
            </a>
            </li>
            <a href="/user/signup">
                <li class="nav-item">
                    <button class="btn btn-success rounded-5" data-bs-target="#register" data-bs-toggle="modal">Sign up</button>
                </li>
            </a>`;
    }

    document.querySelector('.navbar-nav').innerHTML = navHTML;
}
