import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <App />
        </HashRouter>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
