(function(){ var curSystem = typeof System != 'undefined' ? System : undefined;
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  function setupGlobals(global) {
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
  }
  setupGlobals(global);
  var typeOf = function(x) {
    return typeof x;
  };
  global.$traceurRuntime = {
    options: {},
    setupGlobals: setupGlobals,
    typeof: typeOf
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__3 = $traceurRuntime,
      canonicalizeUrl = $__3.canonicalizeUrl,
      resolveUrl = $__3.resolveUrl,
      isAbsolute = $__3.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  }
  function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  }
  ModuleEvaluationError.prototype = Object.create(Error.prototype);
  ModuleEvaluationError.prototype.constructor = ModuleEvaluationError;
  ModuleEvaluationError.prototype.stripError = function(message) {
    return message.replace(/.*Error:/, this.constructor.name + ':');
  };
  ModuleEvaluationError.prototype.stripCause = function(cause) {
    if (!cause)
      return '';
    if (!cause.message)
      return cause + '';
    return this.stripError(cause.message);
  };
  ModuleEvaluationError.prototype.loadedBy = function(moduleName) {
    this.stack += '\n loaded by ' + moduleName;
  };
  ModuleEvaluationError.prototype.stripStack = function(causeStack) {
    var stack = [];
    causeStack.split('\n').some(function(frame) {
      if (/UncoatedModuleInstantiator/.test(frame))
        return true;
      stack.push(frame);
    });
    stack[0] = this.stripError(stack[0]);
    return stack.join('\n');
  };
  function beforeLines(lines, number) {
    var result = [];
    var first = number - 3;
    if (first < 0)
      first = 0;
    for (var i = first; i < number; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function afterLines(lines, number) {
    var last = number + 1;
    if (last > lines.length - 1)
      last = lines.length - 1;
    var result = [];
    for (var i = number; i <= last; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function columnSpacing(columns) {
    var result = '';
    for (var i = 0; i < columns - 1; i++) {
      result += '-';
    }
    return result;
  }
  function UncoatedModuleInstantiator(url, func) {
    UncoatedModuleEntry.call(this, url, null);
    this.func = func;
  }
  UncoatedModuleInstantiator.prototype = Object.create(UncoatedModuleEntry.prototype);
  UncoatedModuleInstantiator.prototype.getUncoatedModule = function() {
    var $__2 = this;
    if (this.value_)
      return this.value_;
    try {
      var relativeRequire;
      if (typeof $traceurRuntime !== undefined && $traceurRuntime.require) {
        relativeRequire = $traceurRuntime.require.bind(null, this.url);
      }
      return this.value_ = this.func.call(global, relativeRequire);
    } catch (ex) {
      if (ex instanceof ModuleEvaluationError) {
        ex.loadedBy(this.url);
        throw ex;
      }
      if (ex.stack) {
        var lines = this.func.toString().split('\n');
        var evaled = [];
        ex.stack.split('\n').some(function(frame, index) {
          if (frame.indexOf('UncoatedModuleInstantiator.getUncoatedModule') > 0)
            return true;
          var m = /(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(frame);
          if (m) {
            var line = parseInt(m[2], 10);
            evaled = evaled.concat(beforeLines(lines, line));
            if (index === 1) {
              evaled.push(columnSpacing(m[3]) + '^ ' + $__2.url);
            } else {
              evaled.push(columnSpacing(m[3]) + '^');
            }
            evaled = evaled.concat(afterLines(lines, line));
            evaled.push('= = = = = = = = =');
          } else {
            evaled.push(frame);
          }
        });
        ex.stack = evaled.join('\n');
      }
      throw new ModuleEvaluationError(this.url, ex);
    }
  };
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach(function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    });
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== 'string')
        throw new TypeError('module name must be a string, not ' + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, function() {
        return module;
      });
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, deps, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, deps, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__2 = arguments;
            var depMap = {};
            deps.forEach(function(dep, index) {
              return depMap[dep] = $__2[index];
            });
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    }
  };
  var moduleStoreModule = new Module({ModuleStore: ModuleStore});
  ModuleStore.set('@traceur/src/runtime/ModuleStore.js', moduleStoreModule);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  $traceurRuntime.registerModule = ModuleStore.registerModule.bind(ModuleStore);
  $traceurRuntime.getModule = ModuleStore.get;
  $traceurRuntime.setModule = ModuleStore.set;
  $traceurRuntime.normalizeModuleName = ModuleStore.normalize;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/new-unique-string.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/new-unique-string.js";
  var random = Math.random;
  var counter = Date.now() % 1e9;
  function newUniqueString() {
    return '__$' + (random() * 1e9 >>> 1) + '$' + ++counter + '$__';
  }
  var $__default = newUniqueString;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/has-native-symbols.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/has-native-symbols.js";
  var v = !!Object.getOwnPropertySymbols && typeof Symbol === 'function';
  function hasNativeSymbol() {
    return v;
  }
  var $__default = hasNativeSymbol;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/symbols.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/symbols.js";
  var newUniqueString = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../new-unique-string.js", "traceur-runtime@0.0.105/src/runtime/modules/symbols.js")).default;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/modules/symbols.js")).default;
  var $create = Object.create;
  var $defineProperty = Object.defineProperty;
  var $freeze = Object.freeze;
  var $getOwnPropertyNames = Object.getOwnPropertyNames;
  var $keys = Object.keys;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var SymbolImpl = function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof SymbolImpl))
      return value;
    throw new $TypeError('Symbol cannot be new\'ed');
  };
  $defineProperty(SymbolImpl.prototype, 'constructor', nonEnum(SymbolImpl));
  $defineProperty(SymbolImpl.prototype, 'toString', nonEnum(function() {
    var symbolValue = this[symbolDataProperty];
    return symbolValue[symbolInternalProperty];
  }));
  $defineProperty(SymbolImpl.prototype, 'valueOf', nonEnum(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw $TypeError('Conversion from symbol to string');
    return symbolValue[symbolInternalProperty];
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    $freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(SymbolImpl));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: SymbolImpl.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: SymbolImpl.prototype.valueOf,
    enumerable: false
  });
  $freeze(SymbolValue.prototype);
  function isSymbolString(s) {
    return symbolValues[s];
  }
  function removeSymbolKeys(array) {
    var rv = [];
    for (var i = 0; i < array.length; i++) {
      if (!isSymbolString(array[i])) {
        rv.push(array[i]);
      }
    }
    return rv;
  }
  function getOwnPropertyNames(object) {
    return removeSymbolKeys($getOwnPropertyNames(object));
  }
  function keys(object) {
    return removeSymbolKeys($keys(object));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol) {
        rv.push(symbol);
      }
    }
    return rv;
  }
  function polyfillSymbol(global) {
    var Object = global.Object;
    if (!hasNativeSymbol()) {
      global.Symbol = SymbolImpl;
      Object.getOwnPropertyNames = getOwnPropertyNames;
      Object.keys = keys;
      $defineProperty(Object, 'getOwnPropertySymbols', nonEnum(getOwnPropertySymbols));
    }
    if (!global.Symbol.iterator) {
      global.Symbol.iterator = global.Symbol('Symbol.iterator');
    }
    if (!global.Symbol.observer) {
      global.Symbol.observer = global.Symbol('Symbol.observer');
    }
  }
  var g = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
  polyfillSymbol(g);
  var typeOf = hasNativeSymbol() ? function(x) {
    return typeof x;
  } : function(x) {
    return x instanceof SymbolValue ? 'symbol' : typeof x;
  };
  return {get typeof() {
      return typeOf;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/typeof.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/typeof.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_symbols_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./symbols.js", "traceur-runtime@0.0.105/src/runtime/modules/typeof.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_symbols_46_js__.typeof;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/symbols.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/symbols.js";
  var t = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/typeof.js", "traceur-runtime@0.0.105/src/runtime/symbols.js")).default;
  $traceurRuntime.typeof = t;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createClass.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createClass.js";
  var $Object = Object;
  var $TypeError = TypeError;
  var $__1 = Object,
      create = $__1.create,
      defineProperties = $__1.defineProperties,
      defineProperty = $__1.defineProperty,
      getOwnPropertyDescriptor = $__1.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__1.getOwnPropertyNames,
      getOwnPropertySymbols = $__1.getOwnPropertySymbols;
  function forEachPropertyKey(object, f) {
    getOwnPropertyNames(object).forEach(f);
    if (getOwnPropertySymbols) {
      getOwnPropertySymbols(object).forEach(f);
    }
  }
  function getDescriptors(object) {
    var descriptors = {};
    forEachPropertyKey(object, function(key) {
      descriptors[key] = getOwnPropertyDescriptor(object, key);
      descriptors[key].enumerable = false;
    });
    return descriptors;
  }
  var nonEnum = {enumerable: false};
  function makePropertiesNonEnumerable(object) {
    forEachPropertyKey(object, function(key) {
      defineProperty(object, key, nonEnum);
    });
  }
  function createClass(ctor, object, staticObject, superClass) {
    defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = create(getProtoParent(superClass), getDescriptors(object));
    } else {
      makePropertiesNonEnumerable(object);
      ctor.prototype = object;
    }
    defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return defineProperties(ctor, getDescriptors(staticObject));
  }
  var $__default = createClass;
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superConstructor.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superConstructor.js";
  function superConstructor(ctor) {
    return ctor.__proto__;
  }
  var $__default = superConstructor;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superDescriptor.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superDescriptor.js";
  var $__1 = Object,
      getOwnPropertyDescriptor = $__1.getOwnPropertyDescriptor,
      getPrototypeOf = $__1.getPrototypeOf;
  function superDescriptor(homeObject, name) {
    var proto = getPrototypeOf(homeObject);
    do {
      var result = getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  var $__default = superDescriptor;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superGet.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superGet.js";
  var superDescriptor = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./superDescriptor.js", "traceur-runtime@0.0.105/src/runtime/modules/superGet.js")).default;
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      var value = descriptor.value;
      if (value)
        return value;
      if (!descriptor.get)
        return value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  var $__default = superGet;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superSet.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superSet.js";
  var superDescriptor = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./superDescriptor.js", "traceur-runtime@0.0.105/src/runtime/modules/superSet.js")).default;
  var $TypeError = TypeError;
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError(("super has no setter '" + name + "'."));
  }
  var $__default = superSet;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/classes.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/classes.js";
  var createClass = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createClass.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  var superConstructor = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/superConstructor.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  var superGet = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/superGet.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  var superSet = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/superSet.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.superConstructor = superConstructor;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/exportStar.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/exportStar.js";
  var $__1 = Object,
      defineProperty = $__1.defineProperty,
      getOwnPropertyNames = $__1.getOwnPropertyNames;
  function exportStar(object) {
    var $__2 = arguments,
        $__3 = function(i) {
          var mod = $__2[i];
          var names = getOwnPropertyNames(mod);
          var $__5 = function(j) {
            var name = names[j];
            if (name === '__esModule' || name === 'default') {
              return 0;
            }
            defineProperty(object, name, {
              get: function() {
                return mod[name];
              },
              enumerable: true
            });
          },
              $__6;
          $__4: for (var j = 0; j < names.length; j++) {
            $__6 = $__5(j);
            switch ($__6) {
              case 0:
                continue $__4;
            }
          }
        };
    for (var i = 1; i < arguments.length; i++) {
      $__3(i);
    }
    return object;
  }
  var $__default = exportStar;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/exportStar.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/exportStar.js";
  var exportStar = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/exportStar.js", "traceur-runtime@0.0.105/src/runtime/exportStar.js")).default;
  $traceurRuntime.exportStar = exportStar;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/private-symbol.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/private-symbol.js";
  var newUniqueString = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./new-unique-string.js", "traceur-runtime@0.0.105/src/runtime/private-symbol.js")).default;
  var $Symbol = typeof Symbol === 'function' ? Symbol : undefined;
  var $getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var $create = Object.create;
  var privateNames = $create(null);
  function isPrivateSymbol(s) {
    return privateNames[s];
  }
  ;
  function createPrivateSymbol() {
    var s = ($Symbol || newUniqueString)();
    privateNames[s] = true;
    return s;
  }
  ;
  function hasPrivate(obj, sym) {
    return hasOwnProperty.call(obj, sym);
  }
  ;
  function deletePrivate(obj, sym) {
    if (!hasPrivate(obj, sym)) {
      return false;
    }
    delete obj[sym];
    return true;
  }
  ;
  function setPrivate(obj, sym, val) {
    obj[sym] = val;
  }
  ;
  function getPrivate(obj, sym) {
    var val = obj[sym];
    if (val === undefined)
      return undefined;
    return hasOwnProperty.call(obj, sym) ? val : undefined;
  }
  ;
  function init() {
    if ($getOwnPropertySymbols) {
      Object.getOwnPropertySymbols = function getOwnPropertySymbols(object) {
        var rv = [];
        var symbols = $getOwnPropertySymbols(object);
        for (var i = 0; i < symbols.length; i++) {
          var symbol = symbols[i];
          if (!isPrivateSymbol(symbol)) {
            rv.push(symbol);
          }
        }
        return rv;
      };
    }
  }
  return {
    get isPrivateSymbol() {
      return isPrivateSymbol;
    },
    get createPrivateSymbol() {
      return createPrivateSymbol;
    },
    get hasPrivate() {
      return hasPrivate;
    },
    get deletePrivate() {
      return deletePrivate;
    },
    get setPrivate() {
      return setPrivate;
    },
    get getPrivate() {
      return getPrivate;
    },
    get init() {
      return init;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/private-weak-map.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/private-weak-map.js";
  var $WeakMap = typeof WeakMap === 'function' ? WeakMap : undefined;
  function isPrivateSymbol(s) {
    return false;
  }
  function createPrivateSymbol() {
    return new $WeakMap();
  }
  function hasPrivate(obj, sym) {
    return sym.has(obj);
  }
  function deletePrivate(obj, sym) {
    return sym.delete(obj);
  }
  function setPrivate(obj, sym, val) {
    sym.set(obj, val);
  }
  function getPrivate(obj, sym) {
    return sym.get(obj);
  }
  function init() {}
  return {
    get isPrivateSymbol() {
      return isPrivateSymbol;
    },
    get createPrivateSymbol() {
      return createPrivateSymbol;
    },
    get hasPrivate() {
      return hasPrivate;
    },
    get deletePrivate() {
      return deletePrivate;
    },
    get setPrivate() {
      return setPrivate;
    },
    get getPrivate() {
      return getPrivate;
    },
    get init() {
      return init;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/private.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/private.js";
  var sym = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./private-symbol.js", "traceur-runtime@0.0.105/src/runtime/private.js"));
  var weak = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./private-weak-map.js", "traceur-runtime@0.0.105/src/runtime/private.js"));
  var hasWeakMap = typeof WeakMap === 'function';
  var m = hasWeakMap ? weak : sym;
  var isPrivateSymbol = m.isPrivateSymbol;
  var createPrivateSymbol = m.createPrivateSymbol;
  var hasPrivate = m.hasPrivate;
  var deletePrivate = m.deletePrivate;
  var setPrivate = m.setPrivate;
  var getPrivate = m.getPrivate;
  m.init();
  return {
    get isPrivateSymbol() {
      return isPrivateSymbol;
    },
    get createPrivateSymbol() {
      return createPrivateSymbol;
    },
    get hasPrivate() {
      return hasPrivate;
    },
    get deletePrivate() {
      return deletePrivate;
    },
    get setPrivate() {
      return setPrivate;
    },
    get getPrivate() {
      return getPrivate;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/properTailCalls.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/properTailCalls.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/modules/properTailCalls.js")),
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate,
      createPrivateSymbol = $__0.createPrivateSymbol;
  var $apply = Function.prototype.call.bind(Function.prototype.apply);
  var CONTINUATION_TYPE = Object.create(null);
  var isTailRecursiveName = null;
  function createContinuation(operand, thisArg, argsArray) {
    return [CONTINUATION_TYPE, operand, thisArg, argsArray];
  }
  function isContinuation(object) {
    return object && object[0] === CONTINUATION_TYPE;
  }
  function $bind(operand, thisArg, args) {
    var argArray = [thisArg];
    for (var i = 0; i < args.length; i++) {
      argArray[i + 1] = args[i];
    }
    var func = $apply(Function.prototype.bind, operand, argArray);
    return func;
  }
  function $construct(func, argArray) {
    var object = new ($bind(func, null, argArray));
    return object;
  }
  function isTailRecursive(func) {
    return !!getPrivate(func, isTailRecursiveName);
  }
  function tailCall(func, thisArg, argArray) {
    var continuation = argArray[0];
    if (isContinuation(continuation)) {
      continuation = $apply(func, thisArg, continuation[3]);
      return continuation;
    }
    continuation = createContinuation(func, thisArg, argArray);
    while (true) {
      if (isTailRecursive(func)) {
        continuation = $apply(func, continuation[2], [continuation]);
      } else {
        continuation = $apply(func, continuation[2], continuation[3]);
      }
      if (!isContinuation(continuation)) {
        return continuation;
      }
      func = continuation[1];
    }
  }
  function construct() {
    var object;
    if (isTailRecursive(this)) {
      object = $construct(this, [createContinuation(null, null, arguments)]);
    } else {
      object = $construct(this, arguments);
    }
    return object;
  }
  function setupProperTailCalls() {
    isTailRecursiveName = createPrivateSymbol();
    Function.prototype.call = initTailRecursiveFunction(function call(thisArg) {
      var result = tailCall(function(thisArg) {
        var argArray = [];
        for (var i = 1; i < arguments.length; ++i) {
          argArray[i - 1] = arguments[i];
        }
        var continuation = createContinuation(this, thisArg, argArray);
        return continuation;
      }, this, arguments);
      return result;
    });
    Function.prototype.apply = initTailRecursiveFunction(function apply(thisArg, argArray) {
      var result = tailCall(function(thisArg, argArray) {
        var continuation = createContinuation(this, thisArg, argArray);
        return continuation;
      }, this, arguments);
      return result;
    });
  }
  function initTailRecursiveFunction(func) {
    if (isTailRecursiveName === null) {
      setupProperTailCalls();
    }
    setPrivate(func, isTailRecursiveName, true);
    return func;
  }
  return {
    get construct() {
      return construct;
    },
    get initTailRecursiveFunction() {
      return initTailRecursiveFunction;
    },
    get call() {
      return tailCall;
    },
    get continuation() {
      return createContinuation;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/properTailCalls.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/properTailCalls.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/properTailCalls.js", "traceur-runtime@0.0.105/src/runtime/properTailCalls.js")),
      initTailRecursiveFunction = $__0.initTailRecursiveFunction,
      call = $__0.call,
      continuation = $__0.continuation,
      construct = $__0.construct;
  $traceurRuntime.initTailRecursiveFunction = initTailRecursiveFunction;
  $traceurRuntime.call = call;
  $traceurRuntime.continuation = continuation;
  $traceurRuntime.construct = construct;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/relativeRequire.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/relativeRequire.js";
  var path;
  function relativeRequire(callerPath, requiredPath) {
    path = path || typeof require !== 'undefined' && require('path');
    function isDirectory(path) {
      return path.slice(-1) === '/';
    }
    function isAbsolute(path) {
      return path[0] === '/';
    }
    function isRelative(path) {
      return path[0] === '.';
    }
    if (isDirectory(requiredPath) || isAbsolute(requiredPath))
      return;
    return isRelative(requiredPath) ? require(path.resolve(path.dirname(callerPath), requiredPath)) : require(requiredPath);
  }
  $traceurRuntime.require = relativeRequire;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/checkObjectCoercible.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/checkObjectCoercible.js";
  var $TypeError = TypeError;
  function checkObjectCoercible(v) {
    if (v === null || v === undefined) {
      throw new $TypeError('Value cannot be converted to an Object');
    }
    return v;
  }
  var $__default = checkObjectCoercible;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/spread.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/spread.js";
  var checkObjectCoercible = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../checkObjectCoercible.js", "traceur-runtime@0.0.105/src/runtime/modules/spread.js")).default;
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[Symbol.iterator] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[Symbol.iterator]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  var $__default = spread;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/spread.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/spread.js";
  var spread = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/spread.js", "traceur-runtime@0.0.105/src/runtime/spread.js")).default;
  $traceurRuntime.spread = spread;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/iteratorToArray.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/iteratorToArray.js";
  function iteratorToArray(iter) {
    var rv = [];
    var i = 0;
    var tmp;
    while (!(tmp = iter.next()).done) {
      rv[i++] = tmp.value;
    }
    return rv;
  }
  var $__default = iteratorToArray;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/destructuring.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/destructuring.js";
  var iteratorToArray = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/iteratorToArray.js", "traceur-runtime@0.0.105/src/runtime/destructuring.js")).default;
  $traceurRuntime.iteratorToArray = iteratorToArray;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/async.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/async.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/modules/async.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate;
  var $__12 = Object,
      create = $__12.create,
      defineProperty = $__12.defineProperty;
  var observeName = createPrivateSymbol();
  function AsyncGeneratorFunction() {}
  function AsyncGeneratorFunctionPrototype() {}
  AsyncGeneratorFunction.prototype = AsyncGeneratorFunctionPrototype;
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  defineProperty(AsyncGeneratorFunctionPrototype, 'constructor', {enumerable: false});
  var AsyncGeneratorContext = function() {
    function AsyncGeneratorContext(observer) {
      var $__3 = this;
      this.decoratedObserver = createDecoratedGenerator(observer, function() {
        $__3.done = true;
      });
      this.done = false;
      this.inReturn = false;
    }
    return ($traceurRuntime.createClass)(AsyncGeneratorContext, {
      throw: function(error) {
        if (!this.inReturn) {
          throw error;
        }
      },
      yield: function(value) {
        if (this.done) {
          this.inReturn = true;
          throw undefined;
        }
        var result;
        try {
          result = this.decoratedObserver.next(value);
        } catch (e) {
          this.done = true;
          throw e;
        }
        if (result === undefined) {
          return;
        }
        if (result.done) {
          this.done = true;
          this.inReturn = true;
          throw undefined;
        }
        return result.value;
      },
      yieldFor: function(observable) {
        var ctx = this;
        return observeForEach(observable[Symbol.observer].bind(observable), function(value) {
          if (ctx.done) {
            this.return();
            return;
          }
          var result;
          try {
            result = ctx.decoratedObserver.next(value);
          } catch (e) {
            ctx.done = true;
            throw e;
          }
          if (result === undefined) {
            return;
          }
          if (result.done) {
            ctx.done = true;
          }
          return result;
        });
      }
    }, {});
  }();
  AsyncGeneratorFunctionPrototype.prototype[Symbol.observer] = function(observer) {
    var observe = getPrivate(this, observeName);
    var ctx = new AsyncGeneratorContext(observer);
    schedule(function() {
      return observe(ctx);
    }).then(function(value) {
      if (!ctx.done) {
        ctx.decoratedObserver.return(value);
      }
    }).catch(function(error) {
      if (!ctx.done) {
        ctx.decoratedObserver.throw(error);
      }
    });
    return ctx.decoratedObserver;
  };
  defineProperty(AsyncGeneratorFunctionPrototype.prototype, Symbol.observer, {enumerable: false});
  function initAsyncGeneratorFunction(functionObject) {
    functionObject.prototype = create(AsyncGeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = AsyncGeneratorFunctionPrototype;
    return functionObject;
  }
  function createAsyncGeneratorInstance(observe, functionObject) {
    for (var args = [],
        $__11 = 2; $__11 < arguments.length; $__11++)
      args[$__11 - 2] = arguments[$__11];
    var object = create(functionObject.prototype);
    setPrivate(object, observeName, observe);
    return object;
  }
  function observeForEach(observe, next) {
    return new Promise(function(resolve, reject) {
      var generator = observe({
        next: function(value) {
          return next.call(generator, value);
        },
        throw: function(error) {
          reject(error);
        },
        return: function(value) {
          resolve(value);
        }
      });
    });
  }
  function schedule(asyncF) {
    return Promise.resolve().then(asyncF);
  }
  var generator = Symbol();
  var onDone = Symbol();
  var DecoratedGenerator = function() {
    function DecoratedGenerator(_generator, _onDone) {
      this[generator] = _generator;
      this[onDone] = _onDone;
    }
    return ($traceurRuntime.createClass)(DecoratedGenerator, {
      next: function(value) {
        var result = this[generator].next(value);
        if (result !== undefined && result.done) {
          this[onDone].call(this);
        }
        return result;
      },
      throw: function(error) {
        this[onDone].call(this);
        return this[generator].throw(error);
      },
      return: function(value) {
        this[onDone].call(this);
        return this[generator].return(value);
      }
    }, {});
  }();
  function createDecoratedGenerator(generator, onDone) {
    return new DecoratedGenerator(generator, onDone);
  }
  Array.prototype[Symbol.observer] = function(observer) {
    var done = false;
    var decoratedObserver = createDecoratedGenerator(observer, function() {
      return done = true;
    });
    var $__7 = true;
    var $__8 = false;
    var $__9 = undefined;
    try {
      for (var $__5 = void 0,
          $__4 = (this)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
        var value = $__5.value;
        {
          decoratedObserver.next(value);
          if (done) {
            return;
          }
        }
      }
    } catch ($__10) {
      $__8 = true;
      $__9 = $__10;
    } finally {
      try {
        if (!$__7 && $__4.return != null) {
          $__4.return();
        }
      } finally {
        if ($__8) {
          throw $__9;
        }
      }
    }
    decoratedObserver.return();
    return decoratedObserver;
  };
  defineProperty(Array.prototype, Symbol.observer, {enumerable: false});
  return {
    get initAsyncGeneratorFunction() {
      return initAsyncGeneratorFunction;
    },
    get createAsyncGeneratorInstance() {
      return createAsyncGeneratorInstance;
    },
    get observeForEach() {
      return observeForEach;
    },
    get schedule() {
      return schedule;
    },
    get createDecoratedGenerator() {
      return createDecoratedGenerator;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/initAsyncGeneratorFunction.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/initAsyncGeneratorFunction.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/initAsyncGeneratorFunction.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.initAsyncGeneratorFunction;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createAsyncGeneratorInstance.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createAsyncGeneratorInstance.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/createAsyncGeneratorInstance.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.createAsyncGeneratorInstance;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/observeForEach.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/observeForEach.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/observeForEach.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.observeForEach;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/schedule.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/schedule.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/schedule.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.schedule;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createDecoratedGenerator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createDecoratedGenerator.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/createDecoratedGenerator.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.createDecoratedGenerator;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/async.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/async.js";
  var initAsyncGeneratorFunction = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/initAsyncGeneratorFunction.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var createAsyncGeneratorInstance = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createAsyncGeneratorInstance.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var observeForEach = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/observeForEach.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var schedule = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/schedule.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var createDecoratedGenerator = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createDecoratedGenerator.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  $traceurRuntime.initAsyncGeneratorFunction = initAsyncGeneratorFunction;
  $traceurRuntime.createAsyncGeneratorInstance = createAsyncGeneratorInstance;
  $traceurRuntime.observeForEach = observeForEach;
  $traceurRuntime.schedule = schedule;
  $traceurRuntime.createDecoratedGenerator = createDecoratedGenerator;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/generators.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/generators.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/modules/generators.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate;
  var $TypeError = TypeError;
  var $__2 = Object,
      create = $__2.create,
      defineProperties = $__2.defineProperties,
      defineProperty = $__2.defineProperty;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  var RETURN_SENTINEL = {};
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.oldReturnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    maybeUncatchable: function() {
      if (this.storedException === RETURN_SENTINEL) {
        throw RETURN_SENTINEL;
      }
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    },
    wrapYieldStar: function(iterator) {
      var ctx = this;
      return {
        next: function(v) {
          return iterator.next(v);
        },
        throw: function(e) {
          var result;
          if (e === RETURN_SENTINEL) {
            if (iterator.return) {
              result = iterator.return(ctx.returnValue);
              if (!result.done) {
                ctx.returnValue = ctx.oldReturnValue;
                return result;
              }
              ctx.returnValue = result.value;
            }
            throw e;
          }
          if (iterator.throw) {
            return iterator.throw(e);
          }
          iterator.return && iterator.return();
          throw $TypeError('Inner iterator does not have a throw method');
        }
      };
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        if (x === RETURN_SENTINEL) {
          return {
            value: ctx.returnValue,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          if (x === RETURN_SENTINEL) {
            return {
              value: ctx.returnValue,
              done: true
            };
          }
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value;
        try {
          value = moveNext(ctx);
        } catch (ex) {
          if (ex === RETURN_SENTINEL) {
            value = ctx;
          } else {
            throw ex;
          }
        }
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateSymbol();
  var moveNextName = createPrivateSymbol();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(getPrivate(this, ctxName), getPrivate(this, moveNextName), 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(getPrivate(this, ctxName), getPrivate(this, moveNextName), 'throw', v);
    },
    return: function(v) {
      var ctx = getPrivate(this, ctxName);
      ctx.oldReturnValue = ctx.returnValue;
      ctx.returnValue = v;
      return nextOrThrow(ctx, getPrivate(this, moveNextName), 'throw', RETURN_SENTINEL);
    }
  };
  defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false},
    return: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = create(functionObject.prototype);
    setPrivate(object, ctxName, ctx);
    setPrivate(object, moveNextName, moveNext);
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  return {
    get createGeneratorInstance() {
      return createGeneratorInstance;
    },
    get initGeneratorFunction() {
      return initGeneratorFunction;
    },
    get asyncWrap() {
      return asyncWrap;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/asyncWrap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/asyncWrap.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/modules/asyncWrap.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__.asyncWrap;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/initGeneratorFunction.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/initGeneratorFunction.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/modules/initGeneratorFunction.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__.initGeneratorFunction;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createGeneratorInstance.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createGeneratorInstance.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/modules/createGeneratorInstance.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__.createGeneratorInstance;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/generators.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/generators.js";
  var asyncWrap = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/asyncWrap.js", "traceur-runtime@0.0.105/src/runtime/generators.js")).default;
  var initGeneratorFunction = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/initGeneratorFunction.js", "traceur-runtime@0.0.105/src/runtime/generators.js")).default;
  var createGeneratorInstance = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createGeneratorInstance.js", "traceur-runtime@0.0.105/src/runtime/generators.js")).default;
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/getTemplateObject.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/getTemplateObject.js";
  var $__1 = Object,
      defineProperty = $__1.defineProperty,
      freeze = $__1.freeze;
  var slice = Array.prototype.slice;
  var map = Object.create(null);
  function getTemplateObject(raw) {
    var cooked = arguments[1];
    var key = raw.join('${}');
    var templateObject = map[key];
    if (templateObject)
      return templateObject;
    if (!cooked) {
      cooked = slice.call(raw);
    }
    return map[key] = freeze(defineProperty(cooked, 'raw', {value: freeze(raw)}));
  }
  var $__default = getTemplateObject;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/template.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/template.js";
  var getTemplateObject = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/getTemplateObject.js", "traceur-runtime@0.0.105/src/runtime/template.js")).default;
  $traceurRuntime.getTemplateObject = getTemplateObject;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/spreadProperties.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/spreadProperties.js";
  var $__1 = Object,
      defineProperty = $__1.defineProperty,
      getOwnPropertyNames = $__1.getOwnPropertyNames,
      getOwnPropertySymbols = $__1.getOwnPropertySymbols,
      propertyIsEnumerable = $__1.propertyIsEnumerable;
  function createDataProperty(o, p, v) {
    defineProperty(o, p, {
      configurable: true,
      enumerable: true,
      value: v,
      writable: true
    });
  }
  function copyDataProperties(target, source) {
    if (source == null) {
      return;
    }
    var copy = function(keys) {
      for (var i = 0; i < keys.length; i++) {
        var nextKey = keys[i];
        if (propertyIsEnumerable.call(source, nextKey)) {
          var propValue = source[nextKey];
          createDataProperty(target, nextKey, propValue);
        }
      }
    };
    copy(getOwnPropertyNames(source));
    copy(getOwnPropertySymbols(source));
  }
  var $__default = function() {
    var target = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      copyDataProperties(target, arguments[i]);
    }
    return target;
  };
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/jsx.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/jsx.js";
  var spreadProperties = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/spreadProperties.js", "traceur-runtime@0.0.105/src/runtime/jsx.js")).default;
  $traceurRuntime.spreadProperties = spreadProperties;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/runtime-modules.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/runtime-modules.js";
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./symbols.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./classes.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./exportStar.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./properTailCalls.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./relativeRequire.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./spread.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./destructuring.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./template.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./jsx.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  return {};
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/runtime-modules.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/frozen-data.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/frozen-data.js";
  function findIndex(arr, key) {
    for (var i = 0; i < arr.length; i += 2) {
      if (arr[i] === key) {
        return i;
      }
    }
    return -1;
  }
  function setFrozen(arr, key, val) {
    var i = findIndex(arr, key);
    if (i === -1) {
      arr.push(key, val);
    }
  }
  function getFrozen(arr, key) {
    var i = findIndex(arr, key);
    if (i !== -1) {
      return arr[i + 1];
    }
    return undefined;
  }
  function hasFrozen(arr, key) {
    return findIndex(arr, key) !== -1;
  }
  function deleteFrozen(arr, key) {
    var i = findIndex(arr, key);
    if (i !== -1) {
      arr.splice(i, 2);
      return true;
    }
    return false;
  }
  return {
    get setFrozen() {
      return setFrozen;
    },
    get getFrozen() {
      return getFrozen;
    },
    get hasFrozen() {
      return hasFrozen;
    },
    get deleteFrozen() {
      return deleteFrozen;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/utils.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/utils.js";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var $TypeError = TypeError;
  var $Object = Object;
  function toObject(x) {
    if (x == null) {
      throw $TypeError();
    }
    return $Object(x);
  }
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach(function(f) {
      return f(global);
    });
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Map.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../frozen-data.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")),
      deleteFrozen = $__1.deleteFrozen,
      getFrozen = $__1.getFrozen,
      setFrozen = $__1.setFrozen;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")),
      isObject = $__2.isObject,
      registerPolyfill = $__2.registerPolyfill;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")).default;
  var $__13 = Object,
      defineProperty = $__13.defineProperty,
      getOwnPropertyDescriptor = $__13.getOwnPropertyDescriptor,
      hasOwnProperty = $__13.hasOwnProperty,
      isExtensible = $__13.isExtensible;
  var deletedSentinel = {};
  var counter = 1;
  var hashCodeName = createPrivateSymbol();
  function getHashCodeForObject(obj) {
    return getPrivate(obj, hashCodeName);
  }
  function getOrSetHashCodeForObject(obj) {
    var hash = getHashCodeForObject(obj);
    if (!hash) {
      hash = counter++;
      setPrivate(obj, hashCodeName, hash);
    }
    return hash;
  }
  function lookupIndex(map, key) {
    if (typeof key === 'string') {
      return map.stringIndex_[key];
    }
    if (isObject(key)) {
      if (!isExtensible(key)) {
        return getFrozen(map.frozenData_, key);
      }
      var hc = getHashCodeForObject(key);
      if (hc === undefined) {
        return undefined;
      }
      return map.objectIndex_[hc];
    }
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.frozenData_ = [];
    map.deletedCount_ = 0;
  }
  var Map = function() {
    function Map() {
      var $__15,
          $__16;
      var iterable = arguments[0];
      if (!isObject(this))
        throw new TypeError('Map called on incompatible type');
      if (hasOwnProperty.call(this, 'entries_')) {
        throw new TypeError('Map can not be reentrantly initialised');
      }
      initMap(this);
      if (iterable !== null && iterable !== undefined) {
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (iterable)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var $__14 = $__7.value,
                key = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value),
                value = ($__16 = $__15.next()).done ? void 0 : $__16.value;
            {
              this.set(key, value);
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      }
    }
    return ($traceurRuntime.createClass)(Map, {
      get size() {
        return this.entries_.length / 2 - this.deletedCount_;
      },
      get: function(key) {
        var index = lookupIndex(this, key);
        if (index !== undefined) {
          return this.entries_[index + 1];
        }
      },
      set: function(key, value) {
        var index = lookupIndex(this, key);
        if (index !== undefined) {
          this.entries_[index + 1] = value;
        } else {
          index = this.entries_.length;
          this.entries_[index] = key;
          this.entries_[index + 1] = value;
          if (isObject(key)) {
            if (!isExtensible(key)) {
              setFrozen(this.frozenData_, key, index);
            } else {
              var hash = getOrSetHashCodeForObject(key);
              this.objectIndex_[hash] = index;
            }
          } else if (typeof key === 'string') {
            this.stringIndex_[key] = index;
          } else {
            this.primitiveIndex_[key] = index;
          }
        }
        return this;
      },
      has: function(key) {
        return lookupIndex(this, key) !== undefined;
      },
      delete: function(key) {
        var index = lookupIndex(this, key);
        if (index === undefined) {
          return false;
        }
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
        if (isObject(key)) {
          if (!isExtensible(key)) {
            deleteFrozen(this.frozenData_, key);
          } else {
            var hash = getHashCodeForObject(key);
            delete this.objectIndex_[hash];
          }
        } else if (typeof key === 'string') {
          delete this.stringIndex_[key];
        } else {
          delete this.primitiveIndex_[key];
        }
        return true;
      },
      clear: function() {
        initMap(this);
      },
      forEach: function(callbackFn) {
        var thisArg = arguments[1];
        for (var i = 0; i < this.entries_.length; i += 2) {
          var key = this.entries_[i];
          var value = this.entries_[i + 1];
          if (key === deletedSentinel)
            continue;
          callbackFn.call(thisArg, value, key, this);
        }
      },
      entries: $traceurRuntime.initGeneratorFunction(function $__17() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return [key, value];
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__17, this);
      }),
      keys: $traceurRuntime.initGeneratorFunction(function $__18() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return key;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__18, this);
      }),
      values: $traceurRuntime.initGeneratorFunction(function $__19() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return value;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__19, this);
      })
    }, {});
  }();
  defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function needsPolyfill(global) {
    var $__14 = global,
        Map = $__14.Map,
        Symbol = $__14.Symbol;
    if (!Map || !hasNativeSymbol() || !Map.prototype[Symbol.iterator] || !Map.prototype.entries) {
      return true;
    }
    try {
      return new Map([[]]).size !== 1;
    } catch (e) {
      return false;
    }
  }
  function polyfillMap(global) {
    if (needsPolyfill(global)) {
      global.Map = Map;
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Map.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Set.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js")),
      isObject = $__0.isObject,
      registerPolyfill = $__0.registerPolyfill;
  var Map = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Map.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js")).Map;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js")).default;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var Set = function() {
    function Set() {
      var iterable = arguments[0];
      if (!isObject(this))
        throw new TypeError('Set called on incompatible type');
      if (hasOwnProperty.call(this, 'map_')) {
        throw new TypeError('Set can not be reentrantly initialised');
      }
      this.map_ = new Map();
      if (iterable !== null && iterable !== undefined) {
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (iterable)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var item = $__7.value;
            {
              this.add(item);
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      }
    }
    return ($traceurRuntime.createClass)(Set, {
      get size() {
        return this.map_.size;
      },
      has: function(key) {
        return this.map_.has(key);
      },
      add: function(key) {
        this.map_.set(key, key);
        return this;
      },
      delete: function(key) {
        return this.map_.delete(key);
      },
      clear: function() {
        return this.map_.clear();
      },
      forEach: function(callbackFn) {
        var thisArg = arguments[1];
        var $__5 = this;
        return this.map_.forEach(function(value, key) {
          callbackFn.call(thisArg, key, key, $__5);
        });
      },
      values: $traceurRuntime.initGeneratorFunction(function $__15() {
        var $__16,
            $__17;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__16 = $ctx.wrapYieldStar(this.map_.keys()[Symbol.iterator]());
                $ctx.sent = void 0;
                $ctx.action = 'next';
                $ctx.state = 12;
                break;
              case 12:
                $__17 = $__16[$ctx.action]($ctx.sentIgnoreThrow);
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = ($__17.done) ? 3 : 2;
                break;
              case 3:
                $ctx.sent = $__17.value;
                $ctx.state = -2;
                break;
              case 2:
                $ctx.state = 12;
                return $__17.value;
              default:
                return $ctx.end();
            }
        }, $__15, this);
      }),
      entries: $traceurRuntime.initGeneratorFunction(function $__18() {
        var $__19,
            $__20;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__19 = $ctx.wrapYieldStar(this.map_.entries()[Symbol.iterator]());
                $ctx.sent = void 0;
                $ctx.action = 'next';
                $ctx.state = 12;
                break;
              case 12:
                $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = ($__20.done) ? 3 : 2;
                break;
              case 3:
                $ctx.sent = $__20.value;
                $ctx.state = -2;
                break;
              case 2:
                $ctx.state = 12;
                return $__20.value;
              default:
                return $ctx.end();
            }
        }, $__18, this);
      })
    }, {});
  }();
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function needsPolyfill(global) {
    var $__14 = global,
        Set = $__14.Set,
        Symbol = $__14.Symbol;
    if (!Set || !hasNativeSymbol() || !Set.prototype[Symbol.iterator] || !Set.prototype.values) {
      return true;
    }
    try {
      return new Set([1]).size !== 1;
    } catch (e) {
      return false;
    }
  }
  function polyfillSet(global) {
    if (needsPolyfill(global)) {
      global.Set = Set;
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Set.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/node_modules/rsvp/lib/rsvp/asap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/node_modules/rsvp/lib/rsvp/asap.js";
  var len = 0;
  var toString = {}.toString;
  var vertxNext;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserWindow = (typeof window !== 'undefined') ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    var nextTick = process.nextTick;
    var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
      nextTick = setImmediate;
    }
    return function() {
      nextTick(flush);
    };
  }
  function useVertxTimer() {
    return function() {
      vertxNext(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  function attemptVertex() {
    try {
      var r = require;
      var vertx = r('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }
  var scheduleFlush;
  if (isNode) {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else if (browserWindow === undefined && typeof require === 'function') {
    scheduleFlush = attemptVertex();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js";
  var async = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../../../node_modules/rsvp/lib/rsvp/asap.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js")).default;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js")),
      isObject = $__1.isObject,
      registerPolyfill = $__1.registerPolyfill;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js")),
      createPrivateSymbol = $__2.createPrivateSymbol,
      getPrivate = $__2.getPrivate,
      setPrivate = $__2.setPrivate;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: function(x) {
          promiseResolve(promise, x);
        },
        reject: function(r) {
          promiseReject(promise, r);
        }
      };
    } else {
      var result = {};
      result.promise = new C(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      });
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function() {
    function Promise(resolver) {
      if (resolver === promiseRaw)
        return;
      if (typeof resolver !== 'function')
        throw new TypeError;
      var promise = promiseInit(this);
      try {
        resolver(function(x) {
          promiseResolve(promise, x);
        }, function(r) {
          promiseReject(promise, r);
        });
      } catch (e) {
        promiseReject(promise, e);
      }
    }
    return ($traceurRuntime.createClass)(Promise, {
      catch: function(onReject) {
        return this.then(undefined, onReject);
      },
      then: function(onResolve, onReject) {
        if (typeof onResolve !== 'function')
          onResolve = idResolveHandler;
        if (typeof onReject !== 'function')
          onReject = idRejectHandler;
        var that = this;
        var constructor = this.constructor;
        return chain(this, function(x) {
          x = promiseCoerce(constructor, x);
          return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
        }, onReject);
      }
    }, {
      resolve: function(x) {
        if (this === $Promise) {
          if (isPromise(x)) {
            return x;
          }
          return promiseSet(new $Promise(promiseRaw), +1, x);
        } else {
          return new this(function(resolve, reject) {
            resolve(x);
          });
        }
      },
      reject: function(r) {
        if (this === $Promise) {
          return promiseSet(new $Promise(promiseRaw), -1, r);
        } else {
          return new this(function(resolve, reject) {
            reject(r);
          });
        }
      },
      all: function(values) {
        var deferred = getDeferred(this);
        var resolutions = [];
        try {
          var makeCountdownFunction = function(i) {
            return function(x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            };
          };
          var count = 0;
          var i = 0;
          var $__7 = true;
          var $__8 = false;
          var $__9 = undefined;
          try {
            for (var $__5 = void 0,
                $__4 = (values)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
              var value = $__5.value;
              {
                var countdownFunction = makeCountdownFunction(i);
                this.resolve(value).then(countdownFunction, function(r) {
                  deferred.reject(r);
                });
                ++i;
                ++count;
              }
            }
          } catch ($__10) {
            $__8 = true;
            $__9 = $__10;
          } finally {
            try {
              if (!$__7 && $__4.return != null) {
                $__4.return();
              }
            } finally {
              if ($__8) {
                throw $__9;
              }
            }
          }
          if (count === 0) {
            deferred.resolve(resolutions);
          }
        } catch (e) {
          deferred.reject(e);
        }
        return deferred.promise;
      },
      race: function(values) {
        var deferred = getDeferred(this);
        try {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(x) {
              deferred.resolve(x);
            }, function(r) {
              deferred.reject(r);
            });
          }
        } catch (e) {
          deferred.reject(e);
        }
        return deferred.promise;
      }
    });
  }();
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async(function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    });
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = createPrivateSymbol();
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        setPrivate(x, thenableSymbol, promise);
        return promise;
      }
      if (typeof then === 'function') {
        var p = getPrivate(x, thenableSymbol);
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          setPrivate(x, thenableSymbol, deferred.promise);
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/StringIterator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/StringIterator.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/StringIterator.js")),
      createIteratorResultObject = $__0.createIteratorResultObject,
      isObject = $__0.isObject;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function() {
    var $__3;
    function StringIterator() {}
    return ($traceurRuntime.createClass)(StringIterator, ($__3 = {}, Object.defineProperty($__3, "next", {
      value: function() {
        var o = this;
        if (!isObject(o) || !hasOwnProperty.call(o, iteratedString)) {
          throw new TypeError('this must be a StringIterator object');
        }
        var s = o[iteratedString];
        if (s === undefined) {
          return createIteratorResultObject(undefined, true);
        }
        var position = o[stringIteratorNextIndex];
        var len = s.length;
        if (position >= len) {
          o[iteratedString] = undefined;
          return createIteratorResultObject(undefined, true);
        }
        var first = s.charCodeAt(position);
        var resultString;
        if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
          resultString = String.fromCharCode(first);
        } else {
          var second = s.charCodeAt(position + 1);
          if (second < 0xDC00 || second > 0xDFFF) {
            resultString = String.fromCharCode(first);
          } else {
            resultString = String.fromCharCode(first) + String.fromCharCode(second);
          }
        }
        o[stringIteratorNextIndex] = position + resultString.length;
        return createIteratorResultObject(resultString, false);
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__3, Symbol.iterator, {
      value: function() {
        return this;
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), $__3), {});
  }();
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[iteratedString] = s;
    iterator[stringIteratorNextIndex] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/String.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/String.js";
  var checkObjectCoercible = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../checkObjectCoercible.js", "traceur-runtime@0.0.105/src/runtime/polyfills/String.js")).default;
  var createStringIterator = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./StringIterator.js", "traceur-runtime@0.0.105/src/runtime/polyfills/String.js")).createStringIterator;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/String.js")),
      maybeAddFunctions = $__2.maybeAddFunctions,
      maybeAddIterator = $__2.maybeAddIterator,
      registerPolyfill = $__2.registerPolyfill;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function includes(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    if (search && $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (pos != pos) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    if (searchLength + start > stringLength) {
      return false;
    }
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint(_) {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'endsWith', endsWith, 'includes', includes, 'repeat', repeat, 'startsWith', startsWith]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get includes() {
      return includes;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/String.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/ArrayIterator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/ArrayIterator.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/ArrayIterator.js")),
      toObject = $__0.toObject,
      toUint32 = $__0.toUint32,
      createIteratorResultObject = $__0.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function() {
    var $__3;
    function ArrayIterator() {}
    return ($traceurRuntime.createClass)(ArrayIterator, ($__3 = {}, Object.defineProperty($__3, "next", {
      value: function() {
        var iterator = toObject(this);
        var array = iterator.iteratorObject_;
        if (!array) {
          throw new TypeError('Object is not an ArrayIterator');
        }
        var index = iterator.arrayIteratorNextIndex_;
        var itemKind = iterator.arrayIterationKind_;
        var length = toUint32(array.length);
        if (index >= length) {
          iterator.arrayIteratorNextIndex_ = Infinity;
          return createIteratorResultObject(undefined, true);
        }
        iterator.arrayIteratorNextIndex_ = index + 1;
        if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
          return createIteratorResultObject(array[index], false);
        if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
          return createIteratorResultObject([index, array[index]], false);
        return createIteratorResultObject(index, false);
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__3, Symbol.iterator, {
      value: function() {
        return this;
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), $__3), {});
  }();
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Array.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Array.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./ArrayIterator.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Array.js")),
      entries = $__0.entries,
      keys = $__0.keys,
      jsValues = $__0.values;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Array.js")),
      checkIterable = $__1.checkIterable,
      isCallable = $__1.isCallable,
      isConstructor = $__1.isConstructor,
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill,
      toInteger = $__1.toInteger,
      toLength = $__1.toLength,
      toObject = $__1.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      var $__6 = true;
      var $__7 = false;
      var $__8 = undefined;
      try {
        for (var $__4 = void 0,
            $__3 = (items)[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
          var item = $__4.value;
          {
            if (mapping) {
              arr[k] = mapFn.call(thisArg, item, k);
            } else {
              arr[k] = item;
            }
            k++;
          }
        }
      } catch ($__9) {
        $__7 = true;
        $__8 = $__9;
      } finally {
        try {
          if (!$__6 && $__3.return != null) {
            $__3.return();
          }
        } finally {
          if ($__7) {
            throw $__8;
          }
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__10 = 0; $__10 < arguments.length; $__10++)
      items[$__10] = arguments[$__10];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      var value = object[i];
      if (predicate.call(thisArg, value, i, object)) {
        return returnIndex ? i : value;
      }
    }
    return returnIndex ? -1 : undefined;
  }
  function polyfillArray(global) {
    var $__11 = global,
        Array = $__11.Array,
        Object = $__11.Object,
        Symbol = $__11.Symbol;
    var values = jsValues;
    if (Symbol && Symbol.iterator && Array.prototype[Symbol.iterator]) {
      values = Array.prototype[Symbol.iterator];
    }
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Array.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/assign.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/assign.js";
  var keys = Object.keys;
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = source == null ? [] : keys(source);
      var p = void 0,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        target[name] = source[name];
      }
    }
    return target;
  }
  var $__default = assign;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Object.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Object.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Object.js")),
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill;
  var assign = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./assign.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Object.js")).default;
  var $__3 = Object,
      defineProperty = $__3.defineProperty,
      getOwnPropertyDescriptor = $__3.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__3.getOwnPropertyNames;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get assign() {
      return assign;
    },
    get is() {
      return is;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Object.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Number.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Number.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Number.js")),
      isNumber = $__0.isNumber,
      maybeAddConsts = $__0.maybeAddConsts,
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill,
      toInteger = $__0.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Number.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/fround.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/fround.js";
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $__1 = Math,
      LN2 = $__1.LN2,
      abs = $__1.abs,
      floor = $__1.floor,
      log = $__1.log,
      min = $__1.min,
      pow = $__1.pow;
  function packIEEE754(v, ebits, fbits) {
    var bias = (1 << (ebits - 1)) - 1,
        s,
        e,
        f,
        ln,
        i,
        bits,
        str,
        bytes;
    function roundToEven(n) {
      var w = floor(n),
          f = n - w;
      if (f < 0.5)
        return w;
      if (f > 0.5)
        return w + 1;
      return w % 2 ? w + 1 : w;
    }
    if (v !== v) {
      e = (1 << ebits) - 1;
      f = pow(2, fbits - 1);
      s = 0;
    } else if (v === Infinity || v === -Infinity) {
      e = (1 << ebits) - 1;
      f = 0;
      s = (v < 0) ? 1 : 0;
    } else if (v === 0) {
      e = 0;
      f = 0;
      s = (1 / v === -Infinity) ? 1 : 0;
    } else {
      s = v < 0;
      v = abs(v);
      if (v >= pow(2, 1 - bias)) {
        e = min(floor(log(v) / LN2), 1023);
        f = roundToEven(v / pow(2, e) * pow(2, fbits));
        if (f / pow(2, fbits) >= 2) {
          e = e + 1;
          f = 1;
        }
        if (e > bias) {
          e = (1 << ebits) - 1;
          f = 0;
        } else {
          e = e + bias;
          f = f - pow(2, fbits);
        }
      } else {
        e = 0;
        f = roundToEven(v / pow(2, 1 - bias - fbits));
      }
    }
    bits = [];
    for (i = fbits; i; i -= 1) {
      bits.push(f % 2 ? 1 : 0);
      f = floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
      bits.push(e % 2 ? 1 : 0);
      e = floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    str = bits.join('');
    bytes = [];
    while (str.length) {
      bytes.push(parseInt(str.substring(0, 8), 2));
      str = str.substring(8);
    }
    return bytes;
  }
  function unpackIEEE754(bytes, ebits, fbits) {
    var bits = [],
        i,
        j,
        b,
        str,
        bias,
        s,
        e,
        f;
    for (i = bytes.length; i; i -= 1) {
      b = bytes[i - 1];
      for (j = 8; j; j -= 1) {
        bits.push(b % 2 ? 1 : 0);
        b = b >> 1;
      }
    }
    bits.reverse();
    str = bits.join('');
    bias = (1 << (ebits - 1)) - 1;
    s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    e = parseInt(str.substring(1, 1 + ebits), 2);
    f = parseInt(str.substring(1 + ebits), 2);
    if (e === (1 << ebits) - 1) {
      return f !== 0 ? NaN : s * Infinity;
    } else if (e > 0) {
      return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
    } else if (f !== 0) {
      return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
    } else {
      return s < 0 ? -0 : 0;
    }
  }
  function unpackF32(b) {
    return unpackIEEE754(b, 8, 23);
  }
  function packF32(v) {
    return packIEEE754(v, 8, 23);
  }
  function fround(x) {
    if (x === 0 || !$isFinite(x) || $isNaN(x)) {
      return x;
    }
    return unpackF32(packF32(Number(x)));
  }
  return {get fround() {
      return fround;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Math.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Math.js";
  var jsFround = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./fround.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Math.js")).fround;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Math.js")),
      maybeAddFunctions = $__1.maybeAddFunctions,
      registerPolyfill = $__1.registerPolyfill,
      toUint32 = $__1.toUint32;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $__3 = Math,
      abs = $__3.abs,
      ceil = $__3.ceil,
      exp = $__3.exp,
      floor = $__3.floor,
      log = $__3.log,
      pow = $__3.pow,
      sqrt = $__3.sqrt;
  function clz32(x) {
    x = toUint32(+x);
    if (x == 0)
      return 32;
    var result = 0;
    if ((x & 0xFFFF0000) === 0) {
      x <<= 16;
      result += 16;
    }
    ;
    if ((x & 0xFF000000) === 0) {
      x <<= 8;
      result += 8;
    }
    ;
    if ((x & 0xF0000000) === 0) {
      x <<= 4;
      result += 4;
    }
    ;
    if ((x & 0xC0000000) === 0) {
      x <<= 2;
      result += 2;
    }
    ;
    if ((x & 0x80000000) === 0) {
      x <<= 1;
      result += 1;
    }
    ;
    return result;
  }
  function imul(x, y) {
    x = toUint32(+x);
    y = toUint32(+y);
    var xh = (x >>> 16) & 0xffff;
    var xl = x & 0xffff;
    var yh = (y >>> 16) & 0xffff;
    var yl = y & 0xffff;
    return xl * yl + (((xh * yl + xl * yh) << 16) >>> 0) | 0;
  }
  function sign(x) {
    x = +x;
    if (x > 0)
      return 1;
    if (x < 0)
      return -1;
    return x;
  }
  function log10(x) {
    return log(x) * 0.434294481903251828;
  }
  function log2(x) {
    return log(x) * 1.442695040888963407;
  }
  function log1p(x) {
    x = +x;
    if (x < -1 || $isNaN(x)) {
      return NaN;
    }
    if (x === 0 || x === Infinity) {
      return x;
    }
    if (x === -1) {
      return -Infinity;
    }
    var result = 0;
    var n = 50;
    if (x < 0 || x > 1) {
      return log(1 + x);
    }
    for (var i = 1; i < n; i++) {
      if ((i % 2) === 0) {
        result -= pow(x, i) / i;
      } else {
        result += pow(x, i) / i;
      }
    }
    return result;
  }
  function expm1(x) {
    x = +x;
    if (x === -Infinity) {
      return -1;
    }
    if (!$isFinite(x) || x === 0) {
      return x;
    }
    return exp(x) - 1;
  }
  function cosh(x) {
    x = +x;
    if (x === 0) {
      return 1;
    }
    if ($isNaN(x)) {
      return NaN;
    }
    if (!$isFinite(x)) {
      return Infinity;
    }
    if (x < 0) {
      x = -x;
    }
    if (x > 21) {
      return exp(x) / 2;
    }
    return (exp(x) + exp(-x)) / 2;
  }
  function sinh(x) {
    x = +x;
    if (!$isFinite(x) || x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  }
  function tanh(x) {
    x = +x;
    if (x === 0)
      return x;
    if (!$isFinite(x))
      return sign(x);
    var exp1 = exp(x);
    var exp2 = exp(-x);
    return (exp1 - exp2) / (exp1 + exp2);
  }
  function acosh(x) {
    x = +x;
    if (x < 1)
      return NaN;
    if (!$isFinite(x))
      return x;
    return log(x + sqrt(x + 1) * sqrt(x - 1));
  }
  function asinh(x) {
    x = +x;
    if (x === 0 || !$isFinite(x))
      return x;
    if (x > 0)
      return log(x + sqrt(x * x + 1));
    return -log(-x + sqrt(x * x + 1));
  }
  function atanh(x) {
    x = +x;
    if (x === -1) {
      return -Infinity;
    }
    if (x === 1) {
      return Infinity;
    }
    if (x === 0) {
      return x;
    }
    if ($isNaN(x) || x < -1 || x > 1) {
      return NaN;
    }
    return 0.5 * log((1 + x) / (1 - x));
  }
  function hypot(x, y) {
    var length = arguments.length;
    var args = new Array(length);
    var max = 0;
    for (var i = 0; i < length; i++) {
      var n = arguments[i];
      n = +n;
      if (n === Infinity || n === -Infinity)
        return Infinity;
      n = abs(n);
      if (n > max)
        max = n;
      args[i] = n;
    }
    if (max === 0)
      max = 1;
    var sum = 0;
    var compensation = 0;
    for (var i = 0; i < length; i++) {
      var n = args[i] / max;
      var summand = n * n - compensation;
      var preliminary = sum + summand;
      compensation = (preliminary - sum) - summand;
      sum = preliminary;
    }
    return sqrt(sum) * max;
  }
  function trunc(x) {
    x = +x;
    if (x > 0)
      return floor(x);
    if (x < 0)
      return ceil(x);
    return x;
  }
  var fround,
      f32;
  if (typeof Float32Array === 'function') {
    f32 = new Float32Array(1);
    fround = function(x) {
      f32[0] = Number(x);
      return f32[0];
    };
  } else {
    fround = jsFround;
  }
  function cbrt(x) {
    x = +x;
    if (x === 0)
      return x;
    var negate = x < 0;
    if (negate)
      x = -x;
    var result = pow(x, 1 / 3);
    return negate ? -result : result;
  }
  function polyfillMath(global) {
    var Math = global.Math;
    maybeAddFunctions(Math, ['acosh', acosh, 'asinh', asinh, 'atanh', atanh, 'cbrt', cbrt, 'clz32', clz32, 'cosh', cosh, 'expm1', expm1, 'fround', fround, 'hypot', hypot, 'imul', imul, 'log10', log10, 'log1p', log1p, 'log2', log2, 'sign', sign, 'sinh', sinh, 'tanh', tanh, 'trunc', trunc]);
  }
  registerPolyfill(polyfillMath);
  return {
    get clz32() {
      return clz32;
    },
    get imul() {
      return imul;
    },
    get sign() {
      return sign;
    },
    get log10() {
      return log10;
    },
    get log2() {
      return log2;
    },
    get log1p() {
      return log1p;
    },
    get expm1() {
      return expm1;
    },
    get cosh() {
      return cosh;
    },
    get sinh() {
      return sinh;
    },
    get tanh() {
      return tanh;
    },
    get acosh() {
      return acosh;
    },
    get asinh() {
      return asinh;
    },
    get atanh() {
      return atanh;
    },
    get hypot() {
      return hypot;
    },
    get trunc() {
      return trunc;
    },
    get fround() {
      return fround;
    },
    get cbrt() {
      return cbrt;
    },
    get polyfillMath() {
      return polyfillMath;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Math.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      deletePrivate = $__0.deletePrivate,
      getPrivate = $__0.getPrivate,
      hasPrivate = $__0.hasPrivate,
      setPrivate = $__0.setPrivate;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../frozen-data.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")),
      deleteFrozen = $__1.deleteFrozen,
      getFrozen = $__1.getFrozen,
      hasFrozen = $__1.hasFrozen,
      setFrozen = $__1.setFrozen;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")),
      isObject = $__2.isObject,
      registerPolyfill = $__2.registerPolyfill;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")).default;
  var $__6 = Object,
      defineProperty = $__6.defineProperty,
      getOwnPropertyDescriptor = $__6.getOwnPropertyDescriptor,
      isExtensible = $__6.isExtensible;
  var $TypeError = TypeError;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var sentinel = {};
  var WeakMap = function() {
    function WeakMap() {
      this.name_ = createPrivateSymbol();
      this.frozenData_ = [];
    }
    return ($traceurRuntime.createClass)(WeakMap, {
      set: function(key, value) {
        if (!isObject(key))
          throw new $TypeError('key must be an object');
        if (!isExtensible(key)) {
          setFrozen(this.frozenData_, key, value);
        } else {
          setPrivate(key, this.name_, value);
        }
        return this;
      },
      get: function(key) {
        if (!isObject(key))
          return undefined;
        if (!isExtensible(key)) {
          return getFrozen(this.frozenData_, key);
        }
        return getPrivate(key, this.name_);
      },
      delete: function(key) {
        if (!isObject(key))
          return false;
        if (!isExtensible(key)) {
          return deleteFrozen(this.frozenData_, key);
        }
        return deletePrivate(key, this.name_);
      },
      has: function(key) {
        if (!isObject(key))
          return false;
        if (!isExtensible(key)) {
          return hasFrozen(this.frozenData_, key);
        }
        return hasPrivate(key, this.name_);
      }
    }, {});
  }();
  function needsPolyfill(global) {
    var $__8 = global,
        WeakMap = $__8.WeakMap,
        Symbol = $__8.Symbol;
    if (!WeakMap || !hasNativeSymbol()) {
      return true;
    }
    try {
      var o = {};
      var wm = new WeakMap([[o, false]]);
      return wm.get(o);
    } catch (e) {
      return false;
    }
  }
  function polyfillWeakMap(global) {
    if (needsPolyfill(global)) {
      global.WeakMap = WeakMap;
    }
  }
  registerPolyfill(polyfillWeakMap);
  return {
    get WeakMap() {
      return WeakMap;
    },
    get polyfillWeakMap() {
      return polyfillWeakMap;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      deletePrivate = $__0.deletePrivate,
      getPrivate = $__0.getPrivate,
      hasPrivate = $__0.hasPrivate,
      setPrivate = $__0.setPrivate;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../frozen-data.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")),
      deleteFrozen = $__1.deleteFrozen,
      getFrozen = $__1.getFrozen,
      setFrozen = $__1.setFrozen;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")),
      isObject = $__2.isObject,
      registerPolyfill = $__2.registerPolyfill;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")).default;
  var $__6 = Object,
      defineProperty = $__6.defineProperty,
      isExtensible = $__6.isExtensible;
  var $TypeError = TypeError;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var WeakSet = function() {
    function WeakSet() {
      this.name_ = createPrivateSymbol();
      this.frozenData_ = [];
    }
    return ($traceurRuntime.createClass)(WeakSet, {
      add: function(value) {
        if (!isObject(value))
          throw new $TypeError('value must be an object');
        if (!isExtensible(value)) {
          setFrozen(this.frozenData_, value, value);
        } else {
          setPrivate(value, this.name_, true);
        }
        return this;
      },
      delete: function(value) {
        if (!isObject(value))
          return false;
        if (!isExtensible(value)) {
          return deleteFrozen(this.frozenData_, value);
        }
        return deletePrivate(value, this.name_);
      },
      has: function(value) {
        if (!isObject(value))
          return false;
        if (!isExtensible(value)) {
          return getFrozen(this.frozenData_, value) === value;
        }
        return hasPrivate(value, this.name_);
      }
    }, {});
  }();
  function needsPolyfill(global) {
    var $__8 = global,
        WeakSet = $__8.WeakSet,
        Symbol = $__8.Symbol;
    if (!WeakSet || !hasNativeSymbol()) {
      return true;
    }
    try {
      var o = {};
      var wm = new WeakSet([[o]]);
      return !wm.has(o);
    } catch (e) {
      return false;
    }
  }
  function polyfillWeakSet(global) {
    if (needsPolyfill(global)) {
      global.WeakSet = WeakSet;
    }
  }
  registerPolyfill(polyfillWeakSet);
  return {
    get WeakSet() {
      return WeakSet;
    },
    get polyfillWeakSet() {
      return polyfillWeakSet;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js";
  var polyfillAll = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js")).polyfillAll;
  polyfillAll(Reflect.global);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js" + '');

System = curSystem; })();
!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v?c.default=c.__useDefault=v:f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], ["1d","d","24","1b","1c"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("b", [], function($__export) {
  "use strict";
  var noop;
  return {
    setters: [],
    execute: function() {
      noop = function() {};
      $__export("noop", noop);
    }
  };
});

$__System.register("c", ["d", "e", "f", "10", "11"], function($__export) {
  "use strict";
  var Component,
      ContentChild,
      EventEmitter,
      Inject,
      Input,
      Output,
      TemplateRef,
      ViewChild,
      TreeService,
      TreeTypes,
      Tree,
      i0,
      i1,
      i2,
      _c0,
      TreeComponent;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      ContentChild = $__m.ContentChild;
      EventEmitter = $__m.EventEmitter;
      Inject = $__m.Inject;
      Input = $__m.Input;
      Output = $__m.Output;
      TemplateRef = $__m.TemplateRef;
      ViewChild = $__m.ViewChild;
      i0 = $__m;
    }, function($__m) {
      TreeService = $__m.TreeService;
      i2 = $__m;
    }, function($__m) {
      TreeTypes = $__m;
    }, function($__m) {
      Tree = $__m.Tree;
    }, function($__m) {
      i1 = $__m;
    }],
    execute: function() {
      _c0 = ["rootComponent"];
      TreeComponent = function() {
        function TreeComponent(treeService) {
          this.treeService = treeService;
          this.nodeCreated = new EventEmitter();
          this.nodeRemoved = new EventEmitter();
          this.nodeRenamed = new EventEmitter();
          this.nodeDoubleClicked = new EventEmitter();
          this.nodeSelected = new EventEmitter();
          this.nodeUnselected = new EventEmitter();
          this.nodeDragStarted = new EventEmitter();
          this.nodeMoved = new EventEmitter();
          this.nodeExpanded = new EventEmitter();
          this.nodeCollapsed = new EventEmitter();
          this.loadNextLevel = new EventEmitter();
          this.nodeChecked = new EventEmitter();
          this.nodeUnchecked = new EventEmitter();
          this.nodeRenameKeydown = new EventEmitter();
          this.nodeRenameInputChange = new EventEmitter();
          this.menuItemSelected = new EventEmitter();
          this.subscriptions = [];
        }
        return ($traceurRuntime.createClass)(TreeComponent, {
          ngOnChanges: function(changes) {
            if (!this.treeModel) {
              this.tree = TreeComponent.EMPTY_TREE;
            } else {
              this.tree = new Tree(this.treeModel);
            }
          },
          ngOnInit: function() {
            var $__4 = this;
            this.subscriptions.push(this.treeService.nodeRemoved$.subscribe(function(e) {
              $__4.nodeRemoved.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeRenamed$.subscribe(function(e) {
              $__4.nodeRenamed.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeCreated$.subscribe(function(e) {
              $__4.nodeCreated.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeDoubleClicked$.subscribe(function(e) {
              $__4.nodeDoubleClicked.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeSelected$.subscribe(function(e) {
              $__4.nodeSelected.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeUnselected$.subscribe(function(e) {
              $__4.nodeUnselected.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeMoveStarted$.subscribe(function(e) {
              $__4.nodeDragStarted.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeMoved$.subscribe(function(e) {
              $__4.nodeMoved.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeExpanded$.subscribe(function(e) {
              $__4.nodeExpanded.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeCollapsed$.subscribe(function(e) {
              $__4.nodeCollapsed.emit(e);
            }));
            this.subscriptions.push(this.treeService.menuItemSelected$.subscribe(function(e) {
              $__4.menuItemSelected.emit(e);
            }));
            this.subscriptions.push(this.treeService.loadNextLevel$.subscribe(function(e) {
              $__4.loadNextLevel.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeChecked$.subscribe(function(e) {
              $__4.nodeChecked.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeUnchecked$.subscribe(function(e) {
              $__4.nodeUnchecked.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeRenameKeydown$.subscribe(function(e) {
              $__4.nodeRenameKeydown.emit(e);
            }));
            this.subscriptions.push(this.treeService.nodeRenameInputChange$.subscribe(function(e) {
              $__4.nodeRenameInputChange.emit(e);
            }));
          },
          getController: function() {
            return this.rootComponent.controller;
          },
          getControllerByNodeId: function(id) {
            return this.treeService.getController(id);
          },
          ngOnDestroy: function() {
            this.subscriptions.forEach(function(sub) {
              return sub && sub.unsubscribe();
            });
          }
        }, {});
      }();
      $__export("TreeComponent", TreeComponent);
      TreeComponent.EMPTY_TREE = new Tree({value: ''});
      TreeComponent.ɵfac = function TreeComponent_Factory(t) {
        return new (t || TreeComponent)(i0.ɵɵdirectiveInject(TreeService));
      };
      TreeComponent.ɵcmp = i0.ɵɵdefineComponent({
        type: TreeComponent,
        selectors: [["tree"]],
        contentQueries: function TreeComponent_ContentQueries(rf, ctx, dirIndex) {
          if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, TemplateRef, 5);
          }
          if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
          }
        },
        viewQuery: function TreeComponent_Query(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
          }
          if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.rootComponent = _t.first);
          }
        },
        inputs: {
          treeModel: ["tree", "treeModel"],
          settings: "settings"
        },
        outputs: {
          nodeCreated: "nodeCreated",
          nodeRemoved: "nodeRemoved",
          nodeRenamed: "nodeRenamed",
          nodeDoubleClicked: "nodeDoubleClicked",
          nodeSelected: "nodeSelected",
          nodeUnselected: "nodeUnselected",
          nodeDragStarted: "nodeDragStarted",
          nodeMoved: "nodeMoved",
          nodeExpanded: "nodeExpanded",
          nodeCollapsed: "nodeCollapsed",
          loadNextLevel: "loadNextLevel",
          nodeChecked: "nodeChecked",
          nodeUnchecked: "nodeUnchecked",
          nodeRenameKeydown: "nodeRenameKeydown",
          nodeRenameInputChange: "nodeRenameInputChange",
          menuItemSelected: "menuItemSelected"
        },
        features: [i0.ɵɵProvidersFeature([TreeService]), i0.ɵɵNgOnChangesFeature],
        decls: 2,
        vars: 3,
        consts: [[3, "tree", "settings", "template"], ["rootComponent", ""]],
        template: function TreeComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelement(0, "tree-internal", 0, 1);
          }
          if (rf & 2) {
            i0.ɵɵproperty("tree", ctx.tree)("settings", ctx.settings)("template", ctx.template);
          }
        },
        directives: [i1.TreeInternalComponent],
        encapsulation: 2
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeComponent, [{
          type: Component,
          args: [{
            selector: 'tree',
            template: "<tree-internal #rootComponent [tree]=\"tree\" [settings]=\"settings\" [template]=\"template\"></tree-internal>",
            providers: [TreeService]
          }]
        }], function() {
          return [{
            type: i2.TreeService,
            decorators: [{
              type: Inject,
              args: [TreeService]
            }]
          }];
        }, {
          treeModel: [{
            type: Input,
            args: ['tree']
          }],
          settings: [{type: Input}],
          nodeCreated: [{type: Output}],
          nodeRemoved: [{type: Output}],
          nodeRenamed: [{type: Output}],
          nodeDoubleClicked: [{type: Output}],
          nodeSelected: [{type: Output}],
          nodeUnselected: [{type: Output}],
          nodeDragStarted: [{type: Output}],
          nodeMoved: [{type: Output}],
          nodeExpanded: [{type: Output}],
          nodeCollapsed: [{type: Output}],
          loadNextLevel: [{type: Output}],
          nodeChecked: [{type: Output}],
          nodeUnchecked: [{type: Output}],
          nodeRenameKeydown: [{type: Output}],
          nodeRenameInputChange: [{type: Output}],
          menuItemSelected: [{type: Output}],
          rootComponent: [{
            type: ViewChild,
            args: ['rootComponent']
          }],
          template: [{
            type: ContentChild,
            args: [TemplateRef]
          }]
        });
      })();
    }
  };
});

$__System.register("12", ["13", "14", "15"], function($__export) {
  "use strict";
  var NodeMenuItemAction,
      MouseButtons,
      get,
      TreeController;
  return {
    setters: [function($__m) {
      NodeMenuItemAction = $__m.NodeMenuItemAction;
    }, function($__m) {
      MouseButtons = $__m.MouseButtons;
    }, function($__m) {
      get = $__m.get;
    }],
    execute: function() {
      TreeController = function() {
        function TreeController(component) {
          this.component = component;
          this.tree = this.component.tree;
          this.treeService = this.component.treeService;
        }
        return ($traceurRuntime.createClass)(TreeController, {
          select: function() {
            if (!this.isSelected()) {
              this.component.onNodeSelected({button: MouseButtons.Left});
            }
          },
          unselect: function() {
            if (this.isSelected()) {
              this.component.onNodeUnselected({button: MouseButtons.Left});
            }
          },
          isSelected: function() {
            return this.component.isSelected;
          },
          expand: function() {
            if (this.isCollapsed()) {
              this.component.onSwitchFoldingType();
            }
          },
          expandToParent: function() {
            var tree = arguments[0] !== (void 0) ? arguments[0] : this.tree;
            var $__3 = this;
            if (tree) {
              var controller = this.treeService.getController(tree.id);
              if (controller) {
                requestAnimationFrame(function() {
                  controller.expand();
                  $__3.expandToParent(tree.parent);
                });
              }
            }
          },
          isExpanded: function() {
            return this.tree.isNodeExpanded();
          },
          collapse: function() {
            if (this.isExpanded()) {
              this.component.onSwitchFoldingType();
            }
          },
          isCollapsed: function() {
            return this.tree.isNodeCollapsed();
          },
          toTreeModel: function() {
            return this.tree.toTreeModel();
          },
          rename: function(newValue) {
            this.tree.markAsBeingRenamed();
            this.component.applyNewValue({
              type: 'keyup',
              value: newValue
            });
          },
          remove: function() {
            this.component.onMenuItemSelected({nodeMenuItemAction: NodeMenuItemAction.Remove});
          },
          addChild: function(newNode) {
            if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
              return;
            }
            var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
            this.treeService.fireNodeCreated(newTree);
          },
          addChildAsync: function(newNode) {
            if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
              return Promise.reject(new Error('This node loads its children asynchronously, hence child cannot be added this way'));
            }
            var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
            this.treeService.fireNodeCreated(newTree);
            return new Promise(function(resolve) {
              setTimeout(function() {
                resolve(newTree);
              });
            });
          },
          changeNodeId: function(id) {
            if (!id) {
              throw Error('You should supply an id!');
            }
            if (this.treeService.hasController(id)) {
              throw Error(("Controller already exists for the given id: " + id));
            }
            this.treeService.deleteController(this.tree.id);
            this.tree.id = id;
            this.treeService.setController(this.tree.id, this);
          },
          reloadChildren: function() {
            this.tree.reloadChildren();
          },
          setChildren: function(children) {
            if (!this.tree.isLeaf()) {
              this.tree.setChildren(children);
            }
          },
          startRenaming: function() {
            this.tree.markAsBeingRenamed();
          },
          check: function() {
            this.component.onNodeChecked();
          },
          uncheck: function() {
            var ignoreChildren = arguments[0] !== (void 0) ? arguments[0] : false;
            this.component.onNodeUnchecked(ignoreChildren);
          },
          updateCheckboxState: function() {
            this.component.updateCheckboxState();
          },
          isChecked: function() {
            return this.tree.checked;
          },
          isIndeterminate: function() {
            return get(this.component, 'checkboxElementRef.nativeElement.indeterminate');
          },
          allowSelection: function() {
            this.tree.selectionAllowed = true;
          },
          forbidSelection: function() {
            this.tree.selectionAllowed = false;
          },
          isSelectionAllowed: function() {
            return this.tree.selectionAllowed;
          }
        }, {});
      }();
      $__export("TreeController", TreeController);
    }
  };
});

$__System.register("11", ["d", "f", "10", "12", "16", "13", "17", "e", "14", "18", "15", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21"], function($__export) {
  "use strict";
  var Component,
      ElementRef,
      Input,
      TemplateRef,
      ViewChild,
      TreeTypes,
      Ng2TreeSettings,
      Tree,
      TreeController,
      NodeMenuService,
      NodeMenuItemAction,
      NodeEditableEventAction,
      TreeService,
      EventUtils,
      DropPosition,
      get,
      isNil,
      NodeDraggableService,
      CapturedNode,
      merge,
      filter,
      i0,
      i1,
      i2,
      i3,
      i4,
      i5,
      i6,
      i7,
      i8,
      _c0,
      _c1,
      _c2,
      _c3,
      _c4,
      TreeInternalComponent;
  function TreeInternalComponent_ul_0_div_3_Template(rf, ctx) {
    if (rf & 1) {
      var _r13 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "div", 13)(1, "input", 14, 15);
      i0.ɵɵlistener("change", function TreeInternalComponent_ul_0_div_3_Template_input_change_1_listener() {
        i0.ɵɵrestoreView(_r13);
        var ctx_r12 = i0.ɵɵnextContext(2);
        return ctx_r12.switchNodeCheckStatus();
      });
      i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
      var ctx_r1 = i0.ɵɵnextContext(2);
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("disabled", ctx_r1.isReadOnly)("checked", ctx_r1.tree.checked);
    }
  }
  function TreeInternalComponent_ul_0_div_5_div_1_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelement(0, "div", 21);
      i0.ɵɵpipe(1, "safeHtml");
    }
    if (rf & 2) {
      var ctx_r14 = i0.ɵɵnextContext(3);
      i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r14.tree.nodeTemplate), i0.ɵɵsanitizeHtml);
    }
  }
  function TreeInternalComponent_ul_0_div_5_span_2_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelement(0, "span", 22);
      i0.ɵɵpipe(1, "safeHtml");
    }
    if (rf & 2) {
      var ctx_r15 = i0.ɵɵnextContext(3);
      i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r15.tree.value), i0.ɵɵsanitizeHtml);
    }
  }
  function TreeInternalComponent_ul_0_div_5_span_3_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelement(0, "span", 23);
    }
  }
  function TreeInternalComponent_ul_0_div_5_ng_template_4_Template(rf, ctx) {}
  function TreeInternalComponent_ul_0_div_5_Template(rf, ctx) {
    if (rf & 1) {
      var _r19 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "div", 16);
      i0.ɵɵlistener("dblclick", function TreeInternalComponent_ul_0_div_5_Template_div_dblclick_0_listener($event) {
        i0.ɵɵrestoreView(_r19);
        var ctx_r18 = i0.ɵɵnextContext(2);
        return ctx_r18.onNodeDoubleClicked($event);
      })("click", function TreeInternalComponent_ul_0_div_5_Template_div_click_0_listener($event) {
        i0.ɵɵrestoreView(_r19);
        var ctx_r20 = i0.ɵɵnextContext(2);
        return ctx_r20.onNodeSelected($event);
      });
      i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_5_div_1_Template, 2, 3, "div", 17);
      i0.ɵɵtemplate(2, TreeInternalComponent_ul_0_div_5_span_2_Template, 2, 3, "span", 18);
      i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_5_span_3_Template, 1, 0, "span", 19);
      i0.ɵɵtemplate(4, TreeInternalComponent_ul_0_div_5_ng_template_4_Template, 0, 0, "ng-template", 20);
      i0.ɵɵelementEnd();
    }
    if (rf & 2) {
      var ctx_r2 = i0.ɵɵnextContext(2);
      i0.ɵɵclassProp("node-selected", ctx_r2.isSelected);
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r2.tree.nodeTemplate);
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", !ctx_r2.template);
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r2.tree.childrenAreBeingLoaded());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(7, _c1, ctx_r2.tree.node));
    }
  }
  function TreeInternalComponent_ul_0_input_6_Template(rf, ctx) {
    if (rf & 1) {
      var _r22 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "input", 24);
      i0.ɵɵlistener("keydown", function TreeInternalComponent_ul_0_input_6_Template_input_keydown_0_listener($event) {
        i0.ɵɵrestoreView(_r22);
        var ctx_r21 = i0.ɵɵnextContext(2);
        return ctx_r21.keydownHandler($event);
      })("input", function TreeInternalComponent_ul_0_input_6_Template_input_input_0_listener($event) {
        i0.ɵɵrestoreView(_r22);
        var ctx_r23 = i0.ɵɵnextContext(2);
        return ctx_r23.inputChangeHandler($event);
      })("valueChanged", function TreeInternalComponent_ul_0_input_6_Template_input_valueChanged_0_listener($event) {
        i0.ɵɵrestoreView(_r22);
        var ctx_r24 = i0.ɵɵnextContext(2);
        return ctx_r24.applyNewValue($event);
      });
      i0.ɵɵelementEnd();
    }
    if (rf & 2) {
      var ctx_r3 = i0.ɵɵnextContext(2);
      i0.ɵɵproperty("nodeEditable", ctx_r3.tree.value);
    }
  }
  function TreeInternalComponent_ul_0_div_7_Template(rf, ctx) {
    if (rf & 1) {
      var _r26 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "div", 25);
      i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_div_7_Template_div_click_0_listener($event) {
        i0.ɵɵrestoreView(_r26);
        var ctx_r25 = i0.ɵɵnextContext(2);
        return ctx_r25.showLeftMenu($event);
      });
      i0.ɵɵelementEnd();
    }
    if (rf & 2) {
      var ctx_r4 = i0.ɵɵnextContext(2);
      i0.ɵɵproperty("innerHTML", ctx_r4.tree.leftMenuTemplate, i0.ɵɵsanitizeHtml);
    }
  }
  function TreeInternalComponent_ul_0_node_menu_8_Template(rf, ctx) {
    if (rf & 1) {
      var _r28 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "node-menu", 26);
      i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_8_Template_node_menu_menuItemSelected_0_listener($event) {
        i0.ɵɵrestoreView(_r28);
        var ctx_r27 = i0.ɵɵnextContext(2);
        return ctx_r27.onMenuItemSelected($event);
      });
      i0.ɵɵelementEnd();
    }
  }
  function TreeInternalComponent_ul_0_div_9_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelement(0, "div", 27);
      i0.ɵɵpipe(1, "safeHtml");
    }
    if (rf & 2) {
      var ctx_r6 = i0.ɵɵnextContext(2);
      i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r6.tree.dragTemplate), i0.ɵɵsanitizeHtml);
    }
  }
  function TreeInternalComponent_ul_0_node_menu_10_Template(rf, ctx) {
    if (rf & 1) {
      var _r30 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "node-menu", 26);
      i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_10_Template_node_menu_menuItemSelected_0_listener($event) {
        i0.ɵɵrestoreView(_r30);
        var ctx_r29 = i0.ɵɵnextContext(2);
        return ctx_r29.onMenuItemSelected($event);
      });
      i0.ɵɵelementEnd();
    }
  }
  function TreeInternalComponent_ul_0_node_menu_11_Template(rf, ctx) {
    if (rf & 1) {
      var _r32 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "node-menu", 28);
      i0.ɵɵlistener("menuItemSelected", function TreeInternalComponent_ul_0_node_menu_11_Template_node_menu_menuItemSelected_0_listener($event) {
        i0.ɵɵrestoreView(_r32);
        var ctx_r31 = i0.ɵɵnextContext(2);
        return ctx_r31.onMenuItemSelected($event);
      });
      i0.ɵɵelementEnd();
    }
    if (rf & 2) {
      var ctx_r8 = i0.ɵɵnextContext(2);
      i0.ɵɵproperty("menuItems", ctx_r8.tree.menuItems);
    }
  }
  function TreeInternalComponent_ul_0_div_12_tree_internal_1_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelement(0, "tree-internal", 31);
    }
    if (rf & 2) {
      var child_r34 = ctx.$implicit;
      var ctx_r33 = i0.ɵɵnextContext(3);
      i0.ɵɵproperty("tree", child_r34)("template", ctx_r33.template)("settings", ctx_r33.settings);
    }
  }
  function TreeInternalComponent_ul_0_div_12_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelementStart(0, "div", 29);
      i0.ɵɵtemplate(1, TreeInternalComponent_ul_0_div_12_tree_internal_1_Template, 1, 3, "tree-internal", 30);
      i0.ɵɵpipe(2, "async");
      i0.ɵɵelementEnd();
    }
    if (rf & 2) {
      var ctx_r9 = i0.ɵɵnextContext(2);
      i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c2, ctx_r9.tree.isNodeExpanded() ? "block" : "none"));
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(2, 2, ctx_r9.tree.childrenAsync));
    }
  }
  function TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelement(0, "tree-internal", 31);
    }
    if (rf & 2) {
      var child_r36 = ctx.$implicit;
      var ctx_r35 = i0.ɵɵnextContext(3);
      i0.ɵɵproperty("tree", child_r36)("template", ctx_r35.template)("settings", ctx_r35.settings);
    }
  }
  function TreeInternalComponent_ul_0_ng_template_13_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_ng_template_13_tree_internal_0_Template, 1, 3, "tree-internal", 30);
      i0.ɵɵpipe(1, "async");
    }
    if (rf & 2) {
      var ctx_r10 = i0.ɵɵnextContext(2);
      i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(1, 1, ctx_r10.tree.childrenAsync));
    }
  }
  function TreeInternalComponent_ul_0_Template(rf, ctx) {
    if (rf & 1) {
      var _r38 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "ul", 1)(1, "li")(2, "div", 2);
      i0.ɵɵlistener("contextmenu", function TreeInternalComponent_ul_0_Template_div_contextmenu_2_listener($event) {
        i0.ɵɵrestoreView(_r38);
        var ctx_r37 = i0.ɵɵnextContext();
        return ctx_r37.showRightMenu($event);
      });
      i0.ɵɵtemplate(3, TreeInternalComponent_ul_0_div_3_Template, 3, 2, "div", 3);
      i0.ɵɵelementStart(4, "div", 4);
      i0.ɵɵlistener("click", function TreeInternalComponent_ul_0_Template_div_click_4_listener() {
        i0.ɵɵrestoreView(_r38);
        var ctx_r39 = i0.ɵɵnextContext();
        return ctx_r39.onSwitchFoldingType();
      });
      i0.ɵɵelementEnd();
      i0.ɵɵtemplate(5, TreeInternalComponent_ul_0_div_5_Template, 5, 9, "div", 5);
      i0.ɵɵtemplate(6, TreeInternalComponent_ul_0_input_6_Template, 1, 1, "input", 6);
      i0.ɵɵtemplate(7, TreeInternalComponent_ul_0_div_7_Template, 1, 1, "div", 7);
      i0.ɵɵtemplate(8, TreeInternalComponent_ul_0_node_menu_8_Template, 1, 0, "node-menu", 8);
      i0.ɵɵtemplate(9, TreeInternalComponent_ul_0_div_9_Template, 2, 3, "div", 9);
      i0.ɵɵelementEnd();
      i0.ɵɵtemplate(10, TreeInternalComponent_ul_0_node_menu_10_Template, 1, 0, "node-menu", 8);
      i0.ɵɵtemplate(11, TreeInternalComponent_ul_0_node_menu_11_Template, 1, 1, "node-menu", 10);
      i0.ɵɵtemplate(12, TreeInternalComponent_ul_0_div_12_Template, 3, 6, "div", 11);
      i0.ɵɵtemplate(13, TreeInternalComponent_ul_0_ng_template_13_Template, 2, 3, "ng-template", 12);
      i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
      var ctx_r0 = i0.ɵɵnextContext();
      i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(17, _c3, ctx_r0.isRootHidden()));
      i0.ɵɵadvance(2);
      i0.ɵɵclassProp("selected", ctx_r0.isSelected);
      i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(19, _c4, ctx_r0.isRootHidden(), ctx_r0.tree.checked))("nodeDraggable", ctx_r0.nodeElementRef)("tree", ctx_r0.tree);
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.settings.showCheckboxes);
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngClass", ctx_r0.tree.foldingCssClass);
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", !ctx_r0.shouldShowInputForTreeValue());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.shouldShowInputForTreeValue());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.tree.hasLeftMenu());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.tree.hasLeftMenu() && ctx_r0.isLeftMenuVisible && !ctx_r0.hasCustomMenu());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.tree.hasDragIcon());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.isRightMenuVisible && !ctx_r0.hasCustomMenu());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.hasCustomMenu() && (ctx_r0.isRightMenuVisible || ctx_r0.isLeftMenuVisible));
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.tree.keepNodesInDOM());
      i0.ɵɵadvance(1);
      i0.ɵɵproperty("ngIf", ctx_r0.tree.isNodeExpanded() && !ctx_r0.tree.keepNodesInDOM());
    }
  }
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      ElementRef = $__m.ElementRef;
      Input = $__m.Input;
      TemplateRef = $__m.TemplateRef;
      ViewChild = $__m.ViewChild;
      i0 = $__m;
    }, function($__m) {
      Ng2TreeSettings = $__m.Ng2TreeSettings;
      TreeTypes = $__m;
    }, function($__m) {
      Tree = $__m.Tree;
    }, function($__m) {
      TreeController = $__m.TreeController;
    }, function($__m) {
      NodeMenuService = $__m.NodeMenuService;
      i1 = $__m;
    }, function($__m) {
      NodeMenuItemAction = $__m.NodeMenuItemAction;
    }, function($__m) {
      NodeEditableEventAction = $__m.NodeEditableEventAction;
    }, function($__m) {
      TreeService = $__m.TreeService;
      i2 = $__m;
    }, function($__m) {
      EventUtils = $__m;
    }, function($__m) {
      DropPosition = $__m.DropPosition;
    }, function($__m) {
      get = $__m.get;
      isNil = $__m.isNil;
    }, function($__m) {
      NodeDraggableService = $__m.NodeDraggableService;
      i3 = $__m;
    }, function($__m) {
      CapturedNode = $__m.CapturedNode;
    }, function($__m) {
      merge = $__m.merge;
    }, function($__m) {
      filter = $__m.filter;
    }, function($__m) {
      i4 = $__m;
    }, function($__m) {
      i5 = $__m;
    }, function($__m) {
      i6 = $__m;
    }, function($__m) {
      i7 = $__m;
    }, function($__m) {
      i8 = $__m;
    }],
    execute: function() {
      _c0 = ["checkbox"];
      _c1 = function(a0) {
        return {$implicit: a0};
      };
      _c2 = function(a0) {
        return {"display": a0};
      };
      _c3 = function(a0) {
        return {rootless: a0};
      };
      _c4 = function(a0, a1) {
        return {
          rootless: a0,
          checked: a1
        };
      };
      TreeInternalComponent = function() {
        function TreeInternalComponent(nodeMenuService, treeService, nodeDraggableService, nodeElementRef) {
          this.nodeMenuService = nodeMenuService;
          this.treeService = treeService;
          this.nodeDraggableService = nodeDraggableService;
          this.nodeElementRef = nodeElementRef;
          this.isSelected = false;
          this.isRightMenuVisible = false;
          this.isLeftMenuVisible = false;
          this.isReadOnly = false;
          this.subscriptions = [];
        }
        return ($traceurRuntime.createClass)(TreeInternalComponent, {
          ngAfterViewInit: function() {
            if (this.tree.checked && !this.tree.firstCheckedFired) {
              this.tree.firstCheckedFired = true;
              this.nodeDraggableService.addCheckedNode(new CapturedNode(this.nodeElementRef, this.tree));
              this.treeService.fireNodeChecked(this.tree);
            }
          },
          ngOnInit: function() {
            var $__2 = this;
            var nodeId = get(this.tree, 'node.id', '');
            if (nodeId) {
              this.controller = new TreeController(this);
              this.treeService.setController(nodeId, this.controller);
            }
            this.settings = this.settings || new Ng2TreeSettings();
            this.isReadOnly = !get(this.settings, 'enableCheckboxes', true);
            if (this.tree.isRoot() && this.settings.rootIsVisible === false) {
              this.tree.disableCollapseOnInit();
            }
            this.subscriptions.push(this.nodeMenuService.hideMenuStream(this.nodeElementRef).subscribe(function() {
              $__2.isRightMenuVisible = false;
              $__2.isLeftMenuVisible = false;
            }));
            this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(function() {
              return ($__2.isSelected = false);
            }));
            this.subscriptions.push(this.treeService.draggedStream(this.tree, this.nodeElementRef).subscribe(function(e) {
              return $__2.nodeDraggedHandler(e);
            }));
            this.subscriptions.push(merge(this.treeService.nodeChecked$, this.treeService.nodeUnchecked$).pipe(filter(function(e) {
              return $__2.eventContainsId(e) && $__2.tree.hasChild(e.node);
            })).subscribe(function(e) {
              return $__2.updateCheckboxState();
            }));
          },
          ngOnChanges: function(changes) {
            this.controller = new TreeController(this);
          },
          ngOnDestroy: function() {
            if (get(this.tree, 'node.id', '') && !(this.tree.parent && this.tree.parent.children.indexOf(this.tree) > -1)) {
              this.treeService.deleteController(this.tree.node.id);
            }
            this.nodeDraggableService.releaseDraggedNode();
            this.nodeDraggableService.releaseCheckedNodes();
            this.subscriptions.forEach(function(sub) {
              return sub && sub.unsubscribe();
            });
          },
          nodeDraggedHandler: function(e) {
            var nodesToMove = e.captured.filter(function(cn) {
              return !cn.tree.parent || !cn.tree.parent.checked;
            });
            var i = nodesToMove.length;
            while (i--) {
              var node = nodesToMove[i];
              if (node.tree.id) {
                var ctrl = this.treeService.getController(node.tree.id);
                if (ctrl.isChecked()) {
                  ctrl.uncheck();
                }
              }
              if (this.tree.isBranch() && e.position === DropPosition.Into) {
                this.moveNodeToThisTreeAndRemoveFromPreviousOne(node.tree, this.tree);
              } else if (this.tree.hasSibling(node.tree)) {
                this.moveSibling(node.tree, this.tree, e.position);
              } else {
                this.moveNodeToParentTreeAndRemoveFromPreviousOne(node.tree, this.tree, e.position);
              }
            }
            if (!this.tree.isRoot()) {
              var parentCtrl = this.treeService.getController(this.tree.parent.id);
              if (parentCtrl) {
                parentCtrl.updateCheckboxState();
              }
            }
          },
          moveSibling: function(sibling, tree, position) {
            var previousPositionInParent = sibling.positionInParent;
            if (position === DropPosition.Above) {
              tree.moveSiblingAbove(sibling);
            } else if (position === DropPosition.Below) {
              tree.moveSiblingBelow(sibling);
            } else {
              console.error(("Invalid drop position: " + DropPosition[position]));
              return;
            }
            this.treeService.fireNodeMoved(sibling, sibling.parent, previousPositionInParent);
          },
          moveNodeToThisTreeAndRemoveFromPreviousOne: function(capturedTree, moveToTree) {
            var $__2 = this;
            capturedTree.removeItselfFromParent();
            setTimeout(function() {
              var addedChild = moveToTree.addChild(capturedTree);
              $__2.treeService.fireNodeMoved(addedChild, capturedTree.parent);
            });
          },
          moveNodeToParentTreeAndRemoveFromPreviousOne: function(capturedTree, moveToTree, position) {
            var $__2 = this;
            capturedTree.removeItselfFromParent();
            setTimeout(function() {
              var insertAtIndex = moveToTree.positionInParent;
              if (position === DropPosition.Below) {
                insertAtIndex++;
              }
              var addedSibling = moveToTree.addSibling(capturedTree, insertAtIndex);
              $__2.treeService.fireNodeMoved(addedSibling, capturedTree.parent);
            });
          },
          onNodeDoubleClicked: function(e) {
            this.treeService.fireNodeDoubleClicked(this.tree, e);
          },
          onNodeSelected: function(e) {
            if (!this.tree.selectionAllowed) {
              if (this.tree.isBranch()) {
                this.onSwitchFoldingType();
              }
              return;
            }
            if (EventUtils.isLeftButtonClicked(e)) {
              this.isSelected = true;
              this.treeService.fireNodeSelected(this.tree);
            }
          },
          onNodeUnselected: function(e) {
            if (!this.tree.selectionAllowed) {
              return;
            }
            if (EventUtils.isLeftButtonClicked(e)) {
              this.isSelected = false;
              this.treeService.fireNodeUnselected(this.tree);
            }
          },
          showRightMenu: function(e) {
            if (!this.tree.hasRightMenu()) {
              return;
            }
            if (EventUtils.isRightButtonClicked(e)) {
              this.isRightMenuVisible = !this.isRightMenuVisible;
              this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
            }
            e.preventDefault();
          },
          showLeftMenu: function(e) {
            if (!this.tree.hasLeftMenu()) {
              return;
            }
            if (EventUtils.isLeftButtonClicked(e)) {
              this.isLeftMenuVisible = !this.isLeftMenuVisible;
              this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
              if (this.isLeftMenuVisible) {
                e.preventDefault();
              }
            }
          },
          onMenuItemSelected: function(e) {
            switch (e.nodeMenuItemAction) {
              case NodeMenuItemAction.NewTag:
                this.onNewSelected(e);
                break;
              case NodeMenuItemAction.NewFolder:
                this.onNewSelected(e);
                break;
              case NodeMenuItemAction.Rename:
                this.onRenameSelected();
                break;
              case NodeMenuItemAction.Remove:
                this.onRemoveSelected();
                break;
              case NodeMenuItemAction.Custom:
                this.onCustomSelected();
                this.treeService.fireMenuItemSelected(this.tree, e.nodeMenuItemSelected);
                break;
              default:
                throw new Error("Chosen menu item doesn't exist");
            }
          },
          onNewSelected: function(e) {
            this.tree.createNode(e.nodeMenuItemAction === NodeMenuItemAction.NewFolder);
            this.isRightMenuVisible = false;
            this.isLeftMenuVisible = false;
          },
          onRenameSelected: function() {
            this.tree.markAsBeingRenamed();
            this.isRightMenuVisible = false;
            this.isLeftMenuVisible = false;
          },
          onRemoveSelected: function() {
            var nodeId = get(this.tree, 'node.id', '');
            this.nodeDraggableService.removeCheckedNodeById(nodeId);
            this.treeService.deleteController(nodeId);
            this.treeService.fireNodeRemoved(this.tree);
          },
          onCustomSelected: function() {
            this.isRightMenuVisible = false;
            this.isLeftMenuVisible = false;
          },
          onSwitchFoldingType: function() {
            this.tree.switchFoldingType();
            this.treeService.fireNodeSwitchFoldingType(this.tree);
          },
          keydownHandler: function(e) {
            this.treeService.fireNodeRenameKeydownEvent(this.tree, e);
          },
          inputChangeHandler: function(e) {
            this.treeService.fireNodeRenameInputChanged(this.tree, e);
          },
          applyNewValue: function(e) {
            if ((e.action === NodeEditableEventAction.Cancel || this.tree.isNew()) && Tree.isValueEmpty(e.value)) {
              return this.treeService.fireNodeRemoved(this.tree);
            }
            if (this.tree.isNew()) {
              this.tree.value = e.value;
              this.treeService.fireNodeCreated(this.tree);
            }
            if (this.tree.isBeingRenamed()) {
              var oldValue = this.tree.value;
              this.tree.value = e.value;
              this.treeService.fireNodeRenamed(oldValue, this.tree);
            }
            this.tree.markAsModified();
          },
          shouldShowInputForTreeValue: function() {
            return this.tree.isNew() || this.tree.isBeingRenamed();
          },
          isRootHidden: function() {
            return this.tree.isRoot() && !this.settings.rootIsVisible;
          },
          hasCustomMenu: function() {
            return this.tree.hasCustomMenu();
          },
          switchNodeCheckStatus: function() {
            if (!this.tree.checked) {
              this.onNodeChecked();
            } else {
              this.onNodeUnchecked();
            }
          },
          onNodeChecked: function() {
            var ignoreChildren = arguments[0] !== (void 0) ? arguments[0] : false;
            if (!this.checkboxElementRef) {
              return;
            }
            if (!this.tree.checked) {
              this.nodeDraggableService.addCheckedNode(new CapturedNode(this.nodeElementRef, this.tree));
              this.onNodeIndeterminate(false);
              this.tree.checked = true;
              this.treeService.fireNodeChecked(this.tree);
            }
            if (!ignoreChildren) {
              this.executeOnChildController(function(controller) {
                return controller.check();
              });
            }
          },
          onNodeUnchecked: function() {
            var ignoreChildren = arguments[0] !== (void 0) ? arguments[0] : false;
            if (!this.checkboxElementRef) {
              return;
            }
            if (this.tree.checked) {
              this.nodeDraggableService.removeCheckedNodeById(this.tree.id);
              this.onNodeIndeterminate(false);
              this.tree.checked = false;
              this.treeService.fireNodeUnchecked(this.tree);
            }
            if (!ignoreChildren) {
              this.executeOnChildController(function(controller) {
                return controller.uncheck();
              });
            }
          },
          onNodeIndeterminate: function(indeterminate) {
            if (!this.checkboxElementRef || this.checkboxElementRef.nativeElement.indeterminate === indeterminate) {
              return;
            }
            this.checkboxElementRef.nativeElement.indeterminate = indeterminate;
            this.treeService.fireNodeIndeterminate(this.tree, indeterminate);
          },
          executeOnChildController: function(executor) {
            var $__2 = this;
            if (this.tree.hasLoadedChildren()) {
              this.tree.children.forEach(function(child) {
                var controller = $__2.treeService.getController(child.id);
                if (!isNil(controller)) {
                  executor(controller);
                }
              });
            }
          },
          updateCheckboxState: function() {
            var $__2 = this;
            setTimeout(function() {
              var checkedChildrenAmount = $__2.tree.checkedChildrenAmount();
              if (checkedChildrenAmount === 0) {
                $__2.onNodeUnchecked(true);
                $__2.onNodeIndeterminate(false);
              } else if (checkedChildrenAmount === $__2.tree.loadedChildrenAmount()) {
                if (!$__2.settings.ignoreParentOnCheck) {
                  $__2.onNodeChecked(true);
                  $__2.onNodeIndeterminate(false);
                } else if (!$__2.tree.checked) {
                  $__2.onNodeIndeterminate(true);
                }
              } else {
                $__2.onNodeUnchecked(true);
                $__2.onNodeIndeterminate(true);
              }
            });
          },
          eventContainsId: function(event) {
            if (!event.node.id) {
              console.warn('"Node with checkbox" feature requires a unique id assigned to every node, please consider to add it.');
              return false;
            }
            return true;
          }
        }, {});
      }();
      $__export("TreeInternalComponent", TreeInternalComponent);
      TreeInternalComponent.ɵfac = function TreeInternalComponent_Factory(t) {
        return new (t || TreeInternalComponent)(i0.ɵɵdirectiveInject(i1.NodeMenuService), i0.ɵɵdirectiveInject(i2.TreeService), i0.ɵɵdirectiveInject(i3.NodeDraggableService), i0.ɵɵdirectiveInject(i0.ElementRef));
      };
      TreeInternalComponent.ɵcmp = i0.ɵɵdefineComponent({
        type: TreeInternalComponent,
        selectors: [["tree-internal"]],
        viewQuery: function TreeInternalComponent_Query(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
          }
          if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.checkboxElementRef = _t.first);
          }
        },
        inputs: {
          tree: "tree",
          settings: "settings",
          template: "template"
        },
        features: [i0.ɵɵNgOnChangesFeature],
        decls: 1,
        vars: 1,
        consts: [["class", "tree", 3, "ngClass", 4, "ngIf"], [1, "tree", 3, "ngClass"], [1, "value-container", 3, "ngClass", "nodeDraggable", "tree", "contextmenu"], ["class", "node-checkbox", 4, "ngIf"], [1, "folding", 3, "ngClass", "click"], ["class", "node-value", 3, "node-selected", "dblclick", "click", 4, "ngIf"], ["type", "text", "class", "node-value", "id", "rename-input", 3, "nodeEditable", "keydown", "input", "valueChanged", 4, "ngIf"], ["class", "node-left-menu", 3, "innerHTML", "click", 4, "ngIf"], [3, "menuItemSelected", 4, "ngIf"], ["class", "drag-template", 3, "innerHTML", 4, "ngIf"], [3, "menuItems", "menuItemSelected", 4, "ngIf"], [3, "ngStyle", 4, "ngIf"], [3, "ngIf"], [1, "node-checkbox"], ["checkbox", "", "type", "checkbox", 3, "disabled", "checked", "change"], ["checkbox", ""], [1, "node-value", 3, "dblclick", "click"], ["class", "node-template", 3, "innerHTML", 4, "ngIf"], ["class", "node-name", 3, "innerHTML", 4, "ngIf"], ["class", "loading-children", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "node-template", 3, "innerHTML"], [1, "node-name", 3, "innerHTML"], [1, "loading-children"], ["type", "text", "id", "rename-input", 1, "node-value", 3, "nodeEditable", "keydown", "input", "valueChanged"], [1, "node-left-menu", 3, "innerHTML", "click"], [3, "menuItemSelected"], [1, "drag-template", 3, "innerHTML"], [3, "menuItems", "menuItemSelected"], [3, "ngStyle"], [3, "tree", "template", "settings", 4, "ngFor", "ngForOf"], [3, "tree", "template", "settings"]],
        template: function TreeInternalComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵtemplate(0, TreeInternalComponent_ul_0_Template, 14, 22, "ul", 0);
          }
          if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.tree);
          }
        },
        directives: [i4.NgIf, i4.NgClass, i5.NodeDraggableDirective, i4.NgTemplateOutlet, i6.NodeEditableDirective, i7.NodeMenuComponent, i4.NgStyle, i4.NgForOf, TreeInternalComponent],
        pipes: [i8.SafeHtmlPipe, i4.AsyncPipe],
        encapsulation: 2
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeInternalComponent, [{
          type: Component,
          args: [{
            selector: 'tree-internal',
            template: "\n  <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{rootless: isRootHidden()}\">\n    <li>\n      <div class=\"value-container\"\n        [ngClass]=\"{rootless: isRootHidden(), checked: tree.checked}\"\n        [class.selected]=\"isSelected\"\n        (contextmenu)=\"showRightMenu($event)\"\n        [nodeDraggable]=\"nodeElementRef\"\n        [tree]=\"tree\">\n\n        <div class=\"node-checkbox\" *ngIf=\"settings.showCheckboxes\">\n          <input checkbox  type=\"checkbox\" [disabled]=\"isReadOnly\" [checked]=\"tree.checked\" (change)=\"switchNodeCheckStatus()\" #checkbox />\n        </div>\n\n        <div class=\"folding\" (click)=\"onSwitchFoldingType()\" [ngClass]=\"tree.foldingCssClass\"></div>\n\n        <div class=\"node-value\"\n          *ngIf=\"!shouldShowInputForTreeValue()\"\n          [class.node-selected]=\"isSelected\"\n          (dblclick)=\"onNodeDoubleClicked($event)\"\n          (click)=\"onNodeSelected($event)\">\n            <div *ngIf=\"tree.nodeTemplate\" class=\"node-template\" [innerHTML]=\"tree.nodeTemplate | safeHtml\"></div>\n            <span *ngIf=\"!template\" class=\"node-name\" [innerHTML]=\"tree.value | safeHtml\"></span>\n            <span class=\"loading-children\" *ngIf=\"tree.childrenAreBeingLoaded()\"></span>\n            <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ $implicit: tree.node }\"></ng-template>\n        </div>\n\n        <input type=\"text\" class=\"node-value\" id=\"rename-input\"\n           *ngIf=\"shouldShowInputForTreeValue()\"\n           [nodeEditable]=\"tree.value\"\n           (keydown)=\"keydownHandler($event)\"\n           (input)=\"inputChangeHandler($event)\"\n           (valueChanged)=\"applyNewValue($event)\"/>\n\n        <div class=\"node-left-menu\" *ngIf=\"tree.hasLeftMenu()\" (click)=\"showLeftMenu($event)\" [innerHTML]=\"tree.leftMenuTemplate\">\n        </div>\n        <node-menu *ngIf=\"tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()\"\n          (menuItemSelected)=\"onMenuItemSelected($event)\">\n        </node-menu>\n        <div class=\"drag-template\" *ngIf=\"tree.hasDragIcon()\" [innerHTML]=\"tree.dragTemplate | safeHtml\"></div>\n      </div>\n\n      <node-menu *ngIf=\"isRightMenuVisible && !hasCustomMenu()\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <node-menu *ngIf=\"hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)\"\n           [menuItems]=\"tree.menuItems\"\n           (menuItemSelected)=\"onMenuItemSelected($event)\">\n      </node-menu>\n\n      <div *ngIf=\"tree.keepNodesInDOM()\" [ngStyle]=\"{'display': tree.isNodeExpanded() ? 'block' : 'none'}\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </div>\n      <ng-template [ngIf]=\"tree.isNodeExpanded() && !tree.keepNodesInDOM()\">\n        <tree-internal *ngFor=\"let child of tree.childrenAsync | async\" [tree]=\"child\" [template]=\"template\" [settings]=\"settings\"></tree-internal>\n      </ng-template>\n    </li>\n  </ul>\n  "
          }]
        }], function() {
          return [{type: i1.NodeMenuService}, {type: i2.TreeService}, {type: i3.NodeDraggableService}, {type: i0.ElementRef}];
        }, {
          tree: [{type: Input}],
          settings: [{type: Input}],
          template: [{type: Input}],
          checkboxElementRef: [{
            type: ViewChild,
            args: ['checkbox']
          }]
        });
      })();
    }
  };
});

