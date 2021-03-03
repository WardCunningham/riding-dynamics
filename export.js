// read and download book text from whole-book dom presentation
// usage: ... <script src="../export.js"></script></body></html>

let exprt = {}

let toc = {}
let sect = {}
let body = {}

function log(event, stream) {
  let where = 
    stream === toc ? 'toc' :
    stream === sect ? 'sect' :
    stream === body ? 'body' :
    'unknown'
  console.log(event, where)
}

const asSlug = (title) => title.replace(/\s/g, '-').replace(/[^A-Za-z0-9-]/g, '').toLowerCase()
const id = () => Math.trunc(Math.random()*1000000000000+1000000000000).toString()
const deepcopy = (obj) => JSON.parse(JSON.stringify(obj))
const paragraph = (text) => ({type:'paragraph', text})
const html = (text) => ({type:'html', text})
const link = (title) => paragraph(`[[${title}]]`)

function start(stream, title) {
  if (stream.title) finish(stream)
  log('start',stream)
  stream.title = title
  stream.story = []
}

function finish(stream) {
  log('finish',stream)
  if (stream.title) {
    exprt[asSlug(stream.title)] = {
      title: stream.title,
      story: stream.story,
      journal: [{
        type:'create',
        date:Date.now(),
        item:{
          title: stream.title,
          story: deepcopy(stream.story)
        }
      }]
    }
  }
  delete stream.title
  delete stream.story
}

function add(stream, item) {
  if(stream.story) {
    item.id = id()
    stream.story.push(item)    
  } else {
    log('skipping',stream)
  }
}

function generate() {
  let current = {}

  function heading(e) {
    let tag = e.tagName
    let text = e.innerText
    console.log(`${tag} -- ${e.querySelector('span').id} -- '${text}'`)
    if (tag == 'p') {
      add(body, link(text))
    }
    start(body, text)
    current = body
    if (tag == 'h1') {
      if (text.match(/^\d/)) {
        start(sect, text)
        current = sect
      }
      add(toc, link(text))
    } else if (tag == 'h3') {
      add(sect, link(text))
    } else {
           
    }
  }

  function image(e) {
    let src = e.querySelector('img').getAttribute('src')
    console.log('img',src)
    add(current, html(`<img width=100% src=http://dynamics.ward.asia.wiki.org/assets/${src}>`))
  }

  start(toc,'Riding Dynamics')
  for (let e of document.querySelectorAll('h1,h2,h3,p')) {
    if (!e.innerText.match(/\S/)) continue
    if (e.querySelector('span')?.id) {
      heading(e)
    } else if (e.querySelector('img')?.src) {
      image(e)
    } else {
      add(current, paragraph(e.innerText))
    }
  }
  finish(body)
  finish(sect)
  finish(toc)
}

function download(string, file) {
  var data = "data:text/json;charset=utf-8," + encodeURIComponent(string);
  var anchor = document.createElement('a');
  anchor.setAttribute("href",     data);
  anchor.setAttribute("download", file);
  document.body.appendChild(anchor); // required for firefox
  anchor.click();
  anchor.remove();
}


generate()
download(JSON.stringify(exprt,null,2), 'dynamics.json')