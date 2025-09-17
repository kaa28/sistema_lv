// Endpoint para renovar sessão do usuário
export const renovarSessao = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                mensagem: "ID do usuário é obrigatório",
                data: null
            });
        }

        const usuario = await UsuarioModel.buscarPorId(id);
        if (!usuario) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                mensagem: "Usuário inválido",
                data: null
            });
        }

        // Aqui você pode gerar um novo token ou atualizar o tempo de sessão
        // Exemplo: const novoToken = gerarToken(usuario);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            mensagem: "Sessão renovada com sucesso",
            // token: novoToken, // se usar JWT
            data: usuario
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            mensagem: error.message,
            data: null
        });
    }
};
import * as UsuarioModel from "../models/UsuarioModel.js";

export const cadastrar = async (req, res) => {
    try {
        const usuario = req.body;
        
        const {nome, email, senha,cargo} = usuario
        if(!nome || !email || !senha || !cargo){
            const resposta  = {
                "success": false,
                "status": "erro",
                "statusCode": 400,
                "mensagem": "Todos os campos são obrigatórios"
            }
            return res.status(400).json(resposta);
        }
        
        const usuarioId = await UsuarioModel.cadastrar(usuario);
        console.log(usuario);

        const resposta = {
                "success": true,
                "statusCode": 201,
                "mensagem": "Usuário cadastrado com sucesso",
                "data": usuarioId
        }
        return res.status(201).json(resposta);
    } catch (error) {
        const resposta = {
                "success": false,
                "statusCode": 500,
                "mensagem": error.message,
                "data": null
        }
        res.status(500).json(resposta);
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "Email e senha são obrigatórios",
                "data": null
            };
            return res.status(400).json(resposta);
        }

        const usuario = await UsuarioModel.login(email, senha);
        console.log(usuario);
        
        if (!usuario) {
            const resposta = {
                "success": false,
                "statusCode": 401,
                "mensagem": "Credenciais inválidas",
                "data": null
            };
            return res.status(401).json(resposta);
        }

        const resposta = {
            "success": true,
            "statusCode": 200,
            "mensagem": "Login realizado com sucesso",
            "data": usuario
        };
        res.status(200).json(resposta);
    } catch (error) {
        const resposta = {
            "success": false,
            "statusCode": 500,
            "mensagem": error.message,
            "data": null
        };
        res.status(500).json(resposta);
    }
};

export const listar = async (req, res) => {
    try {
        const search = req.query.search || "";
        const usuarios = await UsuarioModel.listar(search);

        if (!usuarios) {
            const resposta = {
                "success": false,
                "statusCode": 404,
                "quantidade": 0,
                "mensagem": "Nenhum usuário encontrado",
                "data": null
            }
            return res.status(404).json(resposta);
        }
        const resposta = {
            "success": true,
            "statusCode": 200,
            "quantidade": usuarios.length,
            "mensagem": "Lista de usuários",
            "data": usuarios
        }
        res.status(200).json(resposta);
    } catch (error) {
        const resposta = {
            "success": false,
            "statusCode": 500,
            "quantidade": 0,
            "mensagem": error.message,
            "data": null
        }
        res.status(500).json(resposta);
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModel.buscarPorId(id);
        if (!usuario) {
            const resposta = {
                "success": false,
                "statusCode": 404,
                "mensagem": "Usuário não encontrado",
                "data": null
            }
            return res.status(404).json(resposta);
        }
        const resposta = {
            "success": true,
            "statusCode": 200,
            "mensagem": "Usuário encontrado",
            "data": usuario
        }
        res.status(200).json(resposta);
    } catch (error) {
        const resposta = {
            "success": false,
            "statusCode": 500,
            "mensagem": error.message,
            "data": null
        }
        res.status(500).json(resposta);
    }
};

export const buscarPorEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const usuario = await UsuarioModel.buscarPorEmail(email);
        if (!usuario) {
            const resposta = {
                "success": false,
                "statusCode": 404,
                "mensagem": "Usuário não encontrado",
                "data": null
            }
            return res.status(404).json(resposta);
        }
        const resposta = {
            "success": true,
            "statusCode": 200,
            "mensagem": "Usuário encontrado",
            "data": usuario
        }
        res.status(200).json(resposta);
    } catch (error) {
        const resposta = {
            "success": false,
            "statusCode": 500,
            "mensagem": error.message,
            "data": null
        }
        res.status(500).json(resposta);
    }
};

