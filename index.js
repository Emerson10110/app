const { select } = require('@inquirer/prompts');

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
          console.log("Vamos cadastrar");
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