// report page size for all pages in export file
// cat dynamics.json | deno run pagecount.js

const stdin = await Deno.readAll(Deno.stdin);
const pages = JSON.parse(new TextDecoder().decode(stdin))
const lengths = Object.values(pages).map(page => ([page.story.length, page.title]))
lengths.sort((a,b) => b[0] - a[0])
const report = lengths.map(row => row.join(' -- ')).join("\n")
console.log(report)