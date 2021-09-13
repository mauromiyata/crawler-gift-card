const Crawler = require("crawler");
const notifier = require('node-notifier');
const open = require('open');

const URL = 'https://www.meli.lojaolist.com.br/MLB-1919043357-gift-card-virtual-ifood-pague-r10-e-ganhe-r15-_JM';
//const URL = 'https://www.meli.lojaolist.com.br/MLB-1933718246-gift-card-virtual-ifood-pague-r10-e-ganhe-r15-_JM';
//const URL = 'https://www.meli.lojaolist.com.br/MLB-1957034504-gift-card-virtual-ifood-pague-r10-e-ganhe-r15-_JM';
//const URL = 'https://www.meli.lojaolist.com.br/MLB-1650228687-placa-restaurante-lanchonete-estamos-no-ifood-36x46-_JM';
const DELAY = 60000;

const c = new Crawler({
  maxConnections: 10,
  jQuery: true,
  callback: function (error, res, done) {
    const data = new Date();

    if (error) {
      console.log(error);
    } else {
      const formActions = res.$("form.ui-pdp-actions");

      if (formActions.length > 0) {
        console.log('disponivel ' + data);
        const titulo = res.$(".ui-pdp-header__title-container .ui-pdp-title").text();
        notifier.notify({
            title: 'Notificação',
            message: 'Produto disponível: ' + titulo,
            timeout: 60,
            sound: true, // Only Notification Center or Windows Toasters
            wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
          },
          function (err, response, metadata) {
            // Response is response from notification
            // Metadata contains activationType, activationAt, deliveredAt
          }
        );
      } else {
        console.log('Anúncio pausado ' + data);
      }
    }

    setTimeout(check, DELAY);
    done();
  }
});

function check() {
  c.queue([{
    uri: URL,
  }]);
}

notifier.on('click', function (notifierObject, options, event) {
  open(URL);
});

check();
//notifier.notify('Message');