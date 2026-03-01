/**
 * MicroPlugin.js
 * Copyright (c) 2013 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.MicroPlugin = factory();
	}
}(this, function() {
	var MicroPlugin = {};

	MicroPlugin.mixin = function(Interface) {
		Interface.plugins = {};

		Interface.prototype.loadPlugins = function(plugins) {
			var i, n, key;
			for (i = 0, n = plugins.length; i < n; i++) {
				key = plugins[i];
				this.loadPlugin(key, Interface.plugins[key]);
			}
		};

		Interface.prototype.loadPlugin = function(name, plugin) {
			var plugins = this.plugins;
			var pluginFns = {};

			if (!plugin) {
				throw new Error('Unable to find "' + name + '" plugin');
			}

			if (plugins[name]) {
				return;
			}

			plugins[name] = pluginFns;
			plugin.apply(pluginFns, [this]);
		};

		Interface.prototype.getPlugin = function(name) {
			return this.plugins[name];
		};

		Interface.prototype.getPlugins = function() {
			return this.plugins;
		};
	};

	return MicroPlugin;
}));