$__System.register("1a", [], function($__export) {
  "use strict";
  var CapturedNode;
  return {
    setters: [],
    execute: function() {
      CapturedNode = function() {
        function CapturedNode(anElement, aTree) {
          this.anElement = anElement;
          this.aTree = aTree;
        }
        return ($traceurRuntime.createClass)(CapturedNode, {
          canBeDroppedAt: function(element) {
            return !this.sameAs(element) && !this.contains(element);
          },
          contains: function(other) {
            return this.element.nativeElement.contains(other.nativeElement);
          },
          sameAs: function(other) {
            return this.element === other;
          },
          get element() {
            return this.anElement;
          },
          get tree() {
            return this.aTree;
          }
        }, {});
      }();
      $__export("CapturedNode", CapturedNode);
    }
  };
});

$__System.register("f", ["15"], function($__export) {
  "use strict";
  var defaultsDeep,
      get,
      omit,
      FoldingType,
      TreeModelSettings,
      Ng2TreeSettings,
      TreeStatus;
  return {
    setters: [function($__m) {
      defaultsDeep = $__m.defaultsDeep;
      get = $__m.get;
      omit = $__m.omit;
    }],
    execute: function() {
      FoldingType = function() {
        function FoldingType(_cssClass) {
          this._cssClass = _cssClass;
        }
        return ($traceurRuntime.createClass)(FoldingType, {get cssClass() {
            return this._cssClass;
          }}, {});
      }();
      $__export("FoldingType", FoldingType);
      FoldingType.Expanded = new FoldingType('node-expanded');
      FoldingType.Collapsed = new FoldingType('node-collapsed');
      FoldingType.Empty = new FoldingType('node-empty');
      FoldingType.Leaf = new FoldingType('node-leaf');
      TreeModelSettings = function() {
        function TreeModelSettings() {}
        return ($traceurRuntime.createClass)(TreeModelSettings, {}, {merge: function(child, parent) {
            var parentCascadingSettings = omit(get(parent, 'settings'), TreeModelSettings.NOT_CASCADING_SETTINGS);
            return defaultsDeep({}, get(child, 'settings'), parentCascadingSettings, {
              static: false,
              leftMenu: false,
              rightMenu: true,
              dragIcon: false,
              isCollapsedOnInit: false,
              checked: false,
              keepNodesInDOM: false,
              selectionAllowed: true
            });
          }});
      }();
      $__export("TreeModelSettings", TreeModelSettings);
      TreeModelSettings.NOT_CASCADING_SETTINGS = ['selectionAllowed'];
      Ng2TreeSettings = function() {
        function Ng2TreeSettings() {
          this.rootIsVisible = true;
          this.showCheckboxes = false;
          this.enableCheckboxes = true;
          this.ignoreParentOnCheck = false;
        }
        return ($traceurRuntime.createClass)(Ng2TreeSettings, {}, {});
      }();
      $__export("Ng2TreeSettings", Ng2TreeSettings);
      $__export("TreeStatus", TreeStatus);
      (function(TreeStatus) {
        TreeStatus[TreeStatus["New"] = 0] = "New";
        TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
        TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
      })(TreeStatus || ($__export("TreeStatus", TreeStatus = {})));
    }
  };
});

