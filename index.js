const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
  value: "tomar 3L de água por dia",
  checked: false, 
}
let metas = [ meta ]

const cadastrarMeta = async () => {
  const meta = await input({ message: "digite a meta:" })

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia.");
    return

  }

  meta.push(
    { value: meta, chacked: false}
  )
}
const listarMetas = async () => {
  const respostas = await checkbox({
    message: "use as setas para mudar, o espaço para marca ou desmarca e o enter para finalizar essa etapa ",
    choices: [...metas],
    instructions: false,
  })

  if(respostas.length == 0) {
    console.log("nenhuma meta selecionada");
    return
  }

  metas.forEach((m) => {
    m.checked = false
})
  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })
  console.log("meta(s) concluida(s)");
  
}
const start = async () => {
    while (true) {
      
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
              name: "sair",
              value: "sair"
            }
          ]

      })

      switch(opcao) {
        case "cadastrar":
          await cadastrarMeta()
          console.log(metas);
          
          break
        case "listar":
          await listarMetas()
          break
        case "sair":
          console.log("Até a próxima!")
          return
      }
    }

}

start()