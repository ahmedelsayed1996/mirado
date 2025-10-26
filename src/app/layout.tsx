
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cairo } from 'next/font/google'
import './globals.css';
import ReduxProvider from "./ReduxProvider";
import Script from 'next/script'
// const myFont = LocalFont({ src: "../../public/fonts/SomarSans-Regular.ttf" });

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} className={cairo.className}>
      <head>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=759037676720668&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body dir={locale === 'ar' ? "rtl" : "ltr"}>
        {/* google tag manger */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZP2VTMCZPV"></Script>
        {/* google analytics */}
        <Script id='google-analytics'>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZP2VTMCZPV');`}
        </Script>

        <Script
          id="clarity-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sgbahf17cz");
            `,
          }}
        />

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=[
                "page","track","identify","instances","debug","on","off",
                "once","ready","alias","group","enableCookie","disableCookie",
                "holdConsent","revokeConsent","grantConsent"
              ];
              ttq.setAndDefer=function(t,e){
                t[e]=function(){
                  t.push([e].concat(Array.prototype.slice.call(arguments,0)))
                }
              };
              for(var i=0;i<ttq.methods.length;i++){
                ttq.setAndDefer(ttq,ttq.methods[i]);
              }
              ttq.instance=function(t){
                for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++){
                  ttq.setAndDefer(e,ttq.methods[n]);
                }
                return e;
              };
              ttq.load=function(e,n){
                var r="https://analytics.tiktok.com/i18n/pixel/events.js",
                    o=n&&n.partner;
                ttq._i=ttq._i||{};
                ttq._i[e]=[];
                ttq._i[e]._u=r;
                ttq._t=ttq._t||{};
                ttq._t[e]=+new Date;
                ttq._o=ttq._o||{};
                ttq._o[e]=n||{};
                n=document.createElement("script");
                n.type="text/javascript";
                n.async=!0;
                n.src=r+"?sdkid="+e+"&lib="+t;
                e=document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(n,e);
              };
              ttq.load('CLFLD33C77U0GRKV547G');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        <ReduxProvider>
          {children}
          <ToastContainer position="bottom-right" />
        </ReduxProvider>
      </body>
    </html>
  )
}
