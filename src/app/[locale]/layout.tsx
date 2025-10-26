import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientLayoutWrapper from "../_components/ClientLayoutWrapper";
import Navbar from "../_components/Navbar";
import NewFooter from "../_components/NewFooter";
import NewHeader from "../_components/NewHeader";

export const metadata = {
  title: "Mirado",
  description:
    "mirado",
};
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        <NewHeader />
         {children} 
        <NewFooter />
      </NextIntlClientProvider>
    </div>
  );
}
