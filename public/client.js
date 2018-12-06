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
  'card-detail-badges': function(t, opts) {
    // console.log('***');
    const { card } = t.getContext();
    return t.get(card, 'shared').then(data => {
      // console.log({data});

      return [
        {
          title: 'Hill Chart',
          text: data.visible ? 'Make Hidden' : 'Make Visible',
          callback: function(t, opts) {
            // console.log('foo');
            t.set(card, 'shared', { visible: !data.visible });
          }
        }
      ];
    });
    // return [
    //   {
    //     title: 'Hill Chart',
    //     text: 'Hidden - show on hill chart',
    //     callback: function(t, opts) {
    //       console.log('foo');
    //     }
    //   }
    // ];

    // return t.get(card, 'shared').then(data => {
    //   console.log({ data });

    //   return [
    //     {
    //       title: 'Popup Detail Badge',
    //       text: 'Popup'
    //     }
    //   ];
    // });
  },
  'card-badges': function(t, opts) {
    const { card } = t.getContext();

    return t.get(card, 'shared').then(data => {
      if (!data.visible) return [];
      const isUnknown = data.position ? data.position.x < 340 : true;
      return [
        {
          text: isUnknown ? 'Figuring things out' : 'Making it happen',
          color: isUnknown ? 'orange' : 'green'
        }
      ];
    });
  }
});
