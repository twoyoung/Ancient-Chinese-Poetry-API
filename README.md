# Ancient-Chinese-Poetry-API

This is a simple restful API that user can get and filter for Chinese ancient poems and songs.

https://dolphin-app-h86ti.ondigitalocean.app/


- database: __MongoDB__

the database contains 14172 authors' 311881 ancient Chinese poems and 21595 songs mainly during the period of Tang dynasty and Song dynasty.

- technical stack: __Node.js__, __ExpressJS__, __Mongoose__
- deployed on: __DigitalOcean__

## A list of the models (collections):
Different models are created based on the gerne because poetries and songs as different gernes have different structures.

- Poetry
- Song
- Author

## Available routes:
```
/
```
get all the poetry and songs 

```
/random
```
get a random poetry or song from database

```
/poems
```
get all poems

```
/songs
```
get all songs

```
/authors
```
get all authors

## Query strings can be used to filter the search results:
example:
```
https://dolphin-app-h86ti.ondigitalocean.app/poems?author=李白&fields=title,paragraphs&page=2

```
```
https://dolphin-app-h86ti.ondigitalocean.app/authors?name=李清照
```
Default setting is 20 items on each page, except route / 40 items on each page.

## More functions in planning:
- Add a frontend user-friendly application so that user can collect the favorite poems and songs.
- Add a functionality to use the characters in poems and songs to generate meaningful and beautiful names.


