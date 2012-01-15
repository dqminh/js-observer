class Client
  constructor: ()->
    @log = []

  logEvent: (handle, event) =>
    console.log 'trigger', event, handle
    @log.push [handle, event, Date.now()]

  registerLog: (object, event) ->
    object = object[0] if not _.isElement(object)
    object.addEventListener event, (event) =>
      this.logEvent object, event

  pushToServer: ->
    throw 'Not implemented'

  @wrapEvent: (client, fn) ->
    ->
      client.registerLog(this, arguments[0])
      fn.apply(this, arguments)

  supportedEvents: ->
    [
      'DOMActivate', 'DOMAttrModified', 'DOMAttributeNameChanged',
      'DOMCharacterDataModified', 'DOMContentLoaded', 'DOMElementNameChanged',
      'DOMFocusIn', 'DOMFocusOut', 'DOMNodeInserted', 'DOMNodeInsertedIntoDocument',
      'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMSubtreeModified', 'abort',
      'afterprint', 'beforeprint', 'beforeunload', 'blur', 'canplay', 'canplaythrough',
      'click', 'compositionend', 'compositionstart', 'compositionupdate', 'contextmenu',
      'cuechange', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover',
      'dragstart', 'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'focusin',
      'focusout', 'hashchange', 'input', 'invalid', 'keydown', 'keypress', 'keyup', 'load',
      'loadeddata', 'loadedmetadata', 'loadstart', 'message', 'mousedown', 'mouseenter',
      'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel',
      'mozfullscreenchange', 'offline', 'online', 'pagehide', 'pageshow', 'pause',
      'play', 'playing', 'popstate', 'progress', 'ratechange', 'readystatechange',
      'reset', 'resize', 'scroll', 'seeked', 'seeking', 'select', 'show', 'stalled',
      'storage', 'submit', 'suspend', 'textinput', 'timeupdate', 'unload',
      'volumechange', 'waiting'
    ]


$(document).ready ->
  doc = $(document)
  client = new Client()
  #client.registerLog(doc, event) for event in client.supportedEvents()
  $.fn.bind = Client.wrapEvent client, $.fn.bind
  window.client = client
  doc.bind 'click', ->
    console.log 'click'
  doc.bind 'keydown', ->
    console.log 'keydown'
  $('h1').bind 'mouseover', ->
    console.log 'mouseover'
  #doc.trigger 'click'
