const Backbone = require('../third-party/backbone/backbone-0.9.9');
const { pluck } = require('rxjs/operators');
require('../../css/storeCounter.css');

define([
    'text!../backboneTemplates/store_counter.html',
], function(templateHTML) {
    return Backbone.View.extend({
        template: _.template(templateHTML),
        events: {
            'click .increment-count': 'incrementStoreCount',
            'click .decrement-count': 'decrementStoreCount',
        },
        initialize: function() {
            this.render();
            const { store$ } = require('microservices-helper/module_helper');
            store$.pipe(pluck('count')).subscribe((count) => {
                this.renderStoreCount(count);
            });
        },

        render: function() {
            this.$el.html(this.template());
            this.renderStoreCount(this.options.storeCount);
        },

        renderStoreCount(count) {
            const countContainer = this.$el.find('.store-count-value');
            countContainer.html(count);
        },

        incrementStoreCount() {
            this.options.dispatch({
                type: 'increment_count',
            }, 'core');
        },
        decrementStoreCount() {
            this.options.dispatch({
                type: 'decrement_count'
            }, 'core');
        },
    });
});