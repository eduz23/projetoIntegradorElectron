const nomeUsuario = document.getElementById('usuario')
const senha = document.getElementById('password')
const btnAcessar = document.getElementById('acessar')
const msg = document.getElementById('msg')

btnAcessar.addEventListener('click', validarLogin)

async function validarLogin() {
    let retorno = await window.funcaoAPI.validarLogin(nomeUsuario.value.toLowerCase(), senha.value)

    if (retorno && retorno.perfil == 'adm') {
        localStorage.setItem('perfil', retorno.perfil)
        msg.textContent = 'deu bom'
        msg.style.color = 'green'
        await window.janelaAPI.abrirJanelaPrincipal()
        console.log(retorno.perfil)
    }

    else if(retorno && retorno.perfil == 'user'){
        localStorage.setItem('perfil', retorno.perfil)
        msg.textContent = 'deu bom, user'
        await window.janelaAPI.abrirJanelaPrincipal()
        console.log(retorno.perfil)
    }

    else {
        msg.textContent = 'Login inválido'
        msg.style.color = 'red'
    }
}