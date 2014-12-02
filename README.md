# Ember Nested Routes

Example single page application built using [ember.js](http://www.emberjs.com) which is my favorite mvc javascript framework.

## Description

A list of FOLDERS where each folder consists of one-to-many ITEMS (or zero) and each item consists of one or more KEYS (or zero) where each key is a name-value pair.

    /folders => folders list
    /folders/:folder_id/items => items list for a given folder
    /folders/:folder_id/items/:item_id/keys => keys list for a given item of a given folder

Uses fixtures as well as REST for demonstration purposes.

## Installation

    git clone git@github.com:kgish/ember-nested-routes.git nested-routes
    cd nested-routes
    python -m SimpleHTTPServer
    chrome http://localhost:8000

## Author

Kiffin Gish <k.gish@zarafa.com>
