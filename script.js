
// Algoritimo
// ok1.pegar os valores dos inputs
//ok2. fazer o calculo do imc -> valor Imc
//ok3. gerar a classificacao imc -> classificacaoImc
//ok4. organizar os dados do usuarios para salvar na lista e gerar a data
//ok5.inserir o usuario na lista (salvar no localstorage)
//ok6. Fumcao para carregar os usuarios (localstorage), chamar ao carregar
//ok7.  Renderisar o conteudo da tabela com os usuarios cadastrados
//ok8. botao para limpar os registros (localstorage)

function calcular(event) {
    event.preventDefault()
    console.log("foi executada a funcao caulcular")
    
// passo1
    let usuario = receberValores()
    // passo2

    let imcCalculado = calcularImc( usuario.altura,usuario.peso)
  // passo3
    let classificacaoImc = classificarImc(imcCalculado)
    
    

    console.log(classificacaoImc)
 // passo4
   usuario = organizarDados(usuario,imcCalculado,classificacaoImc)
// passo5
   cadastrarUsuario(usuario)

   // passo6

   

   window.location.reload()


    
}
function receberValores() {
    let nomeRecebido = document.getElementById("nome"). value.trim()
    let alturaRecebida = document.getElementById("altura").value
    let pesoRecebido = document.getElementById("peso").value
    let dadosUsuario={
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido
    }
    console.log(dadosUsuario)


return dadosUsuario
}
function calcularImc(altura,peso){
    let imc = peso / (altura * altura)

    console.log(imc)
    return imc

}

function classificarImc(imc){
    /*
    Redsultado            Situacao
    abaixo de 18.5                      Abaixo do peso
    Entre 18.5  e 24.99          peso normal
     Entre 25 e 29.99                     sobrepeso
    Acima de 30             obsidade
    */
if (imc< 18.5){
    return "abaixo do peso"
}
    else if(imc>= 18.5 && imc < 25){
        return "peso normal"
    }
    else if (imc >= 25 && imc <30){
        return "sobrepeso"

    }
    

     else {
    return "obsidade"
 }
}
function organizarDados(dadosUsuario,valorimc,classificacaoImc){

    // pagar a dataHoratual

    let dataHoraAtual = new Intl.DateTimeFormat("pt-br",{
        timeStyle: "long", dateStyle: "short"}). format(Date.now())
    
    console.log(dataHoraAtual);

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorimc,
        situacaoimc: classificacaoImc,
        dataCadastro: dataHoraAtual
        
    }
    return dadosUsuarioAtualizado;

}

function cadastrarUsuario(dadosUsuario){

    let listaUsuarios = []

    if(localStorage.getItem("usuariosCadastrados")!= null ){
        listaUsuarios = localStorage.getItem("usuariosCadastrados")
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    // adiciona a lista de usuarios

    listaUsuarios.push(dadosUsuario)

    // salva a listaUsuarios no localStorage

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

    // localStorage.getItem("usuariocadastrados")
//     if(localStorage.getItem("usuariosCadastrados") ! = null){

//     }
//     localStorage.setItem("nomeUsuario","Elias")
}

function carregarUsuarios(){
    listaCarregada = []
    if (localStorage.getItem("usuariosCadastrados")!= null ){
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
        console.log(listaCarregada)

    }
    if(listaCarregada.length == 0){
    let tabela = document.getElementById("corpo-tabela")
    tabela.innerHTML = `<tr class= "linha-mensagem">
    < td colspan ="6">nenhum usuario cadastrado :</td> </tr>`

      
} else{
    // montar conteudo da tabela
    montarTabela(listaCarregada)
}

console.log(listaCarregada) 


}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())
 
// passo 7

function montarTabela(listaUsuarios){
    let tabela = document.getElementById("corpo-tabela")
    let templeite = ""
    listaUsuarios.forEach(usuario=>{
        // console.log("o usuario e:", usuario)
        templeite += `<tr>
        <tr>
                        <td data-cell="nome">${usuario.nome}</td>
                        <td data-cell="altura">${usuario.altura}</td>
                        <td data-cell="peso">${usuario.peso}</td>
                        <td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
                        <td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
                        <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
                    </tr>         `

    })

    tabela.innerHTML = templeite
}

function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a pagina

    window.location.reload()
}