import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";
import Layout from "@theme/Layout";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import React from "react";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="bg-genie-600 flex flex-1">
      <div className="container mx-auto px-12 flex items-center justify-between">
        <div className="m-3 flex gap-5 items-center">
          <img
            src={"/img/ts-genie-big.png"}
            className="h-full w-[192px]"
            style={{ imageRendering: "pixelated" }}
          />
          <div>
            <h1 className="text-9xl text-white">{siteConfig.title}</h1>
            <div className="mt-8 flex gap-4">
              <Link
                className="button button--lg text-black bg-gradient-to-b from-gold-600 to-gold-800"
                to="/docs/quick-start"
              >
                Quick start
              </Link>
              <Link
                className="button button--lg button--secondary"
                href="https://github.com/AlfonzAlfonz/ts-genie/tree/main/examples"
              >
                Examples
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#f6f8fa] dark:bg-[#282A36] rounded-md min-w-[500px] px-4">
          <Tabs>
            <TabItem value="code" label="Code" className="pt-0">
              <CodeBlock
                language="ts"
                children={`
yield m.interface("Person")
  .export()
  .prop("firstname", "string")
  .prop("age", "number", { optional: true });`}
              />
            </TabItem>
            <TabItem value="output" label="Output" className="pt-0">
              <CodeBlock
                language="ts"
                children={`
export interface Person {
  firstname: string;
  age?: number;
}`}
              />
            </TabItem>
          </Tabs>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
    </Layout>
  );
}
