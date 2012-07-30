(($) ->
  $.touchy = (el, options) ->

    # Access to jQuery and DOM versions of element
    @el = el
    @$el = $ el
    # Add a reverse reference to the DOM object
    @$el.data "touchy", @

    #fat arrow '=>' makes creating jq plugins much easier.
    @init = =>
      @options = $.extend {}, $.touchy.defaultOptions, options
      #
      # put your intitialization code here.
      #
      @fingerCount = 0
      @startX = 0
      @startY = 0
      @curX = 0
      @curY = 0
      @deltaX = 0
      @deltaY = 0
      @horzDiff = 0
      @vertDiff = 0
      @minLength = 72; # the shortest distance the user may swipe
      @swipeLength = 0
      @swipeAngle = null

      # events
      @$el.bind 'touchstart', (event) =>
        event.preventDefault()
        @fingerCount = event.originalEvent.touches.length

        if @fingerCount == 1
          @startX = event.originalEvent.touches[0].pageX
          @startY = event.originalEvent.touches[0].pageY
        else
          touchCancel(event)

      @$el.bind 'touchmove', (event) =>
        event.preventDefault()
        if event.originalEvent.touches.length == 1
          @curX = event.originalEvent.touches[0].pageX
          @curY = event.originalEvent.touches[0].pageY
        else
          touchCancel(event)

      @$el.bind 'touchend', (event) =>
        event.preventDefault()
        if @fingerCount == 1 and @curX != 0
          @swipeLength = Math.round( Math.sqrt( Math.pow(@curX - @startX, 2) + Math.pow(@curY - @startY, 2)))

          if @swipeLength >= @minLength
            calculateAngle()
            determineSwipeDirection()

        touchCancel(event)

      @

    touchCancel = (event) =>
      @fingerCount = 0
      @startX = 0
      @startY = 0
      @curX = 0
      @curY = 0
      @deltaX = 0
      @deltaY = 0
      @horzDiff = 0
      @vertDiff = 0
      @swipeLength = 0
      @swipeAngle = null

    calculateAngle = =>
      X = @startX - @curX
      Y = @curY - @startY
      Z = Math.round( Math.sqrt( X * X  + Y * Y ))
      r = Math.atan2( Y, X)
      @swipeAngle = Math.round(r * 180 / Math.PI)
      if @swipeAngle < 0
        @swipeAngle =  360 - Math.abs @swipeAngle

    determineSwipeDirection = =>
      if @swipeAngle <= 45 and @swipeAngle >= 0
        swipeDirection = 'left'
      else if @swipeAngle <= 360 and @swipeAngle >= 315
        swipeDirection = 'left'
      else if @swipeAngle >= 135 and @swipeAngle <= 225
        swipeDirection = 'right'
      else if @swipeAngle > 45 and @swipeAngle < 135
        swipeDirection = 'down'
      else
        swipeDirection = 'up'

      @options[swipeDirection]?()

    @init()

  # object literal containing default options
  $.touchy.defaultOptions = 
    'up': $.noop
    'down': $.noop
    'left': $.noop
    'right': $.noop

  $.fn.touchy = (options) ->
    $.each @, (i, el) ->
      $el = ($ el)

      # Only instantiate if not previously done.
      unless $el.data 'touchy'
        # call plugin on el with options, and set it to the data.
        # the instance can always be retrieved as element.data 'touchy'
        # You can do things like:
        # (element.data 'touchy').publicMethod1();
        $el.data 'touchy', new $.touchy el, options
  undefined
)(jQuery)
