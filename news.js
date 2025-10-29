// Мини helper за динамичко вметнување на TradingView економски календар
window.tvCalendar = {
    load: function (cfg) {
        const host = document.getElementById("tv-cal");
        if (!host) return;

        // исчисти претходна содржина
        host.innerHTML = `
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/markets/economy/" target="_blank" rel="noopener">
          Economic calendar by TradingView
        </a>
      </div>`;

        // отстрани претходна скрипта ако постоела
        const old = document.getElementById("tv-cal-script");
        if (old) old.remove();

        // креирај нова скрипта со embed-widget + JSON конфигурација
        const s = document.createElement("script");
        s.id = "tv-cal-script";
        s.type = "text/javascript";
        s.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";

        // автоматска временска зона од прелистувачот
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Etc/UTC";

        const payload = {
            width: cfg?.width || "100%",
            height: cfg?.height || 690,
            colorTheme: cfg?.colorTheme || "dark",
            isTransparent: cfg?.isTransparent ?? false,
            locale: cfg?.locale || "en",
            importanceFilter: cfg?.importanceFilter || "-1,0,1",
            currencyFilter: cfg?.currencyFilter || "EUR,USD,GBP,JPY,CHF,AUD,CAD,NZD",
            dateRange: cfg?.dateRange || "today",          // "today" | "tomorrow" | "this-week"
            timezone: tz                                    // авто time zone
        };

        // TradingView очекува JSON како текст во истата <script> таг
        s.text = JSON.stringify(payload);

        host.appendChild(s);
    }
};
window.tvCalendar = {
    load: (options) => {
        const container = document.getElementById("tv-cal");
        container.innerHTML = "";

        new TradingView.Calendar({
            container_id: "tv-cal",
            width: options.width,
            height: options.height,
            theme: options.theme,
            locale: options.locale,
            dateRange: options.dateRange,
            isTransparent: false,
            currencyFilter: options.currencyFilter,
            importTimezone: "browser"
        });
    }
};

