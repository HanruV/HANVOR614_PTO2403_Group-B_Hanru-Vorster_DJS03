### Project Latout

- scripts.js
- sources
  - data.js
  - search.js
  - settings.js
  - ui.js

## Table showing how the code was abstracted

| File.js     | Purpose                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------- |
| scripts.js  | Houses all the higher order functions to make the file more declarative and easy to read |
| data.js     | Stores the authors, genres, and books data for the project                               |
| search.js   | Houses the helper functions that enable the search functionalities of the app            |
| settings.js | Houses the helper functions that enable the theme switch functionalities of the app      |
| ui.js       | Houses the helper functions responsible for ui alterations in the app                    |

## Here is a simple flow chart:

```mermaid
flowchart TD
    subgraph Data ["data.js"]
        genres["genres"]
        authors["authors"]
        books["books"]
    end

    search["search.js"]
    settings["settings.js"]
    ui["ui.js"]

    Data --> search
    Data --> settings
    Data --> ui

    search --> scripts["scripts.js"]
    settings --> scripts
    ui --> scripts
```

## Making of the custom element web component BookPreview

### Began with a boiler plate

- added the attributes it will work with
- added the html template in render()
- exported the web component

### Importing to ui.js to update functions that use the new component

- fed as argument in renderbooks for the create element (getting null back in disay)
  - fixed by replacing the existing elements html in the function to the new attributes because book-preview already returns the html, this just sets the custom attribures (forgot to add styling)
  - added the styles in the BookPreview shadowDom
- fed as argument in the loadMoreBooks where the element is created

### Added the component sctipt to HTML

### Error BookPreview.js:81 Uncaught NotSupportedError: Failed to execute 'define' on 'CustomElementRegistry': the name "book-preview" has already been used with this registry at BookPreview.js:81:16

- fixed by adding a check when defining the webcomponent so it doesnt make multiple isntances.
