App = Ember.Application.create({
  LOG_TRANSITIONS: false,
  LOG_TRANSITIONS_INTERNAL: false,
  LOG_VIEW_LOOKUPS: false,
  LOG_ACTIVE_GENERATION: false,
  LOG_RESOLVER: false
});

//App.ApplicationAdapter = DS.FixtureAdapter.extend({});

App.ApplicationAdapter = DS.RESTAdapter.extend({});

DS.RESTAdapter.reopen({
  host: 'http://0.0.0.0:5000'
});

App.FoldersAdapter = DS.RESTAdapter.extend({
  buildURL: function(type, id, record) {
    var url = this._super(type, id, url);
    console.log('FoldersAdapter: buildURL(type='+type+',id='+id+') => '+url);
    return url;
  }
});

App.FolderAdapter = DS.RESTAdapter.extend({
  buildURL: function(type, id, record) {
    var url = this._super(type, id, url);
    console.log('FolderAdapter: buildURL(type='+type+',id='+id+') => '+url);
    return url;
  }
});

App.ItemsAdapter = DS.RESTAdapter.extend({
  buildURL: function(type, id, record) {
    var url = this._super(type, id, url);
    console.log('ItemsAdapter: buildURL(type='+type+',id='+id+') => '+url);
    return url;
  }
});

App.ItemAdapter = DS.RESTAdapter.extend({
  buildURL: function(type, id, record) {
    var url = this._super(type, id, url);
    console.log('ItemAdapter: buildURL(type='+type+',id='+id+') => '+url);
    return url;
  }
});

App.KeysAdapter = DS.RESTAdapter.extend({
  buildURL: function(type, id, record) {
    var url = this._super(type, id, url);
    console.log('KeysAdapter: buildURL(type='+type+',id='+id+') => '+url);
    return url;
  }
});

App.Router.map(function() {
  this.resource('folders', function() {
    this.resource('folder', { path: ':folder_id' }, function() {
      this.resource('items', function() {
        this.resource('item', { path: ':item_id' }, function() {
          this.resource('keys', function() {});
        });
      })
    })
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    console.log('IndexRoute: redirect');
    this.transitionTo('folders');
  }
});

App.FoldersRoute = Ember.Route.extend({
  model: function() {
    console.log('FoldersRoute: model');
    return this.store.find('folder');
  }
});

App.FoldersIndexRoute = Ember.Route.extend({
  afterModel: function() {
    var firstObject = this.modelFor('folders').get('firstObject');
    if (firstObject) {
      console.log('FoldersIndexRoute: afterModel => folder/firstObject');
      this.transitionTo('folder', firstObject);
    } else {
      console.log('FoldersIndexRoute: afterModel => folders');
      this.transitionTo('folders');
    }
  }
});

App.FolderIndexRoute = Ember.Route.extend({
  afterModel: function() {
    var firstObject = this.modelFor('folder').get('firstObject');
    if (firstObject) {
      console.log('FolderIndexRoute: afterModel => item/firstObject');
      this.transitionTo('item', firstObject);
    } else {
      console.log('FolderIndexRoute: afterModel => items');
      this.transitionTo('items');
    }
  }
});

App.ItemsRoute = Ember.Route.extend({
  model: function() {
    console.log('ItemsRoute: model');
    return this.modelFor('folder').get('items');
  }
});

App.ItemsIndexRoute = Ember.Route.extend({
  afterModel: function() {
    var firstObject = this.modelFor('items').get('firstObject');
    if (firstObject) {
      console.log('ItemsIndexRoute: afterModel => item/firstObject');
      this.transitionTo('item', firstObject);
    } else {
      console.log('ItemsIndexRoute: afterModel => items');
      this.transitionTo('items');
    }
  }
});

App.ItemIndexRoute = Ember.Route.extend({
  afterModel: function() {
    console.log('ItemIndexRoute: afterModel');
    this.transitionTo('keys');
  }
});

App.KeysRoute = Ember.Route.extend({
  model: function() {
    console.log('KeysRoute: model');
    return this.modelFor('item').get('keys');
  }
});

/** MODELS **/
App.Folder = DS.Model.extend({
  name: DS.attr('string'),
  count: DS.attr('number'),
  items: DS.hasMany('item', {async: true} )
});

App.Item = DS.Model.extend({
  name: DS.attr('string'),
  folder: DS.belongsTo('folder', {async: true} ),
  count: DS.attr('number'),
  keys: DS.hasMany('key', {async: true} )
});

App.Key = DS.Model.extend({
  name: DS.attr('string'),
  value: DS.attr('string'),
  item: DS.belongsTo('item', {async: true} )
});

/** FIXTURES **/
App.Folder.reopenClass({
  FIXTURES: [
    { id: 1, name: 'First folder',  count: 3, items: [51, 52] },
    { id: 2, name: 'Second folder', count: 4, items: [53, 54, 55, 56] },
    { id: 3, name: 'Third folder',  count: 1, items: [57] },
    { id: 4, name: 'Fourth folder', count: 0, items: [] },
    { id: 5, name: 'Fifth folder',  count: 2, items: [58, 59] }
  ]
});

App.Item.reopenClass({
  FIXTURES: [
    { id: 51, name: 'Fifty one',   folder: 1, count: 2, keys: [101, 102] },
    { id: 52, name: 'Fifty two',   folder: 1, count: 0, keys: [] },
    { id: 53, name: 'Fifty three', folder: 2, count: 1, keys: [103] },
    { id: 54, name: 'Fifty four',  folder: 2, count: 1, keys: [104] },
    { id: 55, name: 'Fifty five',  folder: 2, count: 1, keys: [105] },
    { id: 56, name: 'Fifty six',   folder: 2, count: 3, keys: [106, 107, 108] },
    { id: 57, name: 'Fifty seven', folder: 3, count: 0, keys: [] },
    { id: 58, name: 'Fifty eight', folder: 5, count: 2, keys: [109, 110] },
    { id: 59, name: 'Fifty nine',  folder: 5, count: 1, keys: [111] }
  ]
});

App.Key.reopenClass({
  FIXTURES: [
    { id: 101, name: 'Hundred one',    value: 'Future famous novel',          item: 51 },
    { id: 102, name: 'Hundred two',    value: 'Something to think about',     item: 51 },
    { id: 103, name: 'Hundred three',  value: 'A storm in a teacup',          item: 53 },
    { id: 104, name: 'Hundred four',   value: 'Keep up the good work',        item: 54 },
    { id: 105, name: 'Hundred five',   value: 'One small step for man',       item: 55 },
    { id: 106, name: 'Hundred six',    value: 'Who can tell me more?',        item: 56 },
    { id: 107, name: 'Hundred seven',  value: 'That is the name of the game', item: 56 },
    { id: 108, name: 'Hundred eight',  value: 'Will be back tomorrow',        item: 56 },
    { id: 109, name: 'Hundred nine',   value: 'Sweep it under the rug',       item: 58 },
    { id: 110, name: 'Hundred ten',    value: 'You must be kidding me',       item: 58 },
    { id: 111, name: 'Hundred eleven', value: 'An apple a day is healthy',    item: 59 }
  ]
});
