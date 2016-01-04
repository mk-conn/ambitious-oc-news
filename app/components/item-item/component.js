import Ember from 'ember';

const {get, $} = Ember;

export default Ember.Component.extend({
  classNames: ['card item'],
  classNameBindings: ['isUnread'],
  isUnread: Ember.computed.alias('item.unread'),
  excerpt: Ember.computed('item.body', function () {
    const stripAt = 250;
    let text = $(get(this, 'item.body')).text();
    if (text.length > stripAt) {
      text = text.slice(0, 250) + ' ...'.htmlSafe();
    }
    return text;
  }),
  body: Ember.computed('item.body', function () {
    return get(this, 'item.body').htmlSafe();
  }),
  actions: {
    toggleShowFull() {
      this.toggleProperty('showFull');
    }
  }
});
