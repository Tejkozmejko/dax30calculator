(function () {
  console.log("news.js loaded");
  if (!window.tvCalendar) window.tvCalendar = {};

  window.tvCalendar.load = function (opts) {
    try {
      opts = opts || {};
      var host = document.getElementById("tv-cal");
      if (!host) return;
      host.innerHTML = "";

      var shell = document.createElement("div");
      shell.className = "cal-shell";              // темен „рам“ околу widget-от

      var container = document.createElement("div");
      container.className = "tradingview-widget-container";

      var inner = document.createElement("div");
      inner.className = "tradingview-widget-container__widget";
      container.appendChild(inner);

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      s.async = true;

      var cfg = {
        width: "100%",
        height: (opts.height != null ? opts.height : 700),
        locale: (opts.locale || "en"),
        colorTheme: "dark",           // темно
        isTransparent: true,          // iframe ќе биде проѕирен → ќе се гледа нашата темна подлога
        currencyFilter: (opts.currencyFilter || "USD,EUR,GBP,JPY,CHF,AUD,CAD,NZD"),
        importanceFilter: (opts.importanceFilter || "-1,0,1"),
        dateRange: (opts.dateRange || "today")
      };
      s.innerHTML = JSON.stringify(cfg);

      container.appendChild(s);
      shell.appendChild(container);
      host.appendChild(shell);
    } catch (e) {
      console.error("tvCalendar.load error", e);
    }
  };
})();