!function (r, n) {
  "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == "function" && true ? $__System.registerDynamic("22", [], false, function ($__require, $__exports, $__module) {
    if (typeof n === "function") {
      return n.call($__exports, $__exports);
    } else {
      return n;
    }
  }) : n((r = r || self).uuid = {});
}(this, function (r) {
  "use strict";
  var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto),
      e = new Uint8Array(16);function t() {
    if (!n) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(e);
  }for (var o, a, u = [], f = 0; f < 256; ++f) u[f] = (f + 256).toString(16).substr(1);function c(r, n) {
    var e = n || 0,
        t = u;return [t[r[e++]], t[r[e++]], t[r[e++]], t[r[e++]], "-", t[r[e++]], t[r[e++]], "-", t[r[e++]], t[r[e++]], "-", t[r[e++]], t[r[e++]], "-", t[r[e++]], t[r[e++]], t[r[e++]], t[r[e++]], t[r[e++]], t[r[e++]]].join("");
  }var i = 0,
      s = 0;function v(r, n, e) {
    var t = function (r, t, o, a) {
      var u = o && a || 0;if ("string" == typeof r && (r = function (r) {
        r = unescape(encodeURIComponent(r));for (var n = new Array(r.length), e = 0; e < r.length; e++) n[e] = r.charCodeAt(e);return n;
      }(r)), "string" == typeof t && (t = function (r) {
        var n = [];return r.replace(/[a-fA-F0-9]{2}/g, function (r) {
          n.push(parseInt(r, 16));
        }), n;
      }(t)), !Array.isArray(r)) throw TypeError("value must be an array of bytes");if (!Array.isArray(t) || 16 !== t.length) throw TypeError("namespace must be uuid string or an Array of 16 byte values");var f = e(t.concat(r));if (f[6] = 15 & f[6] | n, f[8] = 63 & f[8] | 128, o) for (var i = 0; i < 16; ++i) o[u + i] = f[i];return o || c(f);
    };try {
      t.name = r;
    } catch (r) {}return t.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", t.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", t;
  }function d(r, n) {
    var e = (65535 & r) + (65535 & n);return (r >> 16) + (n >> 16) + (e >> 16) << 16 | 65535 & e;
  }function l(r, n, e, t, o, a) {
    return d((u = d(d(n, r), d(t, a))) << (f = o) | u >>> 32 - f, e);var u, f;
  }function p(r, n, e, t, o, a, u) {
    return l(n & e | ~n & t, r, n, o, a, u);
  }function y(r, n, e, t, o, a, u) {
    return l(n & t | e & ~t, r, n, o, a, u);
  }function h(r, n, e, t, o, a, u) {
    return l(n ^ e ^ t, r, n, o, a, u);
  }function g(r, n, e, t, o, a, u) {
    return l(e ^ (n | ~t), r, n, o, a, u);
  }var m = v("v3", 48, function (r) {
    if ("string" == typeof r) {
      var n = unescape(encodeURIComponent(r));r = new Array(n.length);for (var e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
    }return function (r) {
      var n,
          e,
          t,
          o = [],
          a = 32 * r.length;for (n = 0; n < a; n += 8) e = r[n >> 5] >>> n % 32 & 255, t = parseInt("0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(15 & e), 16), o.push(t);return o;
    }(function (r, n) {
      var e, t, o, a, u;r[n >> 5] |= 128 << n % 32, r[14 + (n + 64 >>> 9 << 4)] = n;var f = 1732584193,
          c = -271733879,
          i = -1732584194,
          s = 271733878;for (e = 0; e < r.length; e += 16) t = f, o = c, a = i, u = s, f = p(f, c, i, s, r[e], 7, -680876936), s = p(s, f, c, i, r[e + 1], 12, -389564586), i = p(i, s, f, c, r[e + 2], 17, 606105819), c = p(c, i, s, f, r[e + 3], 22, -1044525330), f = p(f, c, i, s, r[e + 4], 7, -176418897), s = p(s, f, c, i, r[e + 5], 12, 1200080426), i = p(i, s, f, c, r[e + 6], 17, -1473231341), c = p(c, i, s, f, r[e + 7], 22, -45705983), f = p(f, c, i, s, r[e + 8], 7, 1770035416), s = p(s, f, c, i, r[e + 9], 12, -1958414417), i = p(i, s, f, c, r[e + 10], 17, -42063), c = p(c, i, s, f, r[e + 11], 22, -1990404162), f = p(f, c, i, s, r[e + 12], 7, 1804603682), s = p(s, f, c, i, r[e + 13], 12, -40341101), i = p(i, s, f, c, r[e + 14], 17, -1502002290), c = p(c, i, s, f, r[e + 15], 22, 1236535329), f = y(f, c, i, s, r[e + 1], 5, -165796510), s = y(s, f, c, i, r[e + 6], 9, -1069501632), i = y(i, s, f, c, r[e + 11], 14, 643717713), c = y(c, i, s, f, r[e], 20, -373897302), f = y(f, c, i, s, r[e + 5], 5, -701558691), s = y(s, f, c, i, r[e + 10], 9, 38016083), i = y(i, s, f, c, r[e + 15], 14, -660478335), c = y(c, i, s, f, r[e + 4], 20, -405537848), f = y(f, c, i, s, r[e + 9], 5, 568446438), s = y(s, f, c, i, r[e + 14], 9, -1019803690), i = y(i, s, f, c, r[e + 3], 14, -187363961), c = y(c, i, s, f, r[e + 8], 20, 1163531501), f = y(f, c, i, s, r[e + 13], 5, -1444681467), s = y(s, f, c, i, r[e + 2], 9, -51403784), i = y(i, s, f, c, r[e + 7], 14, 1735328473), c = y(c, i, s, f, r[e + 12], 20, -1926607734), f = h(f, c, i, s, r[e + 5], 4, -378558), s = h(s, f, c, i, r[e + 8], 11, -2022574463), i = h(i, s, f, c, r[e + 11], 16, 1839030562), c = h(c, i, s, f, r[e + 14], 23, -35309556), f = h(f, c, i, s, r[e + 1], 4, -1530992060), s = h(s, f, c, i, r[e + 4], 11, 1272893353), i = h(i, s, f, c, r[e + 7], 16, -155497632), c = h(c, i, s, f, r[e + 10], 23, -1094730640), f = h(f, c, i, s, r[e + 13], 4, 681279174), s = h(s, f, c, i, r[e], 11, -358537222), i = h(i, s, f, c, r[e + 3], 16, -722521979), c = h(c, i, s, f, r[e + 6], 23, 76029189), f = h(f, c, i, s, r[e + 9], 4, -640364487), s = h(s, f, c, i, r[e + 12], 11, -421815835), i = h(i, s, f, c, r[e + 15], 16, 530742520), c = h(c, i, s, f, r[e + 2], 23, -995338651), f = g(f, c, i, s, r[e], 6, -198630844), s = g(s, f, c, i, r[e + 7], 10, 1126891415), i = g(i, s, f, c, r[e + 14], 15, -1416354905), c = g(c, i, s, f, r[e + 5], 21, -57434055), f = g(f, c, i, s, r[e + 12], 6, 1700485571), s = g(s, f, c, i, r[e + 3], 10, -1894986606), i = g(i, s, f, c, r[e + 10], 15, -1051523), c = g(c, i, s, f, r[e + 1], 21, -2054922799), f = g(f, c, i, s, r[e + 8], 6, 1873313359), s = g(s, f, c, i, r[e + 15], 10, -30611744), i = g(i, s, f, c, r[e + 6], 15, -1560198380), c = g(c, i, s, f, r[e + 13], 21, 1309151649), f = g(f, c, i, s, r[e + 4], 6, -145523070), s = g(s, f, c, i, r[e + 11], 10, -1120210379), i = g(i, s, f, c, r[e + 2], 15, 718787259), c = g(c, i, s, f, r[e + 9], 21, -343485551), f = d(f, t), c = d(c, o), i = d(i, a), s = d(s, u);return [f, c, i, s];
    }(function (r) {
      var n,
          e = [];for (e[(r.length >> 2) - 1] = void 0, n = 0; n < e.length; n += 1) e[n] = 0;var t = 8 * r.length;for (n = 0; n < t; n += 8) e[n >> 5] |= (255 & r[n / 8]) << n % 32;return e;
    }(r), 8 * r.length));
  });function b(r, n, e, t) {
    switch (r) {case 0:
        return n & e ^ ~n & t;case 1:
        return n ^ e ^ t;case 2:
        return n & e ^ n & t ^ e & t;case 3:
        return n ^ e ^ t;}
  }function A(r, n) {
    return r << n | r >>> 32 - n;
  }var w = v("v5", 80, function (r) {
    var n = [1518500249, 1859775393, 2400959708, 3395469782],
        e = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];if ("string" == typeof r) {
      var t = unescape(encodeURIComponent(r));r = new Array(t.length);for (var o = 0; o < t.length; o++) r[o] = t.charCodeAt(o);
    }r.push(128);var a = r.length / 4 + 2,
        u = Math.ceil(a / 16),
        f = new Array(u);for (o = 0; o < u; o++) {
      f[o] = new Array(16);for (var c = 0; c < 16; c++) f[o][c] = r[64 * o + 4 * c] << 24 | r[64 * o + 4 * c + 1] << 16 | r[64 * o + 4 * c + 2] << 8 | r[64 * o + 4 * c + 3];
    }for (f[u - 1][14] = 8 * (r.length - 1) / Math.pow(2, 32), f[u - 1][14] = Math.floor(f[u - 1][14]), f[u - 1][15] = 8 * (r.length - 1) & 4294967295, o = 0; o < u; o++) {
      for (var i = new Array(80), s = 0; s < 16; s++) i[s] = f[o][s];for (s = 16; s < 80; s++) i[s] = A(i[s - 3] ^ i[s - 8] ^ i[s - 14] ^ i[s - 16], 1);var v = e[0],
          d = e[1],
          l = e[2],
          p = e[3],
          y = e[4];for (s = 0; s < 80; s++) {
        var h = Math.floor(s / 20),
            g = A(v, 5) + b(h, d, l, p) + y + n[h] + i[s] >>> 0;y = p, p = l, l = A(d, 30) >>> 0, d = v, v = g;
      }e[0] = e[0] + v >>> 0, e[1] = e[1] + d >>> 0, e[2] = e[2] + l >>> 0, e[3] = e[3] + p >>> 0, e[4] = e[4] + y >>> 0;
    }return [e[0] >> 24 & 255, e[0] >> 16 & 255, e[0] >> 8 & 255, 255 & e[0], e[1] >> 24 & 255, e[1] >> 16 & 255, e[1] >> 8 & 255, 255 & e[1], e[2] >> 24 & 255, e[2] >> 16 & 255, e[2] >> 8 & 255, 255 & e[2], e[3] >> 24 & 255, e[3] >> 16 & 255, e[3] >> 8 & 255, 255 & e[3], e[4] >> 24 & 255, e[4] >> 16 & 255, e[4] >> 8 & 255, 255 & e[4]];
  });r.v1 = function (r, n, e) {
    var u = n && e || 0,
        f = n || [],
        v = (r = r || {}).node || o,
        d = void 0 !== r.clockseq ? r.clockseq : a;if (null == v || null == d) {
      var l = r.random || (r.rng || t)();null == v && (v = o = [1 | l[0], l[1], l[2], l[3], l[4], l[5]]), null == d && (d = a = 16383 & (l[6] << 8 | l[7]));
    }var p = void 0 !== r.msecs ? r.msecs : new Date().getTime(),
        y = void 0 !== r.nsecs ? r.nsecs : s + 1,
        h = p - i + (y - s) / 1e4;if (h < 0 && void 0 === r.clockseq && (d = d + 1 & 16383), (h < 0 || p > i) && void 0 === r.nsecs && (y = 0), y >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");i = p, s = y, a = d;var g = (1e4 * (268435455 & (p += 122192928e5)) + y) % 4294967296;f[u++] = g >>> 24 & 255, f[u++] = g >>> 16 & 255, f[u++] = g >>> 8 & 255, f[u++] = 255 & g;var m = p / 4294967296 * 1e4 & 268435455;f[u++] = m >>> 8 & 255, f[u++] = 255 & m, f[u++] = m >>> 24 & 15 | 16, f[u++] = m >>> 16 & 255, f[u++] = d >>> 8 | 128, f[u++] = 255 & d;for (var b = 0; b < 6; ++b) f[u + b] = v[b];return n || c(f);
  }, r.v3 = m, r.v4 = function (r, n, e) {
    var o = n && e || 0;"string" == typeof r && (n = "binary" === r ? new Array(16) : null, r = null);var a = (r = r || {}).random || (r.rng || t)();if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, n) for (var u = 0; u < 16; ++u) n[o + u] = a[u];return n || c(a);
  }, r.v5 = w, Object.defineProperty(r, "__esModule", { value: !0 });
});
$__System.register("10", ["15", "f", "22", "1b"], function($__export) {
  "use strict";
  var defaultsDeep,
      get,
      has,
      includes,
      isEmpty,
      isFunction,
      isNil,
      omit,
      once,
      size,
      trim,
      FoldingType,
      TreeModelSettings,
      TreeStatus,
      uuidv4,
      Observable,
      of,
      ChildrenLoadingState,
      Tree;
  return {
    setters: [function($__m) {
      defaultsDeep = $__m.defaultsDeep;
      get = $__m.get;
      has = $__m.has;
      includes = $__m.includes;
      isEmpty = $__m.isEmpty;
      isFunction = $__m.isFunction;
      isNil = $__m.isNil;
      omit = $__m.omit;
      once = $__m.once;
      size = $__m.size;
      trim = $__m.trim;
    }, function($__m) {
      FoldingType = $__m.FoldingType;
      TreeModelSettings = $__m.TreeModelSettings;
      TreeStatus = $__m.TreeStatus;
    }, function($__m) {
      uuidv4 = $__m.v4;
    }, function($__m) {
      Observable = $__m.Observable;
      of = $__m.of;
    }],
    execute: function() {
      (function(ChildrenLoadingState) {
        ChildrenLoadingState[ChildrenLoadingState["NotStarted"] = 0] = "NotStarted";
        ChildrenLoadingState[ChildrenLoadingState["Loading"] = 1] = "Loading";
        ChildrenLoadingState[ChildrenLoadingState["Completed"] = 2] = "Completed";
      })(ChildrenLoadingState || (ChildrenLoadingState = {}));
      Tree = function() {
        function Tree(node) {
          var parent = arguments[1] !== (void 0) ? arguments[1] : null;
          var isBranch = arguments[2] !== (void 0) ? arguments[2] : false;
          var $__3 = this;
          this._childrenLoadingState = ChildrenLoadingState.NotStarted;
          this._childrenAsyncOnce = once(function() {
            return new Observable(function(observer) {
              setTimeout(function() {
                $__3._childrenLoadingState = ChildrenLoadingState.Loading;
                $__3._loadChildren(function(children) {
                  $__3._children = (children || []).map(function(child) {
                    return new Tree(child, $__3);
                  });
                  $__3._childrenLoadingState = ChildrenLoadingState.Completed;
                  observer.next($__3.children);
                  observer.complete();
                });
              });
            });
          });
          this.buildTreeFromModel(node, parent, isBranch || Array.isArray(node.children));
        }
        return ($traceurRuntime.createClass)(Tree, {
          buildTreeFromModel: function(model, parent, isBranch) {
            var $__3 = this;
            this.parent = parent;
            this.node = Object.assign(omit(model, 'children'), {settings: TreeModelSettings.merge(model, get(parent, 'node'))}, {emitLoadNextLevel: model.emitLoadNextLevel === true});
            if (isFunction(this.node.loadChildren)) {
              this._loadChildren = this.node.loadChildren;
            } else {
              get(model, 'children', []).forEach(function(child, index) {
                $__3._addChild(new Tree(child, $__3), index);
              });
            }
            if (!Array.isArray(this._children)) {
              this._children = this.node.loadChildren || isBranch ? [] : null;
            }
          },
          hasDeferredChildren: function() {
            return typeof this._loadChildren === 'function';
          },
          loadingChildrenRequested: function() {
            this._childrenLoadingState = ChildrenLoadingState.Loading;
          },
          childrenAreBeingLoaded: function() {
            return this._childrenLoadingState === ChildrenLoadingState.Loading;
          },
          childrenWereLoaded: function() {
            return this._childrenLoadingState === ChildrenLoadingState.Completed;
          },
          canLoadChildren: function() {
            return (this._childrenLoadingState === ChildrenLoadingState.NotStarted && this.foldingType === FoldingType.Expanded && !!this._loadChildren);
          },
          childrenShouldBeLoaded: function() {
            return !this.childrenWereLoaded() && (!!this._loadChildren || this.node.emitLoadNextLevel === true);
          },
          get children() {
            return this._children;
          },
          get childrenAsync() {
            if (this.canLoadChildren()) {
              return this._childrenAsyncOnce();
            }
            return of(this.children);
          },
          reloadChildren: function() {
            var $__3 = this;
            if (this.childrenShouldBeLoaded()) {
              this._childrenLoadingState = ChildrenLoadingState.Loading;
              this._loadChildren(function(children) {
                $__3._children = children && children.map(function(child) {
                  return new Tree(child, $__3);
                });
                $__3._childrenLoadingState = ChildrenLoadingState.Completed;
              });
            }
          },
          setChildren: function(children) {
            var $__3 = this;
            this._children = children && children.map(function(child) {
              return new Tree(child, $__3);
            });
            if (this.childrenShouldBeLoaded()) {
              this._childrenLoadingState = ChildrenLoadingState.Completed;
            }
          },
          createNode: function(isBranch) {
            var model = arguments[1] !== (void 0) ? arguments[1] : {value: ''};
            var tree = new Tree(model, this, isBranch);
            if (!model.id) {
              tree.markAsNew();
            }
            tree.id = tree.id || uuidv4();
            if (this.childrenShouldBeLoaded() && !(this.childrenAreBeingLoaded() || this.childrenWereLoaded())) {
              return null;
            }
            if (this.isLeaf()) {
              return this.addSibling(tree);
            } else {
              return this.addChild(tree);
            }
          },
          get value() {
            return this.node.value;
          },
          set checked(checked) {
            this.node.settings = Object.assign({}, this.node.settings, {checked: checked});
          },
          get checked() {
            return !!get(this.node.settings, 'checked');
          },
          get checkedChildren() {
            return this.hasLoadedChildren() ? this.children.filter(function(child) {
              return child.checked;
            }) : [];
          },
          set selectionAllowed(selectionAllowed) {
            this.node.settings = Object.assign({}, this.node.settings, {selectionAllowed: selectionAllowed});
          },
          get selectionAllowed() {
            var value = get(this.node.settings, 'selectionAllowed');
            return isNil(value) ? true : !!value;
          },
          hasLoadedChildren: function() {
            return !isEmpty(this.children);
          },
          loadedChildrenAmount: function() {
            return size(this.children);
          },
          checkedChildrenAmount: function() {
            return size(this.checkedChildren);
          },
          set value(value) {
            if (typeof value !== 'string' && !Tree.isRenamable(value)) {
              return;
            }
            var stringifiedValue = '' + value;
            if (Tree.isRenamable(this.value)) {
              this.node.value = Tree.applyNewValueToRenamable(this.value, stringifiedValue);
            } else {
              this.node.value = Tree.isValueEmpty(stringifiedValue) ? this.node.value : stringifiedValue;
            }
          },
          addSibling: function(sibling, position) {
            if (Array.isArray(get(this.parent, 'children'))) {
              return this.parent.addChild(sibling, position);
            }
            return null;
          },
          addChild: function(child, position) {
            var newborn = this._addChild(Tree.cloneTreeShallow(child), position);
            this._setFoldingType();
            if (this.isNodeCollapsed()) {
              this.switchFoldingType();
            }
            return newborn;
          },
          _addChild: function(child) {
            var position = arguments[1] !== (void 0) ? arguments[1] : size(this._children) || 0;
            child.parent = this;
            if (Array.isArray(this._children)) {
              this._children.splice(position, 0, child);
            } else {
              this._children = [child];
            }
            return child;
          },
          moveSiblingAbove: function(sibling) {
            if (!this.hasSibling(sibling)) {
              return;
            }
            var siblings = this.parent._children;
            var siblingToMove = siblings.splice(sibling.positionInParent, 1)[0];
            var insertAtIndex = this.positionInParent;
            siblings.splice(insertAtIndex, 0, siblingToMove);
          },
          moveSiblingBelow: function(sibling) {
            if (!this.hasSibling(sibling)) {
              return;
            }
            var siblings = this.parent._children;
            var siblingToMove = siblings.splice(sibling.positionInParent, 1)[0];
            var insertAtIndex = this.positionInParent + 1;
            siblings.splice(insertAtIndex, 0, siblingToMove);
          },
          get positionInParent() {
            if (this.isRoot()) {
              return -1;
            }
            return this.parent.children ? this.parent.children.indexOf(this) : -1;
          },
          isStatic: function() {
            return get(this.node.settings, 'static', false);
          },
          hasLeftMenu: function() {
            return !get(this.node.settings, 'static', false) && get(this.node.settings, 'leftMenu', false);
          },
          hasRightMenu: function() {
            return !get(this.node.settings, 'static', false) && get(this.node.settings, 'rightMenu', false);
          },
          hasDragIcon: function() {
            return !get(this.node.settings, 'static', false) && get(this.node.settings, 'dragIcon', false);
          },
          isLeaf: function() {
            return !this.isBranch();
          },
          get menuItems() {
            return get(this.node.settings, 'menuItems');
          },
          hasCustomMenu: function() {
            return !this.isStatic() && !!get(this.node.settings, 'menuItems', false);
          },
          isBranch: function() {
            return this.node.emitLoadNextLevel === true || Array.isArray(this._children);
          },
          hasChildren: function() {
            return !isEmpty(this._children) || this.childrenShouldBeLoaded();
          },
          isRoot: function() {
            return isNil(this.parent);
          },
          hasSibling: function(tree) {
            return !this.isRoot() && includes(this.parent.children, tree);
          },
          hasChild: function(tree) {
            return includes(this._children, tree);
          },
          removeChild: function(tree) {
            if (!this.hasChildren()) {
              return;
            }
            var childIndex = this._children.findIndex(function(child) {
              return child === tree;
            });
            if (childIndex >= 0) {
              this._children.splice(childIndex, 1);
            }
            this._setFoldingType();
          },
          removeItselfFromParent: function() {
            if (!this.parent) {
              return;
            }
            this.parent.removeChild(this);
          },
          switchFoldingType: function() {
            if (this.isLeaf() || !this.hasChildren()) {
              return;
            }
            this.disableCollapseOnInit();
            this.node._foldingType = this.isNodeExpanded() ? FoldingType.Collapsed : FoldingType.Expanded;
          },
          isNodeExpanded: function() {
            return this.foldingType === FoldingType.Expanded;
          },
          isNodeCollapsed: function() {
            return this.foldingType === FoldingType.Collapsed;
          },
          _setFoldingType: function() {
            if (this.childrenShouldBeLoaded()) {
              this.node._foldingType = FoldingType.Collapsed;
            } else if (this._children && !isEmpty(this._children)) {
              this.node._foldingType = this.isCollapsedOnInit() ? FoldingType.Collapsed : FoldingType.Expanded;
            } else if (Array.isArray(this._children)) {
              this.node._foldingType = FoldingType.Empty;
            } else {
              this.node._foldingType = FoldingType.Leaf;
            }
          },
          get foldingType() {
            if (!this.node._foldingType) {
              this._setFoldingType();
            }
            return this.node._foldingType;
          },
          get foldingCssClass() {
            return this.getCssClassesFromSettings() || this.foldingType.cssClass;
          },
          getCssClassesFromSettings: function() {
            if (!this.node._foldingType) {
              this._setFoldingType();
            }
            if (this.node._foldingType === FoldingType.Collapsed) {
              return get(this.node.settings, 'cssClasses.collapsed', null);
            } else if (this.node._foldingType === FoldingType.Expanded) {
              return get(this.node.settings, 'cssClasses.expanded', null);
            } else if (this.node._foldingType === FoldingType.Empty) {
              return get(this.node.settings, 'cssClasses.empty', null);
            }
            return get(this.node.settings, 'cssClasses.leaf', null);
          },
          get nodeTemplate() {
            return this.getTemplateFromSettings();
          },
          getTemplateFromSettings: function() {
            if (this.isLeaf()) {
              return get(this.node.settings, 'templates.leaf', '');
            } else {
              return get(this.node.settings, 'templates.node', '');
            }
          },
          get leftMenuTemplate() {
            if (this.hasLeftMenu()) {
              return get(this.node.settings, 'templates.leftMenu', '<span></span>');
            }
            return '';
          },
          get dragTemplate() {
            return get(this.node.settings, 'templates.dragIcon', '<span></span>');
          },
          disableCollapseOnInit: function() {
            if (this.node.settings) {
              this.node.settings.isCollapsedOnInit = false;
            }
          },
          isCollapsedOnInit: function() {
            return !!get(this.node.settings, 'isCollapsedOnInit');
          },
          keepNodesInDOM: function() {
            return get(this.node.settings, 'keepNodesInDOM');
          },
          isNew: function() {
            return this.node._status === TreeStatus.New;
          },
          get id() {
            return get(this.node, 'id');
          },
          set id(id) {
            this.node.id = id;
          },
          markAsNew: function() {
            this.node._status = TreeStatus.New;
          },
          isBeingRenamed: function() {
            return this.node._status === TreeStatus.IsBeingRenamed;
          },
          markAsBeingRenamed: function() {
            this.node._status = TreeStatus.IsBeingRenamed;
          },
          isModified: function() {
            return this.node._status === TreeStatus.Modified;
          },
          markAsModified: function() {
            this.node._status = TreeStatus.Modified;
          },
          toTreeModel: function() {
            var model = defaultsDeep(this.isLeaf() ? {} : {children: []}, this.node);
            if (this.children) {
              this.children.forEach(function(child) {
                model.children.push(child.toTreeModel());
              });
            }
            return model;
          }
        }, {
          isValueEmpty: function(value) {
            return isEmpty(trim(value));
          },
          isRenamable: function(value) {
            return (has(value, 'setName') && isFunction(value.setName) && (has(value, 'toString') && isFunction(value.toString) && value.toString !== Object.toString));
          },
          cloneTreeShallow: function(origin) {
            var tree = new Tree(Object.assign({}, origin.node));
            tree._children = origin._children;
            return tree;
          },
          applyNewValueToRenamable: function(value, newValue) {
            var renamableValue = Object.assign({}, value);
            renamableValue.setName(newValue);
            return renamableValue;
          }
        });
      }();
      $__export("Tree", Tree);
    }
  };
});

