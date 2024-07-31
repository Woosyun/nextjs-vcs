import "./globals.css";
import { Topbar } from "@/components/Topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Topbar  />
        {children}
      </body>
    </html>
  );
}
