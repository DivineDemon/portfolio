import Script from "next/script";

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const posthogSnippet = POSTHOG_TOKEN
  ? `
!(function (t, e) {
  var o = "posthog";
  t[o] = t[o] || [];
  var g = ["init","capture","identify","alias","people.set","people.set_once","set_config","register","register_once","unregister","opt_out_capturing","has_opted_out_capturing","opt_in_capturing","reset","isFeatureEnabled","onFeatureFlags","getFeatureFlag","getFeatureFlagPayload","reloadFeatureFlags","group","updateEarlyAccessFeatureEnrollment","getEarlyAccessFeatures","getSurveys","getActiveMatchingSurveys","renderSurvey","canRenderSurvey","getNextSurveyStep"];
  for (var s = 0; s < g.length; s++) {
    !(function (e) {
      t[o][e] = function () {
        t[o].push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    })(g[s]);
  }
  t[o].l = +new Date();
  var n = e.createElement("script");
  n.async = 1;
  n.src = ${JSON.stringify(POSTHOG_HOST)} + "/static/array.js";
  n.crossOrigin = "anonymous";
  var i = e.getElementsByTagName("script")[0];
  if (i && i.parentNode) {
    i.parentNode.insertBefore(n, i);
  } else {
    e.head.appendChild(n);
  }
})(window, document);

if (window.posthog && typeof window.posthog.init === "function") {
  window.posthog.init(${JSON.stringify(POSTHOG_TOKEN)}, {
    api_host: ${JSON.stringify(POSTHOG_HOST)},
    person_profiles: "identified_only",
    capture_pageview: true,
  });
}
`
  : null;

const Analytics = () => {
  return (
    <>
      {posthogSnippet && (
        <Script id="posthog-init" strategy="afterInteractive">
          {posthogSnippet}
        </Script>
      )}

      {GA_MEASUREMENT_ID && (
        <>
          <Script
            id="google-analytics-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
`}
          </Script>
        </>
      )}
    </>
  );
};

export default Analytics;