$__System.register("1e", ["d", "19", "1a", "10", "18"], function($__export) {
  "use strict";
  var Directive,
      ElementRef,
      Inject,
      Input,
      Renderer2,
      NodeDraggableService,
      CapturedNode,
      Tree,
      DropPosition,
      i0,
      i1,
      NodeDraggableDirective;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      ElementRef = $__m.ElementRef;
      Inject = $__m.Inject;
      Input = $__m.Input;
      Renderer2 = $__m.Renderer2;
      i0 = $__m;
    }, function($__m) {
      NodeDraggableService = $__m.NodeDraggableService;
      i1 = $__m;
    }, function($__m) {
      CapturedNode = $__m.CapturedNode;
    }, function($__m) {
      Tree = $__m.Tree;
    }, function($__m) {
      DropPosition = $__m.DropPosition;
    }],
    execute: function() {
      NodeDraggableDirective = function() {
        function NodeDraggableDirective(element, nodeDraggableService, renderer) {
          this.element = element;
          this.nodeDraggableService = nodeDraggableService;
          this.renderer = renderer;
          this.disposersForDragListeners = [];
          this.nodeNativeElement = element.nativeElement;
        }
        return ($traceurRuntime.createClass)(NodeDraggableDirective, {
          ngOnInit: function() {
            if (!this.tree.isStatic()) {
              this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
              this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
              this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
              this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
              this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
              this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
              this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
            }
          },
          ngOnDestroy: function() {
            this.disposersForDragListeners.forEach(function(dispose) {
              return dispose();
            });
          },
          handleDragStart: function(e) {
            if (this.tree.isBeingRenamed()) {
              e.preventDefault();
              return;
            }
            if (e.stopPropagation) {
              e.stopPropagation();
            }
            if (!this.tree.checked) {
              this.nodeDraggableService.setDraggedNode(new CapturedNode(this.nodeDraggable, this.tree));
            }
            this.notifyThatNodeIsBeingDragged();
            if (this.tree.node.settings.dragImageId) {
              var elem = document.getElementById(this.tree.node.settings.dragImageId);
              if (elem) {
                e.dataTransfer.setDragImage(elem, 0, 0);
              }
            }
            this.applyDraggedNodeClasses();
            e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
            e.dataTransfer.effectAllowed = 'all';
          },
          handleDragOver: function(e) {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode && draggedNode.contains({nativeElement: e.currentTarget})) {
              return;
            }
            if (!draggedNode && this.tree.checked) {
              return;
            }
            var newDropPosition = this.determineDropPosition(e);
            this.removeClasses([this.getDropPositionClassName(this.currentDropPosition)]);
            if (this.tree.isBranch() && this.tree.isNodeExpanded() && newDropPosition === DropPosition.Below) {
              return;
            }
            if (draggedNode && this.tree.isBranch() && this.tree.hasChild(draggedNode.tree) && newDropPosition === DropPosition.Into) {
              return;
            }
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            this.addClasses([this.getDropPositionClassName(newDropPosition)]);
            this.currentDropPosition = newDropPosition;
          },
          handleDragEnter: function(e) {
            e.preventDefault();
            if (this.containsElementAt(e)) {
              this.addClasses(['over-drop-target', this.getDragOverClassName()]);
            }
          },
          handleDragLeave: function(e) {
            if (!this.containsElementAt(e)) {
              this.removeClasses(['over-drop-target', this.getDragOverClassName(), this.getDropPositionClassName(this.currentDropPosition)]);
            }
          },
          handleDragEnd: function(e) {
            this.removeClasses(['over-drop-target', this.getDragOverClassName(), this.getDropPositionClassName(this.currentDropPosition)]);
            this.removeDraggedNodeClasses();
            this.nodeDraggableService.releaseDraggedNode();
          },
          handleDrop: function(e) {
            e.preventDefault();
            if (e.stopPropagation) {
              e.stopPropagation();
            }
            this.removeClasses(['over-drop-target', this.getDragOverClassName(), this.getDropPositionClassName(this.currentDropPosition)]);
            if (!this.isDropPossible(e)) {
              return false;
            }
            if (this.nodeDraggableService.getDraggedNode() || this.nodeDraggableService.getCheckedNodes().length > 0) {
              this.removeDraggedNodeClasses();
              this.notifyThatNodeWasDropped();
              this.releaseNodes();
            }
          },
          determineDropPosition: function(e) {
            var dropPosition;
            var currentTarget = e.currentTarget;
            var elemHeight = currentTarget.offsetHeight;
            var relativeMousePosition = e.clientY - currentTarget.getBoundingClientRect().top;
            if (this.tree.isBranch()) {
              var third = elemHeight / 3;
              var twoThirds = third * 2;
              if (relativeMousePosition < third) {
                dropPosition = DropPosition.Above;
              } else if (relativeMousePosition >= third && relativeMousePosition <= twoThirds) {
                dropPosition = DropPosition.Into;
              } else {
                dropPosition = DropPosition.Below;
              }
            } else {
              var half = elemHeight / 2;
              if (relativeMousePosition <= half) {
                dropPosition = DropPosition.Above;
              } else {
                dropPosition = DropPosition.Below;
              }
            }
            return dropPosition;
          },
          getDragOverClassName: function() {
            return this.tree.isBranch() ? 'over-drop-branch' : 'over-drop-leaf';
          },
          getDropPositionClassName: function(dropPosition) {
            switch (dropPosition) {
              case DropPosition.Above:
                return 'over-drop-above';
              case DropPosition.Into:
                return 'over-drop-into';
              case DropPosition.Below:
                return 'over-drop-below';
            }
          },
          isDropPossible: function(e) {
            var $__3 = this;
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
              return draggedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
            } else {
              var capturedNodes = this.nodeDraggableService.getCheckedNodes();
              return (capturedNodes.length > 0 && capturedNodes.some(function(cn) {
                return cn.canBeDroppedAt($__3.nodeDraggable);
              }) && this.containsElementAt(e));
            }
          },
          releaseNodes: function() {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
              this.nodeDraggableService.releaseDraggedNode();
            } else {
              this.nodeDraggableService.releaseCheckedNodes();
            }
          },
          applyDraggedNodeClasses: function() {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
              draggedNode.element.nativeElement.classList.add('being-dragged');
            } else {
              this.nodeDraggableService.getCheckedNodes().forEach(function(n) {
                return n.element.nativeElement.classList.add('being-dragged');
              });
            }
          },
          removeDraggedNodeClasses: function() {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            if (draggedNode) {
              draggedNode.element.nativeElement.classList.remove('being-dragged');
            } else {
              this.nodeDraggableService.getCheckedNodes().forEach(function(n) {
                return n.element.nativeElement.classList.remove('being-dragged');
              });
            }
          },
          containsElementAt: function(e) {
            var $__5,
                $__6;
            var $__4 = e,
                x = ($__5 = $__4.x) === void 0 ? e.clientX : $__5,
                y = ($__6 = $__4.y) === void 0 ? e.clientY : $__6;
            return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
          },
          addClasses: function(classNames) {
            var $__7;
            var classList = this.nodeNativeElement.classList;
            ($__7 = classList).add.apply($__7, $traceurRuntime.spread(classNames));
          },
          removeClasses: function(classNames) {
            var $__7;
            var classList = this.nodeNativeElement.classList;
            ($__7 = classList).remove.apply($__7, $traceurRuntime.spread(classNames));
          },
          notifyThatNodeWasDropped: function() {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            var nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
            this.nodeDraggableService.fireNodeDragged(nodes, this.nodeDraggable, this.currentDropPosition);
          },
          notifyThatNodeIsBeingDragged: function() {
            var draggedNode = this.nodeDraggableService.getDraggedNode();
            var nodes = draggedNode ? [draggedNode] : this.nodeDraggableService.getCheckedNodes();
            this.nodeDraggableService.fireNodeDragStart(nodes, this.nodeDraggable);
          }
        }, {});
      }();
      $__export("NodeDraggableDirective", NodeDraggableDirective);
      NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
      NodeDraggableDirective.ɵfac = function NodeDraggableDirective_Factory(t) {
        return new (t || NodeDraggableDirective)(i0.ɵɵdirectiveInject(ElementRef), i0.ɵɵdirectiveInject(NodeDraggableService), i0.ɵɵdirectiveInject(Renderer2));
      };
      NodeDraggableDirective.ɵdir = i0.ɵɵdefineDirective({
        type: NodeDraggableDirective,
        selectors: [["", "nodeDraggable", ""]],
        inputs: {
          nodeDraggable: "nodeDraggable",
          tree: "tree"
        }
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeDraggableDirective, [{
          type: Directive,
          args: [{selector: '[nodeDraggable]'}]
        }], function() {
          return [{
            type: i0.ElementRef,
            decorators: [{
              type: Inject,
              args: [ElementRef]
            }]
          }, {
            type: i1.NodeDraggableService,
            decorators: [{
              type: Inject,
              args: [NodeDraggableService]
            }]
          }, {
            type: i0.Renderer2,
            decorators: [{
              type: Inject,
              args: [Renderer2]
            }]
          }];
        }, {
          nodeDraggable: [{type: Input}],
          tree: [{type: Input}]
        });
      })();
    }
  };
});

