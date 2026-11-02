if (0) { // Disable report. It's somehow broken.
  var _paq = _paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://epica.cs.uni-saarland.de/";
    _paq.push(['setTrackerUrl', u+'js/']);
    _paq.push(['setSiteId', '19']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'js/'; s.parentNode.insertBefore(g,s);
  })();
}