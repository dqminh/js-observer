(function() {
  var Client,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Client = (function() {

    function Client() {
      this.logEvent = __bind(this.logEvent, this);      this.log = [];
    }

    Client.prototype.logEvent = function(handle, event) {
      var message;
      message = {
        handle: handle.body.toString(),
        vent: {
          srcElement: event.srcElement.toString(),
          type: event.type,
          timestamp: event.timeStamp
        }
      };
      console.log(message);
      this.log.push(JSON.stringify(message));
      if (this.log.length === 10) {
        console.log("sending event");
        $.ajax({
          url: '/log_event',
          method: 'GET',
          data: {
            log: JSON.stringify(this.log)
          }
        });
        return this.log = [];
      }
    };

    Client.prototype.registerLog = function(object, event) {
      var _this = this;
      if (!_.isElement(object)) object = object[0];
      return object.addEventListener(event, function(event) {
        return _this.logEvent(object, event);
      });
    };

    Client.prototype.pushToServer = function() {
      throw 'Not implemented';
    };

    Client.wrapEvent = function(client, fn) {
      return function() {
        client.registerLog(this, arguments[0]);
        return fn.apply(this, arguments);
      };
    };

    Client.prototype.supportedEvents = function() {
      return ['DOMActivate', 'DOMAttrModified', 'DOMAttributeNameChanged', 'DOMCharacterDataModified', 'DOMContentLoaded', 'DOMElementNameChanged', 'DOMFocusIn', 'DOMFocusOut', 'DOMNodeInserted', 'DOMNodeInsertedIntoDocument', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMSubtreeModified', 'abort', 'afterprint', 'beforeprint', 'beforeunload', 'blur', 'canplay', 'canplaythrough', 'click', 'compositionend', 'compositionstart', 'compositionupdate', 'contextmenu', 'cuechange', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'focusin', 'focusout', 'hashchange', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata', 'loadstart', 'message', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'mozfullscreenchange', 'offline', 'online', 'pagehide', 'pageshow', 'pause', 'play', 'playing', 'popstate', 'progress', 'ratechange', 'readystatechange', 'reset', 'resize', 'scroll', 'seeked', 'seeking', 'select', 'show', 'stalled', 'storage', 'submit', 'suspend', 'textinput', 'timeupdate', 'unload', 'volumechange', 'waiting'];
    };

    return Client;

  })();

  $(document).ready(function() {
    var client, doc;
    doc = $(document);
    client = new Client();
    $.fn.bind = Client.wrapEvent(client, $.fn.bind);
    window.client = client;
    doc.bind('click', function() {
      return console.log('click');
    });
    doc.bind('keydown', function() {
      return console.log('keydown');
    });
    return $('h1').bind('mouseover', function() {
      return console.log('mouseover');
    });
  });

}).call(this);
