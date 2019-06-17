require('../../css/redViewStyles.css');
require('../third-party/jquery/jquery-1.8.3-custom');
const underscore = require('../third-party/underscore/underscore-1.8.3');
window._ = underscore;
const Backbone = require('../third-party/backbone/backbone-0.9.9');

define([
    'text!../backboneTemplates/red_view_template.html',
    './storeCounter',
], function(templateHTML,storeCounter) {
  return Backbone.View.extend({
    template: _.template(templateHTML),
    initialize: function() {
      this.render();
    },

    events: {
        'click .open-green-tab': 'openGreenTab',
    },

    render: function() {
        const html = this.template({
            id: this.options.id,
        });
        this.$el.html(html);
        this.renderStoreCounter();
    },

    renderStoreCounter: function() {
        new storeCounter({
            el: this.$el.find('.store-counter-container'),
            dispatch: this.options.dispatch,
        });
    },

    openGreenTab: function() {
        this.options.dispatch({
            type: 'open_new_tab',
        }, 'green');
    },
  });
});
