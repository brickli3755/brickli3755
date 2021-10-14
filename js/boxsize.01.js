(function(){
  var scale = 0;
  var testNum = /^\d+(px)?$/i;
  function getNumber(str) {
    if (!str) {
      return 0;
    }
    if (testNum.test(str)) {
      return +str.replace(/[^\d]/g, '');
    }
    return 0;
  }

  function setScale() {
    var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) {
      return;
    }
    if (clientWidth > 750) {
      clientWidth = 750;
    }
    scale = clientWidth / 750;
  }
  setScale();

  function initBoxSize() {
    if (scale === 0) {
      return false;
    }
    var NodeList = document.querySelectorAll('section[data-size]');
    if (NodeList && NodeList.length > 0) {
      NodeList.forEach(function($dom){
        var size = $dom.getAttribute('data-size') || '';
        var sizeSplit = size.split('|');
        var widthNum = getNumber(sizeSplit[0]);
        var heightNum = getNumber(sizeSplit[1]);
        if (widthNum > 0 && heightNum > 0) {
          $dom.style.height = Math.floor(heightNum * scale) + 'px';
        }
      })
    }
  }

  window.addEventListener('resize', function() {
    setScale();
    initBoxSize();
  });
  setTimeout(function(){
    setScale();
    initBoxSize();
  }, 500);
  initBoxSize();
})();