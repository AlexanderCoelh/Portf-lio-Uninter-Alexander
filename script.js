/* Tema claro e escuro */
const temaBtn = document.getElementById("temaBtn");

if (temaBtn) {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("escuro");
    }

    /*  Alterna e salva o tema escolhido */
    temaBtn.addEventListener("click", function () {
        const escuro = document.body.classList.toggle("escuro");
        localStorage.setItem("tema", escuro ? "escuro" : "claro");
    });
}

/* Destaque do menu */
const secoes = document.querySelectorAll("main > section");
const links = document.querySelectorAll("nav a");

/* Identifica a seção que está aparecendo na tela */
const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            links.forEach(function (link) {
                link.classList.toggle(
                    "ativo",
                    link.getAttribute("href") === "#" + entrada.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-40% 0px -55% 0px"
});

secoes.forEach(function (secao) {
    observador.observe(secao);
});

/* Formulário de contato */
const form = document.getElementById("formContato");
const feedback = document.getElementById("feedback");

/* Exibe mensagens de erro nos campos */
function mostrarErro(campo, mensagem) {
    let aviso = campo.nextElementSibling;

    if (!aviso || !aviso.classList.contains("erro")) {
        aviso = document.createElement("small");
        aviso.className = "erro";
        campo.insertAdjacentElement("afterend", aviso);
    }

    aviso.textContent = mensagem;
    campo.classList.toggle("invalido", mensagem !== "");
}

/* Verifica se o e-mail é válido */
function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form && feedback) {
    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const mensagem = document.getElementById("mensagem");

        let valido = true;

        if (nome.value.trim() === "") {
            mostrarErro(nome, "Informe seu nome.");
            valido = false;
        } else {
            mostrarErro(nome, "");
        }

        if (email.value.trim() === "") {
            mostrarErro(email, "Informe seu e-mail.");
            valido = false;
        } else if (!emailValido(email.value.trim())) {
            mostrarErro(email, "Informe um e-mail válido.");
            valido = false;
        } else {
            mostrarErro(email, "");
        }

        if (mensagem.value.trim() === "") {
            mostrarErro(mensagem, "Escreva sua mensagem.");
            valido = false;
        } else {
            mostrarErro(mensagem, "");
        }

        if (!valido) {
            feedback.textContent = "Corrija os campos destacados e tente novamente.";
            feedback.className = "falha";
            return;
        }

        form.reset();
        feedback.textContent = "Mensagem enviada com sucesso!";
        feedback.className = "sucesso";

        setTimeout(function () {
            feedback.textContent = "";
            feedback.className = "";
        }, 6000);
    });
}
