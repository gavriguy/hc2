/* global TrelloPowerUp */

var onBtnClick = function(t, opts) {
  t.modal({
    url: './hillchart',
    fullscreen: false,
    title: 'Hill Chart'
  });
};

const onCycleInfoClick = (t, opts) => {
  return t.popup({
    title: 'Cycle Info',
    url: './info',
    height: 250
  });
};

TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    return t.get('board', 'shared').then(data => {
      return [
        {
          text: 'Hill Chart',
          condition: 'always',
          callback: onBtnClick
        },
        {
          text: data.infoLabel ? data.infoLabel : 'Cycle Info (NOT SET)',
          condition: 'always',
          callback: onCycleInfoClick
        }
      ];
    });
  },
  'card-badges': function(t, opts) {
    return t.get('board', 'shared').then(data => {
      const { board, card } = t.getContext();
      const isUnknown = data[card].x < 340;
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
