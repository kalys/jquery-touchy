Touch-events single-finger swipe-sensing jquery plugin.

Initial version is [here](http://padilicious.com/code/touchevents/index.html).

__This plugin is experimental. Use at your own risk.__

```javascript
    $(body).touchy({
      'left': function() {
        console.log('Swiped to left');
      },
      'right': function() {
        console.log('Swiped to right');
      }
    });
```
