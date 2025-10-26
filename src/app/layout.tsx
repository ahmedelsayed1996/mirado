
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cairo } from 'next/font/google'
import './globals.css';
import ReduxProvider from "./ReduxProvider";
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
      </head>
      <body dir={locale === 'ar' ? "rtl" : "ltr"}>
        <ReduxProvider>
          {children}
          <ToastContainer position="bottom-right" />
        </ReduxProvider>
      </body>
    </html>
  )
}
