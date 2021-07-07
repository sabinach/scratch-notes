# test-jekyll

### Set Up

#### Jekyll
- https://jekyllrb.com/docs/step-by-step/01-setup/

#### Deploy to ```gh-pages```
- [https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html](https://sangsoonam.github.io/2019/02/08/using-git-worktree-to-deploy-github-pages.html)

### Usage

#### To Initialize Jekyll
- ```bundle init``` (creates new ```Gemfile``` in repo)
- ```vim Gemfile``` (change to ```gem "jekyll"```)

#### To Edit Locally
- ```jekyll serve``` ([http://127.0.0.1:4000](http://127.0.0.1:4000))

#### To Deploy
- ```jekyll build``` (builds to ```_site```)
- Git push regularly from root directory (will push to ```main``` branch)
- ```cd _site; git push origin gh-pages``` (pushes to ```gh-pages``` branch)