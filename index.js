const { select, input, checkbox } = require('@inquirer/prompts');
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";

let metas

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8")
    metas = JSON.parse(dados)
  }
  catch(erro) {
    metas = []
  }
}

const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const cadastrarMeta = async () => {
  const meta = await input({ message: "digite a meta:" })

  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia.";
    return

  }

  meta.push(
    { value: meta, chacked: false}
  )
  mensagem = "Meta cadastrada com sucesso!"
}
const listarMetas = async () => {
  if(metas.length == 0) {
    mensagem = "NÃO EXISTE METAS!"
    return
  }

  const respostas = await checkbox({
    message: "use as setas para mudar, o espaço para marca ou desmarca e o enter para finalizar essa etapa ",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) => {
    m.checked = false

})

  if(respostas.length == 0) {
    mensagem = "nenhuma meta selecionada"
    return
  }

  
  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  mensagem = "meta(s) concluida(s)";
  
}
const metasRealizadas = async () => {
  if(metas.length == 0) {
    mensagem = "NÃO EXISTE METAS!"
    return}
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if(realizadas.length == 0){
    mensagem = "Não existem metas realizadas! :( "
    return
  }
  
  await select ({
    message: "Metas realizadas: " + realizadas.length,
    choices: [...realizadas]
  })
}
const metasAbertas = async () => { 
  if(metas.length == 0) {
  mensagem = "NÃO EXISTE METAS!"
  return}
  const abertas = metas.filter((meta) => {
    return meta.checked != true
  })

  if (abertas.length == 0) {
    mensagem = "Não existe metas abertas! :-)"
    return
  }

  await select({
    message: "Metas Abertas: " + abertas.length,
    choices: [...abertas]

  })

}

const removerMetas = async () => {
  if(metas.length == 0) {
    mensagem = "NÃO EXISTE METAS!"
    return}
  const metasDesmarcadas = metas.map((meta) => {
    return {value: meta.value, checked: false}

  })

  const itemsARemover = await checkbox({
    message: "selecione um item para remover",
    choices: [...metasDesmarcadas],
    instructions: false,
  })

 if (itemsARemover.length == 0) {
  mensagem ="Nenhum item selecionado!"
  return
 }
 itemsARemover.forEach((item) => {
  metas = metas.filter((meta) => {
    return meta.value != item
  })

  mensagem = "metas deletadas com sucesso!"
  
 })
}

const mostrarMensagem = () => {
  console.clear();

  if(mensagem != ""){
    console.log(mensagem);
    console.log("")
    mensagem = ""
    
  }
}

const start = async () => {
    await carregarMetas()

    while (true) {
      mostrarMensagem()

      const opcao = await select({
          message: "Menu >",
          choices: [
            {
              name: "Cadastrar meta",
              value: "Cadastrar"
            },
            {
              name: "listar metas",
              value: "Listar"
            },
            {
              name: "Metas realizadas",
              value: "realizadas"
            },
            {
              name: "Metas abertas",
              value: "abertas"
            },
            {
              name: "Remover metas",
              value: "remover"
            },
            {
              name: "sair",
              value: "sair"
            }
          ]

      })

      switch(opcao) {
        case "cadastrar":
          await cadastrarMeta()
          await salvarMetas()
          break
        case "listar":
          await listarMetas()
          await salvarMetas()
          break
        case "realizadas":
          await metasRealizadas()
          break
        case "abertas":
          await metasAbertas()
          break
        case "remover":
          await removerMetas()
          await salvarMetas()
          break
        case "sair":
          console.log("Até a próxima!")
          return
      }
    }

}

start()