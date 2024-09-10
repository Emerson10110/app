const { select, input } = require('@inquirer/prompts');

let meta = {
  value: "tomar 3L de água por dia",
  checked: false, 
}
let metas = [
  meta
]

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
          console.log("Vamos listar");
          break
        case "sair":
          console.log("Até a próxima!")
          return
      }
    }

}

start()