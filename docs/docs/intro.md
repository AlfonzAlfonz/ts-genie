---
sidebar_position: 1
---

# Introduction

**Integrate any API with any library** - If you write your code generator yourself, you can integrate any API you use, with any library you use. You don't have to deal with pre-existing integrations.

This library is aimed at medium or large projects, which may have some kind of complex logic when it comes to fetching your data for example. Imagine you have an API which uses some kind of context which you have to send on each request and you would ideally want to store this context in React context. This may cause a problem when using existing libraries to generate the API bindings in your code, because they usually work as CLI tools with presets to choose from, but sometimes you end up bending those setups to get something the original authors didn't anticipate.

This library offers a different paradigm to this problem. You write all your code generations yourself. This is why this project may not be ideal for smaller project, which do not have the time to write the integration themselves. Generating a TypeScript code in itself is not difficult, but typescript library does not expose the most user friendly API and the code feels bloated and hard to use. This library aims to solve this issue and to provide simple API to create your own code generator, which suits exactly your needs.

```ts
// example of a request
export const getProductBySlugRequest = (
  ctx: RequestContext,
  slug: string, 
  options: { locale?: string }
) => request<ApiProductModel>({
  method: "GET",
  path: encodeUri`/ecommerce/product/${slug}?` + makeQuery("locale")(options.locale),
  ctx
});

// end use inside of a react component
const { data } = useRequest([query.slug, { locale: router.locale }], changePasswordRequest);
```

Where:
- `RequestContext` represent a context, you need to send on each request.
- `request` is a `fetcher` function with custom send,receive or validation logic.
- `useRequest` is then a simple wrapper around either `react-query`, `swr` or some other data-fetching library.

