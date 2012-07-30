// Generated by CoffeeScript 1.3.3
(function() {

  (function($) {
    $.touchy = function(el, options) {
      var calculateAngle, determineSwipeDirection, touchCancel,
        _this = this;
      this.el = el;
      this.$el = $(el);
      this.$el.data("touchy", this);
      this.init = function() {
        _this.options = $.extend({}, $.touchy.defaultOptions, options);
        _this.fingerCount = 0;
        _this.startX = 0;
        _this.startY = 0;
        _this.curX = 0;
        _this.curY = 0;
        _this.deltaX = 0;
        _this.deltaY = 0;
        _this.horzDiff = 0;
        _this.vertDiff = 0;
        _this.minLength = 72;
        _this.swipeLength = 0;
        _this.swipeAngle = null;
        _this.$el.bind('touchstart', function(event) {
          event.preventDefault();
          _this.fingerCount = event.originalEvent.touches.length;
          if (_this.fingerCount === 1) {
            _this.startX = event.originalEvent.touches[0].pageX;
            return _this.startY = event.originalEvent.touches[0].pageY;
          } else {
            return touchCancel(event);
          }
        });
        _this.$el.bind('touchmove', function(event) {
          event.preventDefault();
          if (event.originalEvent.touches.length === 1) {
            _this.curX = event.originalEvent.touches[0].pageX;
            return _this.curY = event.originalEvent.touches[0].pageY;
          } else {
            return touchCancel(event);
          }
        });
        _this.$el.bind('touchend', function(event) {
          event.preventDefault();
          if (_this.fingerCount === 1 && _this.curX !== 0) {
            _this.swipeLength = Math.round(Math.sqrt(Math.pow(_this.curX - _this.startX, 2) + Math.pow(_this.curY - _this.startY, 2)));
            if (_this.swipeLength >= _this.minLength) {
              calculateAngle();
              determineSwipeDirection();
            }
          }
          return touchCancel(event);
        });
        return _this;
      };
      touchCancel = function(event) {
        _this.fingerCount = 0;
        _this.startX = 0;
        _this.startY = 0;
        _this.curX = 0;
        _this.curY = 0;
        _this.deltaX = 0;
        _this.deltaY = 0;
        _this.horzDiff = 0;
        _this.vertDiff = 0;
        _this.swipeLength = 0;
        return _this.swipeAngle = null;
      };
      calculateAngle = function() {
        var X, Y, Z, r;
        X = _this.startX - _this.curX;
        Y = _this.curY - _this.startY;
        Z = Math.round(Math.sqrt(X * X + Y * Y));
        r = Math.atan2(Y, X);
        _this.swipeAngle = Math.round(r * 180 / Math.PI);
        if (_this.swipeAngle < 0) {
          return _this.swipeAngle = 360 - Math.abs(_this.swipeAngle);
        }
      };
      determineSwipeDirection = function() {
        var swipeDirection, _base;
        if (_this.swipeAngle <= 45 && _this.swipeAngle >= 0) {
          swipeDirection = 'left';
        } else if (_this.swipeAngle <= 360 && _this.swipeAngle >= 315) {
          swipeDirection = 'left';
        } else if (_this.swipeAngle >= 135 && _this.swipeAngle <= 225) {
          swipeDirection = 'right';
        } else if (_this.swipeAngle > 45 && _this.swipeAngle < 135) {
          swipeDirection = 'down';
        } else {
          swipeDirection = 'up';
        }
        return typeof (_base = _this.options)[swipeDirection] === "function" ? _base[swipeDirection]() : void 0;
      };
      return this.init();
    };
    $.touchy.defaultOptions = {
      'up': $.noop,
      'down': $.noop,
      'left': $.noop,
      'right': $.noop
    };
    $.fn.touchy = function(options) {
      return $.each(this, function(i, el) {
        var $el;
        $el = $(el);
        if (!$el.data('touchy')) {
          return $el.data('touchy', new $.touchy(el, options));
        }
      });
    };
    return void 0;
  })(jQuery);

}).call(this);