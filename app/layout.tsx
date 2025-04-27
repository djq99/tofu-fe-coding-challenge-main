"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/global.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Tofu</title>
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body>
        <div className="grow w-full h-full">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
