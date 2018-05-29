/* global TrelloPowerUp */

var onBtnClick = function(t, opts) {
  t.modal({
    url: './index.html',
    fullscreen: false,
    title: 'Hill Chart'
  });
};

TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    return [
      {
        text: 'Hill Chart',
        condition: 'always',
        callback: onBtnClick
      }
    ];
  },
  'card-badges': function(t, opts) {
    return t.get('board', 'shared').then(data => {
      const { board, card } = t.getContext();
      // console.log({ board, card, data });

      // console.log('We just loaded the card name for fun: ' + id);
      const isUnknown = data[card].x < 328;
      return [
        {
          dynamic: function() {
            return {
              text: isUnknown ? 'Figuring things out' : 'Making it happen',
              refresh: 10,
              color: isUnknown ? 'orange' : 'green'
            };
          }
        }
      ];
    });
  }
});