$__System.register("17", [], function($__export) {
  "use strict";
  var NodeEditableEventAction;
  return {
    setters: [],
    execute: function() {
      $__export("NodeEditableEventAction", NodeEditableEventAction);
      (function(NodeEditableEventAction) {
        NodeEditableEventAction[NodeEditableEventAction["Cancel"] = 0] = "Cancel";
      })(NodeEditableEventAction || ($__export("NodeEditableEventAction", NodeEditableEventAction = {})));
    }
  };
});

$__System.register("1f", ["d", "17"], function($__export) {
  "use strict";
  var Directive,
      ElementRef,
      EventEmitter,
      HostListener,
      Inject,
      Input,
      Output,
      Renderer2,
      NodeEditableEventAction,
      i0,
      NodeEditableDirective;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      ElementRef = $__m.ElementRef;
      EventEmitter = $__m.EventEmitter;
      HostListener = $__m.HostListener;
      Inject = $__m.Inject;
      Input = $__m.Input;
      Output = $__m.Output;
      Renderer2 = $__m.Renderer2;
      i0 = $__m;
    }, function($__m) {
      NodeEditableEventAction = $__m.NodeEditableEventAction;
    }],
    execute: function() {
      NodeEditableDirective = function() {
        function NodeEditableDirective(renderer, elementRef) {
          this.renderer = renderer;
          this.elementRef = elementRef;
          this.valueChanged = new EventEmitter(false);
        }
        return ($traceurRuntime.createClass)(NodeEditableDirective, {
          ngOnInit: function() {
            var nativeElement = this.elementRef.nativeElement;
            if (nativeElement) {
              nativeElement.focus();
            }
            this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
          },
          applyNewValue: function(newNodeValue) {
            this.valueChanged.emit({
              type: 'keyup',
              value: newNodeValue
            });
          },
          applyNewValueByLoosingFocus: function(newNodeValue) {
            this.valueChanged.emit({
              type: 'blur',
              value: newNodeValue
            });
          },
          cancelEditing: function() {
            this.valueChanged.emit({
              type: 'keyup',
              value: this.nodeValue,
              action: NodeEditableEventAction.Cancel
            });
          }
        }, {});
      }();
      $__export("NodeEditableDirective", NodeEditableDirective);
      NodeEditableDirective.ɵfac = function NodeEditableDirective_Factory(t) {
        return new (t || NodeEditableDirective)(i0.ɵɵdirectiveInject(Renderer2), i0.ɵɵdirectiveInject(ElementRef));
      };
      NodeEditableDirective.ɵdir = i0.ɵɵdefineDirective({
        type: NodeEditableDirective,
        selectors: [["", "nodeEditable", ""]],
        hostBindings: function NodeEditableDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵlistener("keyup.enter", function NodeEditableDirective_keyup_enter_HostBindingHandler($event) {
              return ctx.applyNewValue($event.target.value);
            })("blur", function NodeEditableDirective_blur_HostBindingHandler($event) {
              return ctx.applyNewValueByLoosingFocus($event.target.value);
            })("keyup.esc", function NodeEditableDirective_keyup_esc_HostBindingHandler() {
              return ctx.cancelEditing();
            });
          }
        },
        inputs: {nodeValue: ["nodeEditable", "nodeValue"]},
        outputs: {valueChanged: "valueChanged"}
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeEditableDirective, [{
          type: Directive,
          args: [{selector: '[nodeEditable]'}]
        }], function() {
          return [{
            type: i0.Renderer2,
            decorators: [{
              type: Inject,
              args: [Renderer2]
            }]
          }, {
            type: i0.ElementRef,
            decorators: [{
              type: Inject,
              args: [ElementRef]
            }]
          }];
        }, {
          nodeValue: [{
            type: Input,
            args: ['nodeEditable']
          }],
          valueChanged: [{type: Output}],
          applyNewValue: [{
            type: HostListener,
            args: ['keyup.enter', ['$event.target.value']]
          }],
          applyNewValueByLoosingFocus: [{
            type: HostListener,
            args: ['blur', ['$event.target.value']]
          }],
          cancelEditing: [{
            type: HostListener,
            args: ['keyup.esc']
          }]
        });
      })();
    }
  };
});

