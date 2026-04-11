import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "LexiWizard — AI-Powered Legal Assistant",
  description:
    "Your intelligent legal companion. Summarize documents, simplify legal language, research laws, and get AI-powered legal guidance.",
  keywords: ["legal assistant", "AI", "law", "summarize", "IPC", "legal research"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Initialize dark mode before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('lexiwizard-theme');
                if (theme === 'light') {
                  // light mode
                } else {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
