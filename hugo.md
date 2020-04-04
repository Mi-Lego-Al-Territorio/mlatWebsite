# Understanding HUGO

## Important folders

- _config_: every general config variable for website (baseUrl, title, links to socials, language code, params for theme, params for HUGO functions and many others)
- _content_: pages and sections of website
- _static_: everything that can't go in website and it's not meant to be preprocessed (e.g. .pdf)
- _assets_: same as static but with preprocessable stuff (e.g. images)
- _layouts_: custom base htmls to define part of website or to override part of the theme (in our case not interested)
- _public_: output of compilation, production files
- _archetypes_: default initial file structure, useful in big websites, probably not so much in ours

## frontmatter

- Top part of a .md file delimited by upper and lower '---'
- can be part of every .md file in content dir
- Contains useful info for the markdown or for the theme, like
  - title
  - description
  - date
  - keyworks
  - type
  - slug
  - menu
- regarding the menu it is advised to place it in the frontmatter instaed of the config file to make it more stateless and related to the actual pages of the website

## content management

The content folder is like the tree structure of the sections of the website. For example if the website has sections:

- home at domain/
- progetti at domain/progetti/
- team at domain/team/

The content folder will be:

- content
  - index.md (home)
  - progetti
    - index.md (progetti)
  - team
    - index.md (team)

Each section can reprens one single page (**Leaf Bundle**) or a list of sub-pages (**Branch Bundle**).

## Leaf Bundle

- a folder with 'index.md' file
- contains all the necessary info for a single page: (markdown, metadata and resources)
- theorically could be moved in another place of the website and should render pretty equally

## Branch Bundle

- a folder with '\_index.md' file
- contains all the necessary info for that page containing a list of its sub-pages: (markdown, metadata and resources)
- each child page could then be a single specific single page
- used for example if I have a list of events in one page and I need to have also a page for each event

## Go template language

## variables

| statement             | description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| \$                    | global site variable                                                  |
| \$.Site               | metadata for entire website                                           |
| \$.Site.Params        | access all site varibales non standardized by HUGO                    |
| \$.Site.Menu.menuName | access entries in the menuName menu                                   |
| \$.Page               | access page file                                                      |
| \$.Page.Title         | access title of page                                                  |
| \$.Page.Description   | access description of page                                            |
| \$.Page.Params        | all variables in the frontmatter of the page non standardized by HUGO |
| \$variable            | declares a variable named 'variable'                                  |
| \$variable := x       | assign x to variable                                                  |
| .                     | general context variable (like pwd in linux)                          |

## functions

Allow to write some logic avoid repetition and ease development of static websites

| statement                                          | description                                                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| {{if something}}...{{else if something}}...{{end}} | classic if else statement                                                                 |
| {{range arg}...{{end}}                             | loops through args repeating the inner code arg[i] is . (current context)                 |
| {{with arg}} ... {{end}}                           | if arg exists, code inside will have arg as .                                             |
| humanize                                           | transform text in better-human-readable format                                            |
| \|                                                 | pipe operator to chain functions                                                          |
| dict                                               | creates a dictionary from a list of key and value pairs, useful to pass args to functions |
| .Param arg and .Section arg                        | acces param or section with name arg                                                      |
| .Summary                                           | first summaryLenght (in config or 70) words of content                                    |
| .Respurces                                         | great API to manage files                                                                 |
| findRE                                             | find regEx, could be useful                                                               |
| default arg1 arg2                                  | corresponds to classic (arg2 ? arg2 : arg1)                                               |
| isset arg                                          | return true if arg exists                                                                 |

and many others in the official doc...

## Useful doc folders

- ch05-01/layouts/template-playground: basis for go template language

## Shortcodes

- pieces of go template language that return HTML
- can take parameters
- can be global or refer to a single page (by declarin them inside)

## Content types

A content type is like a theme, but for a section of the website. It defines a markup structure for the content in input. Allow for variety of to override a theme. To specify the type of a page we can use the equally named variable in the frontmatter or it is the name of the folder the page is in.

## Layout templates

- A base template defines the base structure of the website in the baseof.html. A type can define his own base template.
- A base template is composed of {{block}}. Each other template can define those block
- Each type has 4 + 1 layouts:
  - list: branch bundles
  - single: leaf bundles
  - index: home page
  - 404: not found page
  - section: it referes to a part of the content folder that matches the dir-tree in the layouts folder
- partials: like functions in normal programming
  - take arguments, first is context, best practice to have it as little as possible
  - have no deafult value
  - can return HTML but pretty much everything (unlike shortcodes, only HTML)
  - can perform calculation
  - possible optimizations can be done by exploiting caching
- the HUGO team provides useful deafult template, intersting for SEOs

## HUGO pipes

HUGO has some functions that can be chained esaily (pipe operator) preprocess data like CSS/JS

- .ExecuteAsTemplate : useful to treat any file as a Go template file. This allows for example to add costum parts to a sccs file. Best practice is to add .tpl to the name of the file
- functions to handle images:
  - .Resize
  - .Fit
  - .Fill
