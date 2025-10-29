console.log("news.js loaded");

// no-op за да не крашира Blazor ако се повика пред да се вчита скриптата
window.tvCalendar = window.tvCalendar || { load: () => console.warn("tvCalendar placeholder") };

window.tvCalendar.load = (opts) => {
    try {
        const host = document.getElementById("tv-cal");
        if (!host) return;
        host.innerHTML = "";

        const container = document.createElement("div");
        container.className = "tradingview-widget-container";

        const widgetDiv = document.createElement("div");
        widgetDiv.className = "tradingview-widget-container__widget";
        container.appendChild(widgetDiv);

        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        s.async = true;

        s.innerHTML = JSON.stringify({
            width: "100%",
            height: opts?.height ?? 700,
            locale: opts?.locale ?? "en",
            colorTheme: (opts?.theme ?? "dark") === "dark" ? "dark" : "light",
            isTransparent: false,
            currencyFilter: opts?.currencyFilter ?? "USD,EUR,GBP,JPY,CHF,AUD,CAD,NZD",
            importanceFilter: "-1,0,1",
            dateRange: opts?.dateRange ?? "today" // today | tomorrow | thisWeek
        });

        container.appendChild(s);
        host.appendChild(container);
    } catch (e) {
        console.error("tvCalendar.load error", e);
    }
};
var cfg = {
    width: "100%",
    height: (opts.height != null ? opts.height : 700),
    locale: (opts.locale || "en"),
    colorTheme: theme,
    isTransparent: false,
    currencyFilter: (opts.currencyFilter || "USD,EUR,GBP,JPY,CHF,AUD,CAD,NZD"),
    importanceFilter: (opts.importanceFilter || "-1,0,1"), // ⬅️ ДОДАДЕНО
    dateRange: (opts.dateRange || "today")
};
