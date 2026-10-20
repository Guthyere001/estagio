// js/database.js — Banco de Dados Local
const DB_NAME = "portal_patrimonio_db";

const Database = {
    init() {
        if (!localStorage.getItem(DB_NAME)) {
            const dadosIniciais = {
                usuarios: [
                    { id: 1, nome: 'Administrador', login: 'admin', senha: '123', permissao: '1' },
                    { id: 2, nome: 'Gestor Alocados', login: 'alocados', senha: '123', permissao: '2' }, // Permissão '2' (Gestor de Alocados)
                    { id: 3, nome: 'Usuário Comum', login: 'usuario', senha: '123', permissao: '0' },
                    { id: 4, nome: 'Usuário Visitante', login: 'visitante', senha: '123', permissao: '0' }
                ],
                objetos: [
                    { id: 1, nome: 'Notebook Dell Latitude', numero_tombo: '00125', quantidade: 1, tipo: 'com_tombo', local: 'Secretaria de Tecnologia', estado: 'Em Funcionamento', valor: 4500.00, data_aquisicao: '2025-01-10', observacao: 'Uso da diretoria' },
                    { id: 2, nome: 'Impressora HP LaserJet', numero_tombo: '', quantidade: 1, tipo: 'alocado', alocado_para: 'Secretaria da Saúde', local: 'Recepção', estado: 'Em Manutenção', valor: 1850.00, data_aquisicao: '2024-06-01', observacao: 'Alocado temporariamente' }
                ]
            };
            localStorage.setItem(DB_NAME, JSON.stringify(dadosIniciais));
        }
    },
    getDB() { return JSON.parse(localStorage.getItem(DB_NAME)); },
    saveDB(db) { localStorage.setItem(DB_NAME, JSON.stringify(db)); },
    autenticar(login, senha) {
        const db = this.getDB();
        const usuario = db.usuarios.find(u => u.login === login && u.senha === senha);
        if (usuario) {
            localStorage.setItem('sessao_ativa', JSON.stringify(usuario));
            return usuario;
        }
        return null;
    },
    obterSessao() { return JSON.parse(localStorage.getItem('sessao_ativa')); },
    logout() {
        localStorage.removeItem('sessao_ativa');
        window.location.href = 'index.html';
    }
};
Database.init();