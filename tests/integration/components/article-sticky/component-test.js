import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('article-sticky', 'Integration | Component | article sticky', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{article-sticky}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#article-sticky}}
      template block text
    {{/article-sticky}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
