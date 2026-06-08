function login() {

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if(usuario === "" || password === ""){

        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'warning',
            title: 'Ingrese usuario y contraseña',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        return;
    }

    if(usuario === "admin" && password === "1234"){

        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Bienvenido al sistema',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = "dashboard.html";
        });

    }else{

        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

    }
}
const slides = document.querySelectorAll(".slide");

let current = 0;

setInterval(() => {

    slides[current].classList.remove("active");

    current++;

    if(current >= slides.length){
        current = 0;
    }

    slides[current].classList.add("active");

}, 1500);