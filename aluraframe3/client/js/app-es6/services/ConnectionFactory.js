const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';

let connection = null;

let close = null; 

export class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {    
                if(!connection) {
                    connection = e.target.result;
                    //Antes de sobrescrever o método tem que salvar uma instância para poder chamar no futuro
                    close = connection.close.bind(connection);//utiliza o bind para manter a associação com o contexto original
                    connection.close = function() {//sbrescreve o método close (Monkey Patch)
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };
                }
                resolve(connection);
            };

            openRequest.onerror = e => {    
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if(connection.objectStoreNames.contains(store)) 
                connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }
    static closeConnection() {
        if(connection) {
            close();
            connection = null;
        }
    }
}
