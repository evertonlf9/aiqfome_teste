"use client";

import Image from "next/image";
import { Layout, ConfigProvider, Input } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import {
  UserOutlined,
  EnvironmentOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useAppContext } from "@/context/appContext";
import { Suspense } from "react";

const { Header, Content, Footer } = Layout;

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setFilter, hiddenFilter } = useAppContext();

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
        <Layout className="min-h-screen">
          <Header
            className={
              hiddenFilter
                ? "px-6 pr-4 pl-4 h-[64px]"
                : "px-6 pr-4 pl-4 h-[64px] height-fixed"
            }
          >
            <div className="flex items-center justify-between header-padding">
              <Image
                src="/aiqfome-svgrepo-com.svg"
                alt="Logo"
                className="w-8 h-8"
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
              <div className="flex items-center gap-2">
                <div className="flex items-center text-white gap-2">
                  <EnvironmentOutlined className="text-xl" />
                  <div className="flex flex-col">
                    <span className="text-sm">entregando em</span>
                    <span className="text-base font-medium">
                      Rua Mandaguari, 198
                    </span>
                  </div>
                  <span className="text-xl">›</span>
                </div>
              </div>
              <div className="flex items-center text-white">
                <UserOutlined className="text-2xl" />
              </div>
            </div>
            {!hiddenFilter && (
              <div className="px-6 pb-4 max-w-7xl mx-auto">
                <Input
                  size="large"
                  placeholder="busque pela loja ou culinária"
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="rounded-full bg-white"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            )}
          </Header>
          <Content>
            <Suspense fallback={<div>Carregando conteúdo...</div>}>
              {children}
            </Suspense>
          </Content>
          <Footer className="text-center bg-white h-[100px] flex flex-col justify-center">
            <span className="text-footer-color font-bold mb-2 text-[14px]">
              feito com 💜 em maringá-PR
            </span>
            <span className="text-footer-color font-bold text-[16px]">
              aiqfome.com © 2007-2023 aiqfome LTDA . CNPJ: 09.186.786/0001-58
            </span>
          </Footer>
        </Layout>
      </ConfigProvider>
    </StyleProvider>
  );
}
