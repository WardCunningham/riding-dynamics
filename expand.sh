# expand dynamics.json as wiki pages directory
# usage: sh expand.sh

# compare expands
# diff -y <(ls -l pages | cut -c 26-32,46-99) <(ls -l old/pages | cut -c 26-32,46-99)

mv ~/Downloads/dynamics.json .
rm -rf pages
mkdir pages
for slug in `cat dynamics.json | jq -r 'keys[]'`; do
  cat dynamics.json | jq '.["'$slug'"]' > pages/$slug
done