import {NegociacaoController} from './controllers/NegociacaoController';

let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#btn-apagar').onclick = negociacaoController.apaga.bind(negociacaoController);
document.querySelector('#btn-importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);

