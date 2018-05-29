/* global TrelloPowerUp */

var onBtnClick = function (t, opts) {
  t.modal({
    url: './index.html',
    fullscreen: false,
    title: 'Hill Chart'
  })
};

TrelloPowerUp.initialize({
  'board-buttons': function (t, opts) {
    return [
      {
      text: 'Hill Chart',
      condition: 'always',
      callback: onBtnClick,
      }
    ]
  },
});
