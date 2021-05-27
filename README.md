# Mi lego al territorio website

[Deployed website](https://www.milegoalterritorio.it)

The following is the documentation for the development of the website of Politecnico Student Team 'Mi Lego Al Territorio'.

## Index

- [Mi lego al territorio website](#mi-lego-al-territorio-website)
  - [Index](#index)
  - [General decisions](#general-decisions)
  - [Glossary](#glossary)
  - [General page structure](#general-page-structure)
  - [Content structure](#content-structure)
  - [HUGO layouts needed](#hugo-layouts-needed)
  - [Configuration parameters needed](#configuration-parameters-needed)
  - [Sass structure](#sass-structure)
  - [Deployement](#deployement)
  - [CI/CD pipelines](#cicd-pipelines)
  - [Implementation path](#implementation-path)
  - [General notes](#general-notes)

## General decisions

- The website is developed using [HUGO](https://gohugo.io/)
- The format to represent data is YAML
- SASS is used instead of CSS
- The design is desktop-first, since the more complicated front-end logic is on a wide screen layout
- For icons it is [Flaticon](https://www.flaticon.com/) website and (for the moment) only the social icons are from thethe Font Awesome CDN

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
  - when hovering over it, the names slide out over the content and stays open until the mouse goes away from the icons or the names
  - when the hamburger menu is an 'X', the names are slided out and the content and the footer shrink
  - the opening and closing of the menu are based on the pattern checkbox-label-sibling in CSS
  - the state of the menu is saved in localStorage to provide a better UX when changing between pages
- on mb:
  - by default it's hidden
  - when the hamburger menu is an 'X', both parts of the menus slide in

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

- The following is the tree structure of the content folder, where each subfolder maps to a page of the website.
- Each page is a HUGO leaf bundle (in future some pages could become branch bundles), so there needs to be a index.md file.
- Each index.md contains the general content for the page.
- Each data file contains a `showCMS` field just to avoid showing the index.md files in the cms

```
/content
|--_index.md
|--/didattica
    |--index.md
    |--area1-1.md
    |--...
    |--area1-N.md
    |--areaN-1.md
    |--...
    |--areaN-N.md
|--/eventi
    |--index.md
    |--eventName1.md
    |--...
    |--eventName1.md
|--/partners
    |--index.md
    |--partnerName1.md
    |--...
    |--partnerNameN.md
|--/progetti
    |--index.md
    |--model1.md
    |--...
    |--modelN.md
|--/team
    |--index.md
    |--workArea.md
    |--...
    |--workAreaN.md
```

### /\_index.md

- homepage
- Text for the "about" section

### /didattica

- index.md frontmatter:
  - title: page title
  - activityAreas: areas the education acvitity (sismico, idraulico, ...)
  - activityAreaIcons: icon CSS class for the area
  - body: initial text for the page
- contains areaN-stepN.md
  - title: just for CMS visualization, not relevant to website
  - type
  - area
  - icon
  - min
  - body
  - images in assets/didattica/areaN/stepN/ (for the moment)

### /eventi

- each eventNameN.md file contains data for a single event
  - title
  - place
  - date
  - imgPath (absolute)
  - body is description
- need to define eventCard partial to be accessed also from home page

### /partners

- each partnerNameN.md file contains data for a partner
  - title
  - link
  - imgPath (absolute)

### /progetti

- one .md files for each model with its data:
  - title
  - icon
  - imgPath (absolute)
  - body is description

### /team

- each groupNameN.md file contains data for a single team
  - title
  - icon
  - members
    - name
    - link
  - body is description

## HUGO layouts needed

### default

- baseof
  - header, menu, footer since is equal for all pages
- index
  - define body of home
- one for each page

### Partials needed

- eventCard: display event info
- image: renders <picture> tag

## Configuration parameters needed

- motto
- team description
- mails: a key-value list providing the different mails of the team (e.g. info, coordinatore)
- social: a key-value list providin the links to social pages of the team. Each value provides the link and the name of the FA icon

## Sass structure

The following is the directory tree of the assets/sass folder. It contains all the sass modules needed. To implement more easily media query the library [include-media](https://github.com/eduardoboucas/include-media) is used.

```
/sass
  |--/common      -> a file with the style for each elements common to every page
  |--/pages       -> a file with the style for each page with its specific elements
  |--base.scss    -> contains default style for HTML tags and includes other modules
  |--config.scss  -> contains sass variables and mixins
```

## Deployement

Until the website doesn't need some back-end feature, for example the quiz game, it will be hosted on Netlify linked to its github repo. We chose Netlify because:

- it is a free solid platform
- it is built for the JAM-stack and pairs up greatly with HUGO
- supports an efficient way to store images using its Large Media feature
- provides with a free SSL certificate from "Let's Encrypt"
- let us use a costum url
- has great implementation with [netlify cms](https://www.netlifycms.org/)

Once the website will need a back-end feature will evaluate different options, for now the main candidates are Firebase, an abstraction of Google Cloud, and Microsoft Azure.

## CI/CD pipelines

At the moment our deployment implements these mecanism of CI/CD pipelining:

- locally before commiting a pre-commit hook checks the formatting of the code and prevents non formatted code to commit
- on every push Netlify deploys a new preview of the site and a github action sends a message to a slack channel with the url of the deploy
- at every deploy start/end thanks to a webhook of netlify and a little nodeJS app on heroku a message is sent on slack
- every night a github action checks if some events became past, if so it redelpoys the entire site on netlify

## Implementation path

- [x] write documentation
- [x] hugo base setup
- [x] base template (header, menu, footer)
- [x] deploy to fake url
- [x] pages with img placeholders
- [x] adding imgs
- [x] add netlify CMS
- [x] pipes to add automatic content
- [x] optimizing imgs inside HUGO
- [x] deploy to real url
- [ ] optimizing SEO
- [ ] docs to explain how to add content
- [ ] optimizing imgs outside HUGO (if necessary)
- [ ] other functionalities
  - quiz
  - ...

## General notes

- start with base website and then optimize
  - Images (Netlify Large Media)
  - Automation (Github Actions)
  - accessible content management by non-dev users (Integromat)
  - SEO
- use picture tag instead of img tag
- CSS blur on 20x20 and the load asynchronously
- use webP and PNG
