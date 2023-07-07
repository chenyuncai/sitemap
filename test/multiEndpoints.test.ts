import { describe, expect, it } from 'vitest'
import { createResolver } from '@nuxt/kit'
import { $fetch, setup } from '@nuxt/test-utils'

const { resolve } = createResolver(import.meta.url)

await setup({
  rootDir: resolve('../.playground'),
  build: true,
  server: true,
  nuxtConfig: {
    sitemap: {
      credits: false,
      sitemaps: {
        foo: {
          include: ['/foo/*'],
          dynamicUrlsApiEndpoint: '/api/multi-sitemap-sources/foo',
        },
        bar: {
          include: ['/bar/*'],
          dynamicUrlsApiEndpoint: '/api/multi-sitemap-sources/bar',
        },
      },
      sitemapName: 'test.xml',
      siteUrl: 'https://nuxtseo.com',
    },
  },
})
describe('multiEndpoints', () => {
  it('basic', async () => {
    let sitemap = await $fetch('/foo-sitemap.xml')
    // remove lastmods before tresting
    sitemap = sitemap.replace(/lastmod>(.*?)</g, 'lastmod><')
    // basic test to make sure we get a valid response
    expect(sitemap).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?><?xml-stylesheet type=\\"text/xsl\\" href=\\"/__sitemap__/style.xsl\\"?>
      <urlset xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:video=\\"http://www.google.com/schemas/sitemap-video/1.1\\" xmlns:xhtml=\\"http://www.w3.org/1999/xhtml\\" xmlns:image=\\"http://www.google.com/schemas/sitemap-image/1.1\\" xsi:schemaLocation=\\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd\\" xmlns=\\"http://www.sitemaps.org/schemas/sitemap/0.9\\">
          <url>
              <lastmod></lastmod>
              <loc>https://nuxtseo.com/foo/1</loc>
          </url>
          <url>
              <lastmod></lastmod>
              <loc>https://nuxtseo.com/foo/2</loc>
          </url>
          <url>
              <lastmod></lastmod>
              <loc>https://nuxtseo.com/foo/3</loc>
          </url>
          <url>
              <lastmod></lastmod>
              <loc>https://nuxtseo.com/foo/4</loc>
          </url>
          <url>
              <lastmod></lastmod>
              <loc>https://nuxtseo.com/foo/5</loc>
          </url>
      </urlset>"
    `)
  }, 60000)
})