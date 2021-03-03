// list pages with no inbound references
// deno run --allow_net unref.js

let url = 'http://dynamics.ward.asia.wiki.org/system/sitemap.json'
let sitemap = await fetch(url).then(res => res.json())

let refs = {}
for (let info of sitemap) {
  refs[info.slug] = 0
}
for (let info of sitemap) {
  for (let ref in (info.links||{}))
    refs[ref] += 1
}
for (let ref in refs) {
  if (!refs[ref]) console.log(ref)
}