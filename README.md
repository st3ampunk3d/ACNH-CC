# Animal Crossing: New Horizons - Collection Creator (ACNH-CC)

## Production URL:
 - https://lambent-starlight-2a9cd8.netlify.app/

## Description

This application is the start of a progress tracker/guide for the Nintendo game, Animal Crossing: New Horizons. It currently pulls data from 5 of the available endpoints of the Nookipedia API to display information about various events, collectables, and characters in the game. While the functionality in this first draft of the web app is limited, it has the potential to become a very scalable and rhobust tool for Animal Crossing enthusiats to use. I created the app with my 7-year-old in mind. The interface is intended to be simple, easy to navigate, and engaging.

## Pages

- Home (Landing page, the main purpose is to link to the rest of the site)
- Events (interactive Calendar display of in-game events)
- Collectables (Fish, Bugs, Sea Creatures, and Villagers)
- Details (information about an individual collectable)
- Favorites / Collection (Displays items flagged as favorites or collected. Can be filtered by collectable category)

## CSS Trickery

- Animations (keyframes and transformations)
- Shadows
- Image color masking
- Media Cards

## JavaScript Spotlight

- Interactive Event Calendar
- Pagination on the "villagers" view
- Real Time Clock display in header

## Data Storage

- Favorited and collected items stored in unique keys in LocalStorage
- LocalStorage is read to create the Favorite and Collection views
- LocalStorage is read to trigger CSS rules coloring in the favorite anc collected icons on the grid views

## Troubles I Overcame

### These are the most significant issues I ran in to and how I solved them.

- Removing the correct item from the favorites/collection. Early on it was removing the last item in the array instead of the one I intended. I ended up learning quite a bit about event bubbling

- Responsive web pages: The "villagers" view refused to reduce from a 5 column grid to a 3 column grid. It turns out that the CSS added by my paginination function was conflicting and reverting it back to a 5 column grid after the @media rules had been applied.

- Preventing errors on the Favorites/Collection view when LocalStorage was empty. The data is stored in LocalStorage as a dictionary of lists. I wasn't sure how to initialize an empty dictionary and all of the empty lists at the same time. It took some trial and error but I finally found the right error handling to move on with no action if a particular dictionary key was not defined or had an empty value.

- My inital plan for this web application was much more involved. I realized part way through that I would have to elimanate some of the features and content in order to complete this with the time restraints. Adapting my plan to the time I had was critical for my sanity! I plan to tinker with this project more as time allows in the future.



# Running this App Yourself

## Prerequisites

- Obtain an API key for the Nookipedia API
- You must have Node installed.

## Setup

- `npm install`
- `npm run start` starts up a local server and updates on any JS or CSS/SCSS changes.

## Other commands

- `npm run build` to build final files when you are ready to turn in.
- `npm run lint` to run ESLint against your code to find errors.
- `npm run format` to run Prettier to automatically format your code.