$__System.register("14", [], function($__export) {
  "use strict";
  var Keys,
      MouseButtons;
  function isLeftButtonClicked(e) {
    return e.button === MouseButtons.Left;
  }
  function isRightButtonClicked(e) {
    return e.button === MouseButtons.Right;
  }
  function isEscapePressed(e) {
    return e.keyCode === Keys.Escape;
  }
  $__export("isLeftButtonClicked", isLeftButtonClicked);
  $__export("isRightButtonClicked", isRightButtonClicked);
  $__export("isEscapePressed", isEscapePressed);
  return {
    setters: [],
    execute: function() {
      $__export("Keys", Keys);
      (function(Keys) {
        Keys[Keys["Escape"] = 27] = "Escape";
      })(Keys || ($__export("Keys", Keys = {})));
      $__export("MouseButtons", MouseButtons);
      (function(MouseButtons) {
        MouseButtons[MouseButtons["Left"] = 0] = "Left";
        MouseButtons[MouseButtons["Right"] = 2] = "Right";
      })(MouseButtons || ($__export("MouseButtons", MouseButtons = {})));
    }
  };
});

$__System.register("20", ["d", "16", "13", "14", "1d"], function($__export) {
  "use strict";
  var Component,
      EventEmitter,
      Inject,
      Input,
      Output,
      Renderer2,
      ViewChild,
      NodeMenuService,
      NodeMenuAction,
      NodeMenuItemAction,
      isEscapePressed,
      isLeftButtonClicked,
      i0,
      i1,
      i2,
      _c0,
      _c1,
      NodeMenuComponent;
  function NodeMenuComponent_li_3_Template(rf, ctx) {
    if (rf & 1) {
      var _r4 = i0.ɵɵgetCurrentView();
      i0.ɵɵelementStart(0, "li", 4);
      i0.ɵɵlistener("click", function NodeMenuComponent_li_3_Template_li_click_0_listener($event) {
        var restoredCtx = i0.ɵɵrestoreView(_r4);
        var menuItem_r2 = restoredCtx.$implicit;
        var ctx_r3 = i0.ɵɵnextContext();
        return ctx_r3.onMenuItemSelected($event, menuItem_r2);
      });
      i0.ɵɵelement(1, "div");
      i0.ɵɵelementStart(2, "span", 5);
      i0.ɵɵtext(3);
      i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
      var menuItem_r2 = ctx.$implicit;
      i0.ɵɵadvance(1);
      i0.ɵɵclassMapInterpolate1("node-menu-item-icon ", menuItem_r2.cssClass, "");
      i0.ɵɵadvance(2);
      i0.ɵɵtextInterpolate(menuItem_r2.name);
    }
  }
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      EventEmitter = $__m.EventEmitter;
      Inject = $__m.Inject;
      Input = $__m.Input;
      Output = $__m.Output;
      Renderer2 = $__m.Renderer2;
      ViewChild = $__m.ViewChild;
      i0 = $__m;
    }, function($__m) {
      NodeMenuService = $__m.NodeMenuService;
      i2 = $__m;
    }, function($__m) {
      NodeMenuAction = $__m.NodeMenuAction;
      NodeMenuItemAction = $__m.NodeMenuItemAction;
    }, function($__m) {
      isEscapePressed = $__m.isEscapePressed;
      isLeftButtonClicked = $__m.isLeftButtonClicked;
    }, function($__m) {
      i1 = $__m;
    }],
    execute: function() {
      _c0 = ["menuContainer"];
      _c1 = function(a0) {
        return {"visibility": a0};
      };
      NodeMenuComponent = function() {
        function NodeMenuComponent(renderer, nodeMenuService) {
          this.renderer = renderer;
          this.nodeMenuService = nodeMenuService;
          this.visibility = 'hidden';
          this.menuItemSelected = new EventEmitter();
          this.availableMenuItems = [{
            name: 'New tag',
            action: NodeMenuItemAction.NewTag,
            cssClass: 'new-tag'
          }, {
            name: 'New folder',
            action: NodeMenuItemAction.NewFolder,
            cssClass: 'new-folder'
          }, {
            name: 'Rename',
            action: NodeMenuItemAction.Rename,
            cssClass: 'rename'
          }, {
            name: 'Remove',
            action: NodeMenuItemAction.Remove,
            cssClass: 'remove'
          }];
          this.disposersForGlobalListeners = [];
        }
        return ($traceurRuntime.createClass)(NodeMenuComponent, {
          ngOnInit: function() {
            this.availableMenuItems = this.menuItems || this.availableMenuItems;
            this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
            this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
          },
          ngAfterViewInit: function() {
            this.displayAboveOrBelow();
          },
          ngOnDestroy: function() {
            this.disposersForGlobalListeners.forEach(function(dispose) {
              return dispose();
            });
          },
          onMenuItemSelected: function(e, selectedMenuItem) {
            if (isLeftButtonClicked(e)) {
              this.menuItemSelected.emit({
                nodeMenuItemAction: selectedMenuItem.action,
                nodeMenuItemSelected: selectedMenuItem.name
              });
              this.nodeMenuService.fireMenuEvent(e.target, NodeMenuAction.Close);
            }
          },
          displayAboveOrBelow: function() {
            var $__2 = this;
            var menuContainerElem = this.menuContainer.nativeElement;
            var elemBCR = menuContainerElem.getBoundingClientRect();
            var elemTop = elemBCR.top;
            var elemHeight = elemBCR.height;
            var defaultDisplay = menuContainerElem.style.display;
            menuContainerElem.style.display = 'none';
            var scrollContainer = this.getScrollParent(menuContainerElem);
            menuContainerElem.style.display = defaultDisplay;
            var viewportBottom;
            if (scrollContainer) {
              var containerBCR = scrollContainer.getBoundingClientRect();
              var containerBottom = containerBCR.top + containerBCR.height;
              viewportBottom = containerBottom > window.innerHeight ? window.innerHeight : containerBottom;
            } else {
              viewportBottom = window.innerHeight;
            }
            var style = elemTop + elemHeight > viewportBottom ? 'bottom: 0' : 'top: 0';
            menuContainerElem.setAttribute('style', style);
            setTimeout(function() {
              return ($__2.visibility = 'visible');
            });
          },
          getScrollParent: function(node) {
            if (node == null) {
              return null;
            }
            if (node.clientHeight && node.clientHeight < node.scrollHeight) {
              return node;
            } else {
              return this.getScrollParent(node.parentElement);
            }
          },
          closeMenu: function(e) {
            var mouseClicked = e instanceof MouseEvent;
            var containingTarget = this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target);
            if ((mouseClicked && !containingTarget) || isEscapePressed(e)) {
              this.nodeMenuService.fireMenuEvent(e.target, NodeMenuAction.Close);
            }
          }
        }, {});
      }();
      $__export("NodeMenuComponent", NodeMenuComponent);
      NodeMenuComponent.ɵfac = function NodeMenuComponent_Factory(t) {
        return new (t || NodeMenuComponent)(i0.ɵɵdirectiveInject(Renderer2), i0.ɵɵdirectiveInject(NodeMenuService));
      };
      NodeMenuComponent.ɵcmp = i0.ɵɵdefineComponent({
        type: NodeMenuComponent,
        selectors: [["node-menu"]],
        viewQuery: function NodeMenuComponent_Query(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
          }
          if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuContainer = _t.first);
          }
        },
        inputs: {menuItems: "menuItems"},
        outputs: {menuItemSelected: "menuItemSelected"},
        decls: 4,
        vars: 4,
        consts: [[1, "node-menu", 3, "ngStyle"], [1, "node-menu-content"], ["menuContainer", ""], ["class", "node-menu-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "node-menu-item", 3, "click"], [1, "node-menu-item-value"]],
        template: function NodeMenuComponent_Template(rf, ctx) {
          if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "ul", 1, 2);
            i0.ɵɵtemplate(3, NodeMenuComponent_li_3_Template, 4, 4, "li", 3);
            i0.ɵɵelementEnd()();
          }
          if (rf & 2) {
            i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c1, ctx.visibility));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.availableMenuItems);
          }
        },
        directives: [i1.NgStyle, i1.NgForOf],
        encapsulation: 2
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuComponent, [{
          type: Component,
          args: [{
            selector: 'node-menu',
            template: "\n    <div class=\"node-menu\"  [ngStyle]=\"{'visibility': visibility}\">\n      <ul class=\"node-menu-content\" #menuContainer>\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n          (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
          }]
        }], function() {
          return [{
            type: i0.Renderer2,
            decorators: [{
              type: Inject,
              args: [Renderer2]
            }]
          }, {
            type: i2.NodeMenuService,
            decorators: [{
              type: Inject,
              args: [NodeMenuService]
            }]
          }];
        }, {
          menuItemSelected: [{type: Output}],
          menuItems: [{type: Input}],
          menuContainer: [{
            type: ViewChild,
            args: ['menuContainer']
          }]
        });
      })();
    }
  };
});