export const atualizarTudo = async (req, res) => {
    try {
        const { id } = req.params; // Desestrutura o ID da requisição
        const usuario = req.body; // Obtém os dados do usuário do corpo da requisição

        if (!id) {
            // Se o ID não for fornecido, retorna erro 400 (Bad Request)
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "ID do usuário é obrigatório.",
                "data": null
            };
            return res.status(400).json(resposta);
        }

        if(!Number(id)){
            // Se o ID não for um número válido, retorna erro 400 (Bad Request)
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "ID do usuário deve ser um número válido.",
                "data": null
            };
            return res.status(400).json(resposta);
        }   

        const { nome, email, senha, cargo } = usuario;
        if (!nome || !email || !senha || !cargo) {
            // Se algum campo obrigatório estiver faltando, retorna erro 400 (Bad Request)
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "Todos os campos (nome, email, senha, cargo, avatar) são obrigatórios.",
                "data": null
            };
            return res.status(400).json(resposta);
        }

        // Chama a model para atualizar o usuário
        const resultado = await UsuarioModel.atualizar(id, usuario);

        // Verifica se a operação afetou alguma linha no banco
        if (!resultado) {
            // Se nenhuma linha foi afetada, o usuário não existe. Retorna 404.
            const resposta = {
                "success": false,
                "statusCode": 404,
                "mensagem": "Usuário não encontrado.",
                "data": null
            };
            return res.status(404).json(resposta);
        }

        // Se o usuário foi atualizado, retorna 200 de sucesso
        const resposta = {
            "success": true,
            "statusCode": 200,
            "mensagem": "Usuário atualizado com sucesso.",
            "data": resultado
        };
        return res.status(200).json(resposta);

    } catch (error) {
        // Se ocorrer qualquer erro, retorna a resposta de erro 500
        const resposta = {
            "success": false,
            "statusCode": 500,
            "mensagem": error.message,
            "data": null
        };
        return res.status(500).json(resposta);
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params; // Desestrutura o ID da requisição
        const usuario = req.body; // Obtém os dados do usuário do corpo da requisição

        if (!id) {
            // Se o ID não for fornecido, retorna erro 400 (Bad Request)
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "ID do usuário é obrigatório.",
                "data": null
            };
            return res.status(400).json(resposta);
        }

        if(!Number(id)){
            // Se o ID não for um número válido, retorna erro 400 (Bad Request)
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "ID do usuário deve ser um número válido.",
                "data": null
            };
            return res.status(400).json(resposta);
        }   

        
        // Chama a model para atualizar o usuário
        const resultado = await UsuarioModel.atualizar(id, usuario);

        // Verifica se a operação afetou alguma linha no banco
        if (!resultado) {
            // Se nenhuma linha foi afetada, o usuário não existe. Retorna 404.
            const resposta = {
                "success": false,
                "statusCode": 404,
                "mensagem": "Usuário não encontrado.",
                "data": null
            };
            return res.status(404).json(resposta);
        }

        // Se o usuário foi atualizado, retorna 200 de sucesso
        const resposta = {
            "success": true,
            "statusCode": 200,
            "mensagem": "Usuário atualizado com sucesso.",
            "data": resultado
        };
        return res.status(200).json(resposta);

    } catch (error) {
        // Se ocorrer qualquer erro, retorna a resposta de erro 500
        const resposta = {
            "success": false,
            "statusCode": 500,
            "mensagem": error.message,
            "data": null
        };
        return res.status(500).json(resposta);
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params; // Desestrutura o ID da requisição

        if (!id) {
            // Se o ID não for fornecido, retorna erro 400 (Bad Request)
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "ID do usuário é obrigatório.",
                "data": null
            };
            return res.status(400).json(resposta);
        }

        if(!Number(id)){
            // Se o ID não for um número válido, retorna erro 400 (Bad Request)
            const resposta = {
                "success": false,
                "statusCode": 400,
                "mensagem": "ID do usuário deve ser um número válido.",
                "data": null
            };
            return res.status(400).json(resposta);
        }   

        // Chama a model para deletar o usuário
        const resultado = await UsuarioModel.deletar(id);
        
        // Verifica se a operação afetou alguma linha no banco
        if (!resultado) {
            // Se nenhuma linha foi afetada, o usuário não existe. Retorna 404.
            const resposta = {
                "success": false,
                "statusCode": 404,
                "mensagem": "Usuário não encontrado.",
                "data": null
            };
            return res.status(404).json(resposta);
        }

        // Se o usuário foi deletado, retorna 200 de sucesso
        const resposta = {
            "success": true,
            "statusCode": 200,
            "mensagem": "Usuário deletado com sucesso.",
            "data": null
        };
        return res.status(200).json(resposta);

    } catch (error) {
        // Se ocorrer qualquer erro, retorna a resposta de erro 500
        const resposta = {
            "success": false,
            "statusCode": 500,
            "mensagem": error.message,
            "data": null
        };
        return res.status(500).json(resposta);
    }
};
