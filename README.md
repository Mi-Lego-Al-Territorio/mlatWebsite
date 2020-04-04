# Mi lego al territorio website

The following is the documentation for the development of the website of Politecnico Student Team 'Mi Lego Al Territorio'. Everything that follows are assumptions that need to checked for feasibility during the implementation phase.

## Table of contents

- [Table of contents](#table-of-contents)
- [General decisions](#general-decisions)
- [Glossary](#glossary)
- [General page structure](#general-page-structure)
- [Content structure](#content-structure)
- [HUGO layouts needed](#hugo-layouts-needed)
- [Partials needed](#partials-needed)
- [Configuration parameters needed](#configuration-parameters-needed)
- [Sass structure](#sass-structure)
- [Deployement](#deployement)
- [Automation](#automation)
- [Implementation path](#implementation-path)
- [General notes](#general-notes)

## General decisions

- The website is developed with the [HUGO](https://gohugo.io/) tool
- The format to represent data is YAML
- SASS is used instead of normal CSS
- The design is desktop-first, since the more complicated front-end logic is on a wide screen layout
- For icons it is used [Flaticon](https://www.flaticon.com/)

## Glossary

| acronym | meaning            |
| ------- | ------------------ |
| ds      | stands for desktop |
| mb      | stand for mobile   |

## General page structure

Each page has a common structure:

- a header
- a menu
- the remaining available space is for the content and the footer
- the content is the only part that changes between pages

### Header

- on ds:
  - fixed at the top of the page, even when scrolling
  - it contains
    - hamburger menu
    - title
    - logo
- on mb:
  - shrinks on scroll
  - it contains:
    - hamburger menu
    - title or page title
- when the hamburger menu is clicked it turns into an 'X' and viceversa

### Menu

- the structure of the menu is defined in each page
- on ds:
  - it is split in 2 parts:
    - icons linking to each page
    - names for each icon
  - by default it shows only the icon part
  - when hovering over it, the names slide out over the content and stays open until the mouse goes away from the icons or the names itself
  - when the hamburger menu is an 'X', the names are slided out and the content and the footer are shrunk a bit
  - the opening and closing of the menu are based on the pattern checkbox-label-sibling
  - the state of the menu will be saved in localStorage to provide a better UX when changing between pages
- on mb:
  - by default it's hidden
  - when the hamburge menu is an 'X', both parts of the menus slide in

### Main

- it fills up the available space on the screen
- on ds:
  - it shrinks and enlarges adjusting to the menu
  - except for the home page it display the title of the website

### Footer

- stays at the bottom of the page and always under the content
- it is not fixed like the header but it moves when scrolling
- it shows the link for the info email and the icons to social pages

## Content structure

The following is the tree structure of the content folder, where each subfolder maps to a page of the website. Each page is a leaf bundle (in future some pages could become branch bundles), so there needs to be a index.md file. In each index.md there is the general content for the page.

    /content
    |--/didattica
       |--index.md
       |--step1.md
       |--...
       |--stepN.md
    |--/eventi
       |--index.md
       |--eventDate1.md
       |--...
       |--eventDateN.md
    |--/partners
       |--index.md
    |--/progetti
       |--index.md
       |--model1.md
       |--...
       |--modelN.md
    |--/team
       |--index.md
       |--groupName.md
       |--...
       |--groupNameN.md

### /

- title and general info on the team
- the structure is specified in the index layout
- needs to access the events data in the ./eventi folder and show the last 2 through the eventCard partial
- on ds there 2 columns, one for the info and one for the latest events
- on mb one columns

### /didattica

- shows the steps of the educational activity proposed by the team
- index.md frontmatter:
  - introMessage
  - endMessage
- maps stepsN.md to activityStep
  - icon
  - duration
  - type
  - file content is description
  - images in assets/didattica/stepN/
- section template to define HTML where mapping is implemented

### /eventi

- each eventDateN.md file contains data for a single event
- the eventDate is formatted DDMMYYYY
  - name
  - place
  - file content is description
  - images in assets/eventi/eventDateN/
- section template to define HTML where mapping is implemented
- need to define eventCard partial to be accessed also from home

### /partners

- access partners in the config file, each item of the list specifies URL of partner page and path to image /assets/imges/partner, it is bettter to use path because name could be changed, instead path needs to be checked.
- section template to define HTML where mapping is implemented

### /progetti

- shows info about the models of the team
- one .md files for each model with its data:
  - icon
  - main picture or 3d model (not needed for the moment)
  - file content is description
  - images in assets/progetti/modelN/
- map model files to model shortcodes
- section template to define HTML where mapping is implemented

### /team

- each groupNameN.md file contains data for a single team
  - icon
  - weight
  - file content is description
- maps groupNameN to groupCard
- section template to define HTML where mapping is implemented

## HUGO layouts needed

- baseof
  - header, menu, footer since is equal for all pages
  - body which will be defined by all pages
- index
  - define body of home
- one for each page

## Partials needed

| name      | description                             |
| --------- | --------------------------------------- |
| eventCard | display event info                      |
| divider   | display line to better separate content |

## Configuration parameters needed

- motto
- team description
- mails: a key-value list providing the different mails of the team (e.g. info, coordinatore)
- social: a key-value list providin the links to social pages of the team. Each value provides the link and the name of the FA icon

## Sass structure

The following is the directory tree of the assets/sass folder. It contains all the sass modules needed. To implement more easily media query the library [include-media](https://github.com/eduardoboucas/include-media) is used.

    /sass
    |--/common      -> a file with the style for each elements common to every page
    |--/pages       -> a file with the style for each page with its specific elements
    |--base.scss    -> contains default style for HTML tags and includes other modules
    |--config.scss  -> contains sass variables and mixins

## Deployement

Until the website doesn't need some back-end feature, for example the quiz game, it will be hosted on Netlify linked to its github repo. We chose Netlify because:

- it is a free solid platform
- it is built for the JAM-stack and pairs up greatly with HUGO
- supports an efficient way to store images using its Large Media feature
- provides with a free SSL certificate from "Let's Encrypt"
- let us use a costum url

Once the website will need a back-end feature will evaluate different options, for now the main candidates are Firebase, an abstraction of Google Cloud, and Microsoft Azure.

## Automation

### Github actions

### Other services

## Implementation path

- [ ] write documentation
- [ ] hugo base setup
- [ ] base template (header, menu, footer)
- [ ] deploy to fake url
- [ ] pages with img placeholders
- [ ] adding imgs
- [ ] optimizing imgs inside HUGO
- [ ] deploy to real url
- [ ] optimizing imgs outside HUGO (if necessary)
- [ ] optimizing SEO
- [ ] docs to explain how to add content
- [ ] pipes to add automatic content
- [ ] other functionalities
  - quiz
  - ...

## General notes

### Gabri

- start with base website and then optimize
  - Images (Netlify Large Media)
  - Automation (Github Actions)
  - accessible content management by non-dev users (Integromat)
  - SEO

### Nico

- use picture tag instead of img tag
- CSS blur on 20x20 and the load asynchronously
- use webP and PNG
