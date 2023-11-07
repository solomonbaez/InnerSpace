
self.onmessage = function (e) {
  if (e.data === 'start') {
    setInterval(function () {
      postMessage({ scrollY: window.scrollY });
    }, 100); 
  }
};
