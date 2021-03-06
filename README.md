# Ember Nested Routes

Example single page application built using [ember.js](http://www.emberjs.com) which is my favorite mvc javascript framework.

![](images/screenshot.png?raw=true)

## Description

A list of FOLDERS where each folder consists of one-to-many ITEMS (or zero) and each item consists of one or more KEYS (or zero) where each key is a name-value pair.

    /folders
        => folders list
    /folders/:folder_id/items
        => items list for a given folder
    /folders/:folder_id/items/:item_id/keys
        => keys list for a given item of a given folder

The routes are nested and look like this:

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

Choosing a top level folder will cascade down to include the first item if it exists followed by the keys if they exists by calling `this.transitionTo()` from the `afterModel` hooks.

Uses fixtures for demonstration purposes, but can also be hooked up to a remote service by enabling the RESTAdapter.

## Installation

    git clone git@github.com:kgish/ember-nested-routes.git nested-routes
    cd nested-routes
    python -m SimpleHTTPServer
    chrome http://localhost:8000

## Author

Kiffin Gish <k.gish@zarafa.com>
