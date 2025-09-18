import pool from "../database/data.js";
export const deletar = async (id, usuario_id) => {
    const cx = await pool.getConnection();
    try {
        const query = 'DELETE FROM veiculo WHERE id = ? AND usuario_id = ?';
        const [result] = await cx.query(query, [id, usuario_id]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (cx) {
            cx.release();
        }
    }
};
export const consultarPorId = async (id, usuario_id) => {
    const cx = await pool.getConnection();
    try {
        const query = 'SELECT * FROM veiculo WHERE id = ? AND usuario_id = ?';
        const [rows] = await cx.query(query, [id, usuario_id]);
        return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
        if (cx) {
            cx.release();
        }
    }
};


export const cadastrar = async (veiculo) => {    
    // Obter uma conexão do pool
    const cx = await pool.getConnection(); 
    try {
        // Desestruturar o objeto veiculo
        const { 
            modelo,
            ano_fabricacao,
            ano_modelo,
            cor,
            num_portas,
            fotos,
            categoria_id,
            montadora_id,
            tipo_cambio,
            tipo_direcao,
            usuario_id } = veiculo; 

        // Query para inserir um novo veículo
        const query = `INSERT INTO veiculo (modelo, ano_fabricacao, ano_modelo, cor, num_portas, fotos, categoria_id, montadora_id, tipo_cambio, tipo_direcao, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Executar a query com os valores do veículo
        const [result] = await cx.query(query,[modelo,ano_fabricacao,ano_modelo,cor,num_portas,fotos,categoria_id,montadora_id,tipo_cambio,tipo_direcao,usuario_id]);
    
        // Verificar se a inserção foi bem-sucedida
        if (result.affectedRows === 0) {
            throw new Error("Erro ao cadastrar veículo");
        } 
        // Retornar o ID do veículo inserido
        return result.insertId; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally{
        if (cx) {
            cx.release(); // Liberar a conexão de volta ao pool
        }
    }
}

export const consultarTodos = async (search, usuario_id) => {
    // Obter uma conexão do pool
    const cx = await pool.getConnection(); 
    try {
        // Query para consultar todos os veículos do usuário
        let query = `SELECT * FROM veiculo WHERE usuario_id = ?`;
        let params = [usuario_id];

        // Verificar se há um termo de pesquisa
        if (search) {
            query += ` AND modelo LIKE ?`;
            params.push(`%${search}%`);
        }

        // Executar a query com os parâmetros
        const [rows] = await cx.query(query, params);
        
        // Retornar os resultados da consulta
        return rows; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally {
        if (cx) {
            cx.release(); // Liberar a conexão de volta ao pool
        }
    }
} 


export const editar = async (id, dados, usuario_id) => {
    const cx = await pool.getConnection();
    try {
        const query = `
            UPDATE veiculo SET 
                modelo = ?, 
                ano_fabricacao = ?, 
                ano_modelo = ?, 
                cor = ?, 
                num_portas = ?, 
                fotos = ?, 
                categoria_id = ?, 
                montadora_id = ?, 
                tipo_cambio = ?, 
                tipo_direcao = ?
            WHERE id = ? AND usuario_id = ?
        `;
        const params = [
            dados.modelo,
            dados.ano_fabricacao,
            dados.ano_modelo,
            dados.cor,
            dados.num_portas,
                typeof dados.fotos === 'string' ? dados.fotos : Array.isArray(dados.fotos) ? dados.fotos.join(',') : '',
            dados.categoria_id,
            dados.montadora_id,
            dados.tipo_cambio,
            dados.tipo_direcao,
            id,
            usuario_id
        ];
        const [result] = await cx.query(query, params);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (cx) {
            cx.release();
        }
    }
};