$__System.register("13", [], function($__export) {
  "use strict";
  var NodeMenuItemAction,
      NodeMenuAction;
  return {
    setters: [],
    execute: function() {
      $__export("NodeMenuItemAction", NodeMenuItemAction);
      (function(NodeMenuItemAction) {
        NodeMenuItemAction[NodeMenuItemAction["NewFolder"] = 0] = "NewFolder";
        NodeMenuItemAction[NodeMenuItemAction["NewTag"] = 1] = "NewTag";
        NodeMenuItemAction[NodeMenuItemAction["Rename"] = 2] = "Rename";
        NodeMenuItemAction[NodeMenuItemAction["Remove"] = 3] = "Remove";
        NodeMenuItemAction[NodeMenuItemAction["Custom"] = 4] = "Custom";
      })(NodeMenuItemAction || ($__export("NodeMenuItemAction", NodeMenuItemAction = {})));
      $__export("NodeMenuAction", NodeMenuAction);
      (function(NodeMenuAction) {
        NodeMenuAction[NodeMenuAction["Close"] = 0] = "Close";
      })(NodeMenuAction || ($__export("NodeMenuAction", NodeMenuAction = {})));
    }
  };
});

$__System.register("16", ["d", "1b", "1c", "13"], function($__export) {
  "use strict";
  var Injectable,
      Subject,
      filter,
      NodeMenuAction,
      i0,
      NodeMenuService;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
      i0 = $__m;
    }, function($__m) {
      Subject = $__m.Subject;
    }, function($__m) {
      filter = $__m.filter;
    }, function($__m) {
      NodeMenuAction = $__m.NodeMenuAction;
    }],
    execute: function() {
      NodeMenuService = function() {
        function NodeMenuService() {
          this.nodeMenuEvents$ = new Subject();
        }
        return ($traceurRuntime.createClass)(NodeMenuService, {
          fireMenuEvent: function(sender, action) {
            var nodeMenuEvent = {
              sender: sender,
              action: action
            };
            this.nodeMenuEvents$.next(nodeMenuEvent);
          },
          hideMenuStream: function(treeElementRef) {
            return this.nodeMenuEvents$.pipe(filter(function(e) {
              return treeElementRef.nativeElement !== e.sender;
            }), filter(function(e) {
              return e.action === NodeMenuAction.Close;
            }));
          },
          hideMenuForAllNodesExcept: function(treeElementRef) {
            this.nodeMenuEvents$.next({
              sender: treeElementRef.nativeElement,
              action: NodeMenuAction.Close
            });
          }
        }, {});
      }();
      $__export("NodeMenuService", NodeMenuService);
      NodeMenuService.ɵfac = function NodeMenuService_Factory(t) {
        return new (t || NodeMenuService)();
      };
      NodeMenuService.ɵprov = i0.ɵɵdefineInjectable({
        token: NodeMenuService,
        factory: NodeMenuService.ɵfac
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeMenuService, [{type: Injectable}], null, null);
      })();
    }
  };
});

