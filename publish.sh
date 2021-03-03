# move expanded pages to public location
# sh publish.sh

scp pages/* asia:.wiki/dynamics.ward.asia.wiki.org/pages/
ssh asia 'rm .wiki/dynamics.ward.asia.wiki.org/status/sitemap.*'
ssh asia 'rm .wiki/dynamics.ward.asia.wiki.org/status/site-index.json'
ssh asia 'rm .wiki/dynamics.ward.asia.wiki.org/status/index-updated'
