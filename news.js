// wwwroot/js/news.js
window.tvCalendar = {
    load: (opts) => {
        const host = document.getElementById("tv-cal");
        if (!host) return;

        // исчисти стар widget (ако се менува таб)
        host.innerHTML = "";

        // контејнер како во embed примерот
        const container = document.createElement("div");
        container.className = "tradingview-widget-container";

        const widgetDiv = document.createElement("div");
        widgetDiv.className = "tradingview-widget-container__widget";
        container.appendChild(widgetDiv);

        // TradingView бара script со src И JSON текст во истиот таг
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        s.async = true;

        // JSON конфигурација (како текст!)
        s.innerHTML = JSON.stringify({
            width: "100%",
            height: opts?.height ?? 700,
            locale: opts?.locale ?? "en",
            colorTheme: (opts?.theme ?? "dark") === "dark" ? "dark" : "light",
            isTransparent: false,
            currencyFilter:
                opts?.currencyFilter ?? "USD,EUR,GBP,JPY,CHF,AUD,CAD,NZD",
            importanceFilter: "-1,0,1",
            dateRange: opts?.dateRange ?? "today", // today | tomorrow | thisWeek
            // зоната автоматски ќе биде browser local
        });

        container.appendChild(s);
        host.appendChild(container);
    },
};
