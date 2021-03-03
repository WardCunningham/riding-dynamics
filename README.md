# Riding Dynamics
Convert epub to wiki site

## setup
- Import word doc into Apple Pages
- Export as epub
- Change epub sufix to .zip
- Unzip

## convert
- Add script tag to xhtml invoking export.js
- Reload xhtml in browser to extract
- Expand to pages directory with expand.sh
- Publish to web with publish.sh

## analysis
- Find unreferenced pages with unref.js
- Find large pages with pagecount.js
