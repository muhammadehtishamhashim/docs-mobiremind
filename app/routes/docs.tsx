import type { Route } from "./+types/docs";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { getPageMarkdownUrl, source } from "@/lib/source";
import browserCollections from "collections/browser";
import { baseOptions } from "@/lib/layout.shared";
import { gitConfig } from "@/lib/shared";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { getPageImagePath } from "@/lib/og";
import { useMDXComponents } from "@/components/mdx";
import { ShieldCheck, TrendingUp, Mic } from "lucide-react";

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = (params["*"] ?? "").split("/").filter((v) => v.length > 0);

  if (slugs.length === 0) {
    throw new Response(null, {
      status: 302,
      headers: { Location: "/docs/admin" },
    });
  }

  const page = source.getPage(slugs);
  if (!page) throw new Response("Not found", { status: 404 });

  return {
    path: page.path,
    markdownUrl: getPageMarkdownUrl(page).url,
    pageTree: await source.serializePageTree(source.getPageTree()),
    imagePath: getPageImagePath(slugs),
  };
}

const clientLoader = browserCollections.docs.createClientLoader({
  component(
    { toc, frontmatter, default: Mdx },
    {
      markdownUrl,
      path,
      imagePath,
    }: {
      markdownUrl: string;
      path: string;
      imagePath: string;
    },
  ) {
    return (
      <DocsPage
        toc={toc}
        tableOfContent={{ style: "clerk" }}
        tableOfContentPopover={{ style: "clerk" }}
      >
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta property="og:image" content={imagePath} />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b -mt-4 pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`}
          />
        </div>
        <DocsBody>
          <Mdx components={useMDXComponents()} />
        </DocsBody>
      </DocsPage>
    );
  },
});

export default function Page({ loaderData }: Route.ComponentProps) {
  const { path, pageTree, imagePath, markdownUrl } =
    useFumadocsLoader(loaderData);

  const isSalesman = path.startsWith("salesman");
  const isVoiceAgent = path.startsWith("voice-agent");

  const theme = isSalesman ? "theme-green" : isVoiceAgent ? "theme-yellow" : "theme-cyan";

  return (
    <DocsLayout
      {...baseOptions()}
      tree={pageTree}
      containerProps={{ className: theme }}
      tabs={[
        {
          title: "Admin",
          url: "/docs/admin",
          icon: <ShieldCheck className="size-4" />,
        },
        {
          title: "Salesman",
          url: "/docs/salesman",
          icon: <TrendingUp className="size-4" />,
        },
        {
          title: "Voice Agent",
          url: "/docs/voice-agent",
          icon: <Mic className="size-4" />,
        },
      ]}
    >
      {clientLoader.useContent(path, { markdownUrl, path, imagePath })}
    </DocsLayout>
  );
}
