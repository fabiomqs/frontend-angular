'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var NegociacaoController, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }],
    execute: function () {
      negociacaoController = new NegociacaoController();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('#btn-apagar').onclick = negociacaoController.apaga.bind(negociacaoController);
      document.querySelector('#btn-importar').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map