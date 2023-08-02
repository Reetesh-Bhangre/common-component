# chmod -R +x ../build-scripts
# LATEST_LOG=$(git log --oneline --decorate -1)
# git stash
# if [[ "$LATEST_LOG" =~ feature/ ]]; then
#   npm version prerelease
# else
#   npm version patch
# fi
# git stash pop
# PROJECT_VERSION=$(./get-version.sh)
# checks if branch has something pending
function parse_git_dirty() {
  git diff --quiet --ignore-submodules HEAD 2>/dev/null; [ $? -eq 1 ]
}

# DEMO
git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1$(parse_git_dirty)/"