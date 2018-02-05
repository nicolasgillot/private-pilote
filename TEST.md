# Technical Test / Front-end

**Please read the following instructions carefully**, it will give you valuable information to 
complete the test successfully.

## Purpose

This test will ask you to develop a web application front-end. You will have to integrate the 
provided design along with the provided API endpoints. You can use the provided skeleton or 
provide a brand new solution from scratch.

## The pitch

Chauffeur Privé wants to launch a brand new service of interstellar ride sharing named 
"Pilote Privé" (name is not yet final). The flow is quite simple:
- Choose a starship
- Choose if you are from the dark side or the light side (to avoid bad pooling experience)
- Choose the passengers
- Choose your destination planet
- Validate the selection to order a ride

Please note that this test is designed **for a human** (non-droid, non-reptile, non-gastropod, etc.)
If you belong to another species, please come back to use for the adequate test subject.

## Ressources

### [Site designs](https://zpl.io/ad9z60n)

Our galaxy-renowned Ewok UX designer produced screens and assets for you to integrate, you can find 
them on Zeplin. If you do not wish to / cannot access Zeplin, an offline version is provided in 
current directory in the `screens.zip` file, along with all assets in the `assets.zip` file.

**Please note:** you can propose improvements to the proposed design (important missing data 
display, animations, effects, styling, etc.) as our designer is currently on vacation on the 
first moon of Endor and won't be able to answer your questions...

### Front-end application skeleton

We provided a basic API-aware skeleton web application for you to start, it's located in the 
`pilote-prive` folder. Feel free to use it or discard it if you prefer. 

### [Pilote Privé API](https://test-pilote-prive.herokuapp.com/apidoc/v100/)

Our team of Wookie developers build a simple API for you to use. Several routes (available starships,
available destinations, available passenger, price quotation and ride order) are available, check 
the documentation for further details.

### [Star Wars API](https://swapi.co/documentation)

From this API you will retrieve all the data about planets, starships, characters (please note that 
not all are supported by the Pilote Privé API). Please consult the documentation for details of 
the API.

## Goals

### Goal 1 : integrate a static version of the designs

Make the design come to life by implementing the complete workflow using hard-coded values.

### Goal 2 : integrate Star Wars API

Use the API to enrich descriptions of all starhips, planets and characters.

### Goal 3 : integrate the Pilote Privé API pricing

Use the API to query for a price for the ride.

### Goal 4 : integrate the Pilote Privé API ride order

Use the API to order a ride.

## Optional goals

### add a Wookie language version

Our developers are really insistent about that. We're not very concerned about the accuracy of 
the wookie version, so feel free to use [a wookie translator](http://www.wookietranslator.com/).

### add effects and animations

The propose design does not include any indication of special effects or animations, but a new 
service like Pilote Privé should be really shiny and stand out against the imperial concurrent 
EmpUber...

### your idea

We encourage innovation and ideas coming from all, so propose / implement something new that would 
improve the user experience or the ride order workflow.

## Launching the server
``` bash
> npm install
> npm start
```

Open [http://localhost:3000](http://localhost:3000) to check the example page.

