import type { AppProps } from "next/app";
import React from "react";
import "./_app.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