$__System.register("23", [], function($__export) {
  "use strict";
  var NodeEvent,
      NodeDoubleClickedEvent,
      NodeSelectedEvent,
      NodeUnselectedEvent,
      NodeDestructiveEvent,
      NodeMovedEvent,
      NodeRemovedEvent,
      NodeCreatedEvent,
      NodeRenamedEvent,
      NodeExpandedEvent,
      NodeCollapsedEvent,
      MenuItemSelectedEvent,
      LoadNextLevelEvent,
      NodeCheckedEvent,
      NodeUncheckedEvent,
      NodeIndeterminateEvent,
      NodeRenameKeydownEvent,
      NodeRenameInputChangeEvent;
  return {
    setters: [],
    execute: function() {
      NodeEvent = function() {
        function NodeEvent(node) {
          this.node = node;
        }
        return ($traceurRuntime.createClass)(NodeEvent, {}, {});
      }();
      $__export("NodeEvent", NodeEvent);
      NodeDoubleClickedEvent = function($__super) {
        function NodeDoubleClickedEvent(node, e) {
          $traceurRuntime.superConstructor(NodeDoubleClickedEvent).call(this, node);
          this.e = e;
        }
        return ($traceurRuntime.createClass)(NodeDoubleClickedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeDoubleClickedEvent", NodeDoubleClickedEvent);
      NodeSelectedEvent = function($__super) {
        function NodeSelectedEvent(node) {
          $traceurRuntime.superConstructor(NodeSelectedEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeSelectedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeSelectedEvent", NodeSelectedEvent);
      NodeUnselectedEvent = function($__super) {
        function NodeUnselectedEvent(node) {
          $traceurRuntime.superConstructor(NodeUnselectedEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeUnselectedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeUnselectedEvent", NodeUnselectedEvent);
      NodeDestructiveEvent = function($__super) {
        function NodeDestructiveEvent(node) {
          $traceurRuntime.superConstructor(NodeDestructiveEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeDestructiveEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeDestructiveEvent", NodeDestructiveEvent);
      NodeMovedEvent = function($__super) {
        function NodeMovedEvent(node, previousParent, previousPosition) {
          $traceurRuntime.superConstructor(NodeMovedEvent).call(this, node);
          this.previousParent = previousParent;
          this.previousPosition = previousPosition;
        }
        return ($traceurRuntime.createClass)(NodeMovedEvent, {}, {}, $__super);
      }(NodeDestructiveEvent);
      $__export("NodeMovedEvent", NodeMovedEvent);
      NodeRemovedEvent = function($__super) {
        function NodeRemovedEvent(node, lastIndex) {
          $traceurRuntime.superConstructor(NodeRemovedEvent).call(this, node);
          this.lastIndex = lastIndex;
        }
        return ($traceurRuntime.createClass)(NodeRemovedEvent, {}, {}, $__super);
      }(NodeDestructiveEvent);
      $__export("NodeRemovedEvent", NodeRemovedEvent);
      NodeCreatedEvent = function($__super) {
        function NodeCreatedEvent(node) {
          $traceurRuntime.superConstructor(NodeCreatedEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeCreatedEvent, {}, {}, $__super);
      }(NodeDestructiveEvent);
      $__export("NodeCreatedEvent", NodeCreatedEvent);
      NodeRenamedEvent = function($__super) {
        function NodeRenamedEvent(node, oldValue, newValue) {
          $traceurRuntime.superConstructor(NodeRenamedEvent).call(this, node);
          this.oldValue = oldValue;
          this.newValue = newValue;
        }
        return ($traceurRuntime.createClass)(NodeRenamedEvent, {}, {}, $__super);
      }(NodeDestructiveEvent);
      $__export("NodeRenamedEvent", NodeRenamedEvent);
      NodeExpandedEvent = function($__super) {
        function NodeExpandedEvent(node) {
          $traceurRuntime.superConstructor(NodeExpandedEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeExpandedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeExpandedEvent", NodeExpandedEvent);
      NodeCollapsedEvent = function($__super) {
        function NodeCollapsedEvent(node) {
          $traceurRuntime.superConstructor(NodeCollapsedEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeCollapsedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeCollapsedEvent", NodeCollapsedEvent);
      MenuItemSelectedEvent = function($__super) {
        function MenuItemSelectedEvent(node, selectedItem) {
          $traceurRuntime.superConstructor(MenuItemSelectedEvent).call(this, node);
          this.selectedItem = selectedItem;
        }
        return ($traceurRuntime.createClass)(MenuItemSelectedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("MenuItemSelectedEvent", MenuItemSelectedEvent);
      LoadNextLevelEvent = function($__super) {
        function LoadNextLevelEvent(node) {
          $traceurRuntime.superConstructor(LoadNextLevelEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(LoadNextLevelEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("LoadNextLevelEvent", LoadNextLevelEvent);
      NodeCheckedEvent = function($__super) {
        function NodeCheckedEvent(node) {
          $traceurRuntime.superConstructor(NodeCheckedEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeCheckedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeCheckedEvent", NodeCheckedEvent);
      NodeUncheckedEvent = function($__super) {
        function NodeUncheckedEvent(node) {
          $traceurRuntime.superConstructor(NodeUncheckedEvent).call(this, node);
        }
        return ($traceurRuntime.createClass)(NodeUncheckedEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeUncheckedEvent", NodeUncheckedEvent);
      NodeIndeterminateEvent = function($__super) {
        function NodeIndeterminateEvent(node, indeterminate) {
          $traceurRuntime.superConstructor(NodeIndeterminateEvent).call(this, node);
          this.indeterminate = indeterminate;
        }
        return ($traceurRuntime.createClass)(NodeIndeterminateEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeIndeterminateEvent", NodeIndeterminateEvent);
      NodeRenameKeydownEvent = function($__super) {
        function NodeRenameKeydownEvent(node, domEvent) {
          $traceurRuntime.superConstructor(NodeRenameKeydownEvent).call(this, node);
          this.domEvent = domEvent;
        }
        return ($traceurRuntime.createClass)(NodeRenameKeydownEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeRenameKeydownEvent", NodeRenameKeydownEvent);
      NodeRenameInputChangeEvent = function($__super) {
        function NodeRenameInputChangeEvent(node, domEvent) {
          $traceurRuntime.superConstructor(NodeRenameInputChangeEvent).call(this, node);
          this.domEvent = domEvent;
        }
        return ($traceurRuntime.createClass)(NodeRenameInputChangeEvent, {}, {}, $__super);
      }(NodeEvent);
      $__export("NodeRenameInputChangeEvent", NodeRenameInputChangeEvent);
    }
  };
});

$__System.register("18", [], function($__export) {
  "use strict";
  var DropPosition,
      NodeDraggableEvent,
      NodeDragStartEvent;
  return {
    setters: [],
    execute: function() {
      $__export("DropPosition", DropPosition);
      (function(DropPosition) {
        DropPosition[DropPosition["Above"] = 0] = "Above";
        DropPosition[DropPosition["Into"] = 1] = "Into";
        DropPosition[DropPosition["Below"] = 2] = "Below";
      })(DropPosition || ($__export("DropPosition", DropPosition = {})));
      NodeDraggableEvent = function() {
        function NodeDraggableEvent(captured, target, position) {
          this.captured = captured;
          this.target = target;
          this.position = position;
        }
        return ($traceurRuntime.createClass)(NodeDraggableEvent, {}, {});
      }();
      $__export("NodeDraggableEvent", NodeDraggableEvent);
      NodeDragStartEvent = function() {
        function NodeDragStartEvent(captured, target) {
          this.captured = captured;
          this.target = target;
        }
        return ($traceurRuntime.createClass)(NodeDragStartEvent, {}, {});
      }();
      $__export("NodeDragStartEvent", NodeDragStartEvent);
    }
  };
});

$__System.register("19", ["d", "1b", "18"], function($__export) {
  "use strict";
  var Injectable,
      Subject,
      NodeDraggableEvent,
      NodeDragStartEvent,
      i0,
      NodeDraggableService;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
      i0 = $__m;
    }, function($__m) {
      Subject = $__m.Subject;
    }, function($__m) {
      NodeDraggableEvent = $__m.NodeDraggableEvent;
      NodeDragStartEvent = $__m.NodeDragStartEvent;
    }],
    execute: function() {
      NodeDraggableService = function() {
        function NodeDraggableService() {
          this.draggableNodeEvents$ = new Subject();
          this.nodeDragStartEvents$ = new Subject();
          this.checkedNodes = [];
        }
        return ($traceurRuntime.createClass)(NodeDraggableService, {
          fireNodeDragged: function(captured, target, position) {
            if (captured.length === 0 || captured.every(function(cn) {
              return !cn.tree || cn.tree.isStatic();
            })) {
              return;
            }
            this.draggableNodeEvents$.next(new NodeDraggableEvent(captured, target, position));
          },
          fireNodeDragStart: function(captured, target) {
            if (captured.length === 0 || captured.every(function(cn) {
              return !cn.tree || cn.tree.isStatic();
            })) {
              return;
            }
            this.nodeDragStartEvents$.next(new NodeDragStartEvent(captured, target));
          },
          addCheckedNode: function(node) {
            this.checkedNodes.push(node);
          },
          setDraggedNode: function(node) {
            this.draggedNode = node;
          },
          removeCheckedNode: function(node) {
            var i = this.checkedNodes.indexOf(node);
            if (i > -1) {
              this.checkedNodes.splice(i, 1);
            }
          },
          removeCheckedNodeById: function(id) {
            var i = this.checkedNodes.findIndex(function(cn) {
              return cn.tree.id === id;
            });
            if (i > -1) {
              this.checkedNodes.splice(i, 1);
            }
          },
          getCheckedNodes: function() {
            return this.checkedNodes;
          },
          getDraggedNode: function() {
            return this.draggedNode;
          },
          releaseCheckedNodes: function() {
            this.checkedNodes = [];
          },
          releaseDraggedNode: function() {
            this.draggedNode = null;
          }
        }, {});
      }();
      $__export("NodeDraggableService", NodeDraggableService);
      NodeDraggableService.ɵfac = function NodeDraggableService_Factory(t) {
        return new (t || NodeDraggableService)();
      };
      NodeDraggableService.ɵprov = i0.ɵɵdefineInjectable({
        token: NodeDraggableService,
        factory: NodeDraggableService.ɵfac
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeDraggableService, [{type: Injectable}], null, null);
      })();
    }
  };
});

$__System.register("15", [], function($__export) {
  "use strict";
  function isEmpty(value) {
    if (typeof value === 'string') {
      return !/\S/.test(value);
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return isNil(value);
  }
  function trim(value) {
    return isNil(value) ? '' : value.trim();
  }
  function has(value, prop) {
    return value && (typeof value === 'undefined' ? 'undefined' : $traceurRuntime.typeof(value)) === 'object' && value.hasOwnProperty(prop);
  }
  function isFunction(value) {
    return typeof value === 'function';
  }
  function get(value, path, defaultValue) {
    var result = value;
    var $__5 = true;
    var $__6 = false;
    var $__7 = undefined;
    try {
      for (var $__3 = void 0,
          $__2 = (path.split('.'))[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
        var prop = $__3.value;
        {
          if (!result || !Reflect.has(result, prop)) {
            return defaultValue;
          }
          result = result[prop];
        }
      }
    } catch ($__8) {
      $__6 = true;
      $__7 = $__8;
    } finally {
      try {
        if (!$__5 && $__2.return != null) {
          $__2.return();
        }
      } finally {
        if ($__6) {
          throw $__7;
        }
      }
    }
    return isNil(result) || result === value ? defaultValue : result;
  }
  function omit(value, propsToSkip) {
    if (!value) {
      return value;
    }
    var normalizedPropsToSkip = typeof propsToSkip === 'string' ? [propsToSkip] : propsToSkip;
    return Object.keys(value).reduce(function(result, prop) {
      var $__1;
      if (includes(normalizedPropsToSkip, prop)) {
        return result;
      }
      return Object.assign(result, ($__1 = {}, Object.defineProperty($__1, prop, {
        value: value[prop],
        configurable: true,
        enumerable: true,
        writable: true
      }), $__1));
    }, {});
  }
  function size(value) {
    return isEmpty(value) ? 0 : value.length;
  }
  function once(fn) {
    var result;
    return function() {
      for (var args = [],
          $__9 = 0; $__9 < arguments.length; $__9++)
        args[$__9] = arguments[$__9];
      if (fn) {
        result = fn.apply(null, args);
        fn = null;
      }
      return result;
    };
  }
  function defaultsDeep(target) {
    for (var sources = [],
        $__9 = 1; $__9 < arguments.length; $__9++)
      sources[$__9 - 1] = arguments[$__9];
    return [target].concat(sources).reduce(function(result, source) {
      if (!source) {
        return result;
      }
      Object.keys(source).forEach(function(prop) {
        if (isNil(result[prop])) {
          result[prop] = source[prop];
          return;
        }
        if ($traceurRuntime.typeof(result[prop]) === 'object' && !Array.isArray(result[prop])) {
          result[prop] = defaultsDeep(result[prop], source[prop]);
          return;
        }
      });
      return result;
    }, {});
  }
  function includes(target, value) {
    if (isNil(target)) {
      return false;
    }
    var index = typeof target === 'string' ? target.indexOf(value) : target.indexOf(value);
    return index > -1;
  }
  function isNil(value) {
    return value === undefined || value === null;
  }
  $__export("isEmpty", isEmpty);
  $__export("trim", trim);
  $__export("has", has);
  $__export("isFunction", isFunction);
  $__export("get", get);
  $__export("omit", omit);
  $__export("size", size);
  $__export("once", once);
  $__export("defaultsDeep", defaultsDeep);
  $__export("includes", includes);
  $__export("isNil", isNil);
  return {
    setters: [],
    execute: function() {}
  };
});

$__System.register("e", ["23", "d", "19", "15", "1b", "1c"], function($__export) {
  "use strict";
  var LoadNextLevelEvent,
      MenuItemSelectedEvent,
      NodeCheckedEvent,
      NodeCollapsedEvent,
      NodeCreatedEvent,
      NodeDoubleClickedEvent,
      NodeExpandedEvent,
      NodeIndeterminateEvent,
      NodeMovedEvent,
      NodeRemovedEvent,
      NodeRenamedEvent,
      NodeSelectedEvent,
      NodeUncheckedEvent,
      NodeUnselectedEvent,
      NodeRenameKeydownEvent,
      NodeRenameInputChangeEvent,
      Inject,
      Injectable,
      NodeDraggableService,
      isEmpty,
      Subject,
      filter,
      i0,
      i1,
      TreeService;
  return {
    setters: [function($__m) {
      LoadNextLevelEvent = $__m.LoadNextLevelEvent;
      MenuItemSelectedEvent = $__m.MenuItemSelectedEvent;
      NodeCheckedEvent = $__m.NodeCheckedEvent;
      NodeCollapsedEvent = $__m.NodeCollapsedEvent;
      NodeCreatedEvent = $__m.NodeCreatedEvent;
      NodeDoubleClickedEvent = $__m.NodeDoubleClickedEvent;
      NodeExpandedEvent = $__m.NodeExpandedEvent;
      NodeIndeterminateEvent = $__m.NodeIndeterminateEvent;
      NodeMovedEvent = $__m.NodeMovedEvent;
      NodeRemovedEvent = $__m.NodeRemovedEvent;
      NodeRenamedEvent = $__m.NodeRenamedEvent;
      NodeSelectedEvent = $__m.NodeSelectedEvent;
      NodeUncheckedEvent = $__m.NodeUncheckedEvent;
      NodeUnselectedEvent = $__m.NodeUnselectedEvent;
      NodeRenameKeydownEvent = $__m.NodeRenameKeydownEvent;
      NodeRenameInputChangeEvent = $__m.NodeRenameInputChangeEvent;
    }, function($__m) {
      Inject = $__m.Inject;
      Injectable = $__m.Injectable;
      i0 = $__m;
    }, function($__m) {
      NodeDraggableService = $__m.NodeDraggableService;
      i1 = $__m;
    }, function($__m) {
      isEmpty = $__m.isEmpty;
    }, function($__m) {
      Subject = $__m.Subject;
    }, function($__m) {
      filter = $__m.filter;
    }],
    execute: function() {
      TreeService = function() {
        function TreeService(nodeDraggableService) {
          var $__4 = this;
          this.nodeDraggableService = nodeDraggableService;
          this.nodeMoved$ = new Subject();
          this.nodeMoveStarted$ = new Subject();
          this.nodeRemoved$ = new Subject();
          this.nodeRenamed$ = new Subject();
          this.nodeCreated$ = new Subject();
          this.nodeDoubleClicked$ = new Subject();
          this.nodeSelected$ = new Subject();
          this.nodeUnselected$ = new Subject();
          this.nodeExpanded$ = new Subject();
          this.nodeCollapsed$ = new Subject();
          this.menuItemSelected$ = new Subject();
          this.loadNextLevel$ = new Subject();
          this.nodeChecked$ = new Subject();
          this.nodeUnchecked$ = new Subject();
          this.nodeIndeterminate$ = new Subject();
          this.nodeRenameKeydown$ = new Subject();
          this.nodeRenameInputChange$ = new Subject();
          this.controllers = new Map();
          this.nodeRemoved$.subscribe(function(e) {
            return e.node.removeItselfFromParent();
          });
          this.nodeDraggableService.nodeDragStartEvents$.subscribe(function(e) {
            $__4.nodeMoveStarted$.next(e);
          });
        }
        return ($traceurRuntime.createClass)(TreeService, {
          unselectStream: function(tree) {
            return this.nodeSelected$.pipe(filter(function(e) {
              return tree !== e.node;
            }));
          },
          fireNodeRenameKeydownEvent: function(tree, e) {
            this.nodeRenameKeydown$.next(new NodeRenameKeydownEvent(tree, e));
          },
          fireNodeRenameInputChanged: function(tree, e) {
            this.nodeRenameInputChange$.next(new NodeRenameInputChangeEvent(tree, e));
          },
          fireNodeRemoved: function(tree) {
            this.nodeRemoved$.next(new NodeRemovedEvent(tree, tree.positionInParent));
          },
          fireNodeCreated: function(tree) {
            this.nodeCreated$.next(new NodeCreatedEvent(tree));
          },
          fireNodeDoubleClicked: function(tree, e) {
            this.nodeDoubleClicked$.next(new NodeDoubleClickedEvent(tree, e));
          },
          fireNodeSelected: function(tree) {
            this.nodeSelected$.next(new NodeSelectedEvent(tree));
          },
          fireNodeUnselected: function(tree) {
            this.nodeUnselected$.next(new NodeUnselectedEvent(tree));
          },
          fireNodeRenamed: function(oldValue, tree) {
            this.nodeRenamed$.next(new NodeRenamedEvent(tree, oldValue, tree.value));
          },
          fireNodeMoved: function(tree, parent, previousPosition) {
            this.nodeMoved$.next(new NodeMovedEvent(tree, parent, previousPosition));
          },
          fireMenuItemSelected: function(tree, selectedItem) {
            this.menuItemSelected$.next(new MenuItemSelectedEvent(tree, selectedItem));
          },
          fireNodeSwitchFoldingType: function(tree) {
            if (tree.isNodeExpanded()) {
              this.fireNodeExpanded(tree);
              if (this.shouldFireLoadNextLevel(tree)) {
                this.fireLoadNextLevel(tree);
              }
            } else if (tree.isNodeCollapsed()) {
              this.fireNodeCollapsed(tree);
            }
          },
          fireNodeExpanded: function(tree) {
            this.nodeExpanded$.next(new NodeExpandedEvent(tree));
          },
          fireNodeCollapsed: function(tree) {
            this.nodeCollapsed$.next(new NodeCollapsedEvent(tree));
          },
          fireLoadNextLevel: function(tree) {
            this.loadNextLevel$.next(new LoadNextLevelEvent(tree));
          },
          fireNodeChecked: function(tree) {
            this.nodeChecked$.next(new NodeCheckedEvent(tree));
          },
          fireNodeUnchecked: function(tree) {
            this.nodeUnchecked$.next(new NodeUncheckedEvent(tree));
          },
          fireNodeIndeterminate: function(tree, indeterminate) {
            this.nodeIndeterminate$.next(new NodeIndeterminateEvent(tree, indeterminate));
          },
          draggedStream: function(tree, element) {
            return this.nodeDraggableService.draggableNodeEvents$.pipe(filter(function(e) {
              return e.target === element;
            }), filter(function(e) {
              return !e.captured.some(function(cn) {
                return cn.tree.hasChild(tree);
              });
            }));
          },
          setController: function(id, controller) {
            this.controllers.set(id, controller);
          },
          deleteController: function(id) {
            if (this.controllers.has(id)) {
              this.controllers.delete(id);
            }
          },
          getController: function(id) {
            if (this.controllers.has(id)) {
              return this.controllers.get(id);
            }
            return null;
          },
          hasController: function(id) {
            return this.controllers.has(id);
          },
          shouldFireLoadNextLevel: function(tree) {
            var shouldLoadNextLevel = tree.node.emitLoadNextLevel && !tree.node.loadChildren && !tree.childrenAreBeingLoaded() && isEmpty(tree.children);
            if (shouldLoadNextLevel) {
              tree.loadingChildrenRequested();
            }
            return shouldLoadNextLevel;
          }
        }, {});
      }();
      $__export("TreeService", TreeService);
      TreeService.ɵfac = function TreeService_Factory(t) {
        return new (t || TreeService)(i0.ɵɵinject(NodeDraggableService));
      };
      TreeService.ɵprov = i0.ɵɵdefineInjectable({
        token: TreeService,
        factory: TreeService.ɵfac
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeService, [{type: Injectable}], function() {
          return [{
            type: i1.NodeDraggableService,
            decorators: [{
              type: Inject,
              args: [NodeDraggableService]
            }]
          }];
        }, null);
      })();
    }
  };
});

$__System.register("21", ["d", "24"], function($__export) {
  "use strict";
  var Pipe,
      DomSanitizer,
      i0,
      i1,
      SafeHtmlPipe;
  return {
    setters: [function($__m) {
      Pipe = $__m.Pipe;
      i0 = $__m;
    }, function($__m) {
      DomSanitizer = $__m.DomSanitizer;
      i1 = $__m;
    }],
    execute: function() {
      SafeHtmlPipe = function() {
        function SafeHtmlPipe(sanitizer) {
          this.sanitizer = sanitizer;
        }
        return ($traceurRuntime.createClass)(SafeHtmlPipe, {transform: function(value) {
            return this.sanitizer.bypassSecurityTrustHtml(value);
          }}, {});
      }();
      $__export("SafeHtmlPipe", SafeHtmlPipe);
      SafeHtmlPipe.ɵfac = function SafeHtmlPipe_Factory(t) {
        return new (t || SafeHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer, 16));
      };
      SafeHtmlPipe.ɵpipe = i0.ɵɵdefinePipe({
        name: "safeHtml",
        type: SafeHtmlPipe,
        pure: true
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SafeHtmlPipe, [{
          type: Pipe,
          args: [{name: 'safeHtml'}]
        }], function() {
          return [{type: i1.DomSanitizer}];
        }, null);
      })();
    }
  };
});

$__System.register("25", ["b", "d", "c", "11", "1d", "1e", "19", "1f", "20", "16", "e", "21"], function($__export) {
  "use strict";
  var NgModule,
      TreeComponent,
      TreeInternalComponent,
      CommonModule,
      NodeDraggableDirective,
      NodeDraggableService,
      NodeEditableDirective,
      NodeMenuComponent,
      NodeMenuService,
      TreeService,
      SafeHtmlPipe,
      i0,
      TreeModule;
  return {
    setters: [function($__m) {}, function($__m) {
      NgModule = $__m.NgModule;
      i0 = $__m;
    }, function($__m) {
      TreeComponent = $__m.TreeComponent;
    }, function($__m) {
      TreeInternalComponent = $__m.TreeInternalComponent;
    }, function($__m) {
      CommonModule = $__m.CommonModule;
    }, function($__m) {
      NodeDraggableDirective = $__m.NodeDraggableDirective;
    }, function($__m) {
      NodeDraggableService = $__m.NodeDraggableService;
    }, function($__m) {
      NodeEditableDirective = $__m.NodeEditableDirective;
    }, function($__m) {
      NodeMenuComponent = $__m.NodeMenuComponent;
    }, function($__m) {
      NodeMenuService = $__m.NodeMenuService;
    }, function($__m) {
      TreeService = $__m.TreeService;
    }, function($__m) {
      SafeHtmlPipe = $__m.SafeHtmlPipe;
    }],
    execute: function() {
      TreeModule = function() {
        function TreeModule() {}
        return ($traceurRuntime.createClass)(TreeModule, {}, {});
      }();
      $__export("TreeModule", TreeModule);
      TreeModule.ɵfac = function TreeModule_Factory(t) {
        return new (t || TreeModule)();
      };
      TreeModule.ɵmod = i0.ɵɵdefineNgModule({type: TreeModule});
      TreeModule.ɵinj = i0.ɵɵdefineInjector({
        providers: [NodeDraggableService, NodeMenuService, TreeService],
        imports: [[CommonModule]]
      });
      (function() {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TreeModule, [{
          type: NgModule,
          args: [{
            imports: [CommonModule],
            declarations: [NodeDraggableDirective, TreeComponent, NodeEditableDirective, NodeMenuComponent, TreeInternalComponent, SafeHtmlPipe],
            exports: [TreeComponent],
            providers: [NodeDraggableService, NodeMenuService, TreeService]
          }]
        }], null, null);
      })();
      (function() {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TreeModule, {
          declarations: [NodeDraggableDirective, TreeComponent, NodeEditableDirective, NodeMenuComponent, TreeInternalComponent, SafeHtmlPipe],
          imports: [CommonModule],
          exports: [TreeComponent]
        });
      })();
    }
  };
});

$__System.register("a", ["f", "10", "13", "23", "18", "c", "12", "25"], function($__export) {
  "use strict";
  var TreeModelSettings,
      Ng2TreeSettings,
      FoldingType,
      Tree,
      NodeMenuItemAction,
      NodeEvent,
      NodeCreatedEvent,
      NodeDoubleClickedEvent,
      NodeRemovedEvent,
      NodeRenamedEvent,
      NodeMovedEvent,
      NodeSelectedEvent,
      NodeExpandedEvent,
      NodeCollapsedEvent,
      MenuItemSelectedEvent,
      NodeDestructiveEvent,
      NodeUncheckedEvent,
      NodeCheckedEvent,
      NodeIndeterminateEvent,
      NodeUnselectedEvent,
      NodeRenameKeydownEvent,
      NodeRenameInputChangeEvent,
      NodeDragStartEvent,
      NodeDraggableEvent,
      TreeComponent,
      TreeController,
      TreeModule;
  return {
    setters: [function($__m) {
      TreeModelSettings = $__m.TreeModelSettings;
      Ng2TreeSettings = $__m.Ng2TreeSettings;
      FoldingType = $__m.FoldingType;
    }, function($__m) {
      Tree = $__m.Tree;
    }, function($__m) {
      NodeMenuItemAction = $__m.NodeMenuItemAction;
    }, function($__m) {
      NodeEvent = $__m.NodeEvent;
      NodeCreatedEvent = $__m.NodeCreatedEvent;
      NodeDoubleClickedEvent = $__m.NodeDoubleClickedEvent;
      NodeRemovedEvent = $__m.NodeRemovedEvent;
      NodeRenamedEvent = $__m.NodeRenamedEvent;
      NodeMovedEvent = $__m.NodeMovedEvent;
      NodeSelectedEvent = $__m.NodeSelectedEvent;
      NodeExpandedEvent = $__m.NodeExpandedEvent;
      NodeCollapsedEvent = $__m.NodeCollapsedEvent;
      MenuItemSelectedEvent = $__m.MenuItemSelectedEvent;
      NodeDestructiveEvent = $__m.NodeDestructiveEvent;
      NodeUncheckedEvent = $__m.NodeUncheckedEvent;
      NodeCheckedEvent = $__m.NodeCheckedEvent;
      NodeIndeterminateEvent = $__m.NodeIndeterminateEvent;
      NodeUnselectedEvent = $__m.NodeUnselectedEvent;
      NodeRenameKeydownEvent = $__m.NodeRenameKeydownEvent;
      NodeRenameInputChangeEvent = $__m.NodeRenameInputChangeEvent;
    }, function($__m) {
      NodeDragStartEvent = $__m.NodeDragStartEvent;
      NodeDraggableEvent = $__m.NodeDraggableEvent;
    }, function($__m) {
      TreeComponent = $__m.TreeComponent;
    }, function($__m) {
      TreeController = $__m.TreeController;
    }, function($__m) {
      TreeModule = $__m.TreeModule;
    }],
    execute: function() {
      $__export("Tree", Tree), $__export("TreeModelSettings", TreeModelSettings), $__export("Ng2TreeSettings", Ng2TreeSettings), $__export("FoldingType", FoldingType), $__export("NodeEvent", NodeEvent), $__export("NodeCreatedEvent", NodeCreatedEvent), $__export("NodeDoubleClickedEvent", NodeDoubleClickedEvent), $__export("NodeRemovedEvent", NodeRemovedEvent), $__export("NodeRenamedEvent", NodeRenamedEvent), $__export("NodeMovedEvent", NodeMovedEvent), $__export("NodeSelectedEvent", NodeSelectedEvent), $__export("NodeExpandedEvent", NodeExpandedEvent), $__export("NodeCollapsedEvent", NodeCollapsedEvent), $__export("NodeDestructiveEvent", NodeDestructiveEvent), $__export("NodeUncheckedEvent", NodeUncheckedEvent), $__export("NodeCheckedEvent", NodeCheckedEvent), $__export("NodeIndeterminateEvent", NodeIndeterminateEvent), $__export("NodeRenameKeydownEvent", NodeRenameKeydownEvent), $__export("NodeRenameInputChangeEvent", NodeRenameInputChangeEvent), $__export("NodeUnselectedEvent", NodeUnselectedEvent), $__export("NodeDragStartEvent", NodeDragStartEvent), $__export("NodeDraggableEvent", NodeDraggableEvent), $__export("TreeComponent", TreeComponent), $__export("TreeModule", TreeModule), $__export("NodeMenuItemAction", NodeMenuItemAction), $__export("MenuItemSelectedEvent", MenuItemSelectedEvent), $__export("TreeController", TreeController);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/common","@angular/core","@angular/platform-browser","rxjs","rxjs/operators"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs"), require("rxjs/operators"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ng2-tree.umd.js.map