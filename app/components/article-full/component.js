import ArticleItem from '../article-item/component';

export default ArticleItem.extend({
  classNames: ['ui', 'raised', 'large', 'segment'],

  click() {
    Ember.debug('>>>> clicked in article-full');
  },

});
