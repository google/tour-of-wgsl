# Tour of WGSL

This repo contains a simple tour of WGSL static site generator. The
purpose is to provide an introduction to WGSL through examples which can
be modified and run by the user.

This is not an officially supported Google product.

## Development

### Quickstart
1. Install Hugo Extended v0.0111.3 or newer

> Available from [Hugo
> Releases](https://github.com/gohugoio/hugo/releases) (might need to
> expand the fold to see the extended versions)
>
> An example install on a Debian based Linux system using prebuilt
> binaries:
> 1. Goto [Hugo Releases -
>    v0.111.3](https://github.com/gohugoio/hugo/releases/tag/v0.111.3)
>    in a browser
> 2. Download the platform appropriate prebuilt package
>    (`hugo_extended_0.111.3_linux-amd64.deb`)
> 3. Install package locally using `dpkg -i
>    hugo_extended_0.111.3_linux-amd64.deb`

In 'Tour of WGSL' source directory

2. Install Node dependencies `npm ci`

3. Run Hugo webserver `npm run serve`

This should start a webserver on `localhost:1313/tour-of-wgsl` that you
can visit using a browser on your local machine.  Editing pages in the
site will auto-reload the browser window. This site may not display
correctly if WebGPU is not available in your browser, see below for
details about enabling WebGPU.

Documentation can be generated with `npm run docs`, though there are
known issues with types that may cause warnings/errors.

### Getting WebGPU in your browser
#### Chrome
**Note:** Need to be running Chrome (113.xxx) or newer, which
currently is the canary/unstable version. For Windows & Mac this can
be downloaded from https://www.google.com/intl/en_ca/chrome/canary/.

It's strongly advised to have this installed separately on your local system,
apart from your primary browser used daily. This version isn't as rigorously
tested as the stable release, thus there's a possibility it might encounter
issues during regular use.

Enable WebGPU flags, using either:
 * Set `Unsafe WebGPU` to `enabled` in
   `chrome://flags/#enable-unsafe-webgpu` in the browser

##### Linux
There is no canary provided for Linux, so either you will need to
install from source or download a nightly build, both of which are out
of scope for this doc.

> For Googlers on Linux, there is an internal Chrome unstable package
> that can be installed using `apt-get` for a separate install from
> your normal work browser

On Linux, with `Unsafe WebGPU` enabled, you may still not get
triangles rendering, depending on if Vulkan support is enabled for
your browser.

To force enabling Vulkan:
* Set `Vulkan` to `enabled` in `chrome://flags/#enable-vulkan` in the
  browser


### Adding new pages
A new page can be added with the `hugo new` command.

* `hugo new basics/for-loops.md`

This would add a new `for-loops.md` page into the `basics/` folder. The
Markdown file can also just be created by hand if desired.


## Folder Layout
The pages for the tour exist in the `content/` folder. The `_index.md`
file is the main homepage of the application. Under `content/` there
are a series of folders such as `basics/` for the various sections in
the tour. Each folder may contain multiple steps of that part of the
tour.

## Shaders
A page allows the shader source to be set which will be loaded into the
text box. This is done by adding a `shader: <path to shader>` into the
frontmatter of the document (the stuff in the `---` block at the top).
The shader will be fetched and populated into the textbox. The user can
then edit the shader if desired and `Render` the result.

## Uniforms
There are several uniforms provided to the shaders, this does mean that
for any shader which doesn't use the uniforms they need a phony
assignment in order to not generate layout errors.

### Parameters
* `frame` -- The current frame number
