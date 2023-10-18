# Chinese-Poetry-API

This is a simple API that user can get Chinese ancient poetries.

database: MongoDB
technical stack: Node.js, ExpressJS, Mongoose

Different models are created based on the gerne because poetries and songs as different gernes have different structures.

## A list of the models (collections):
- Poetry
- Song
- Author

## Available routes:
- /: get all the poetry and songs 
- /random: get a random poetry or song from database
- /poems: get all poems
- /songs: get all songs
- /authors: get all authors

## Query strings can be used to filter the search results:
example:
```
/poems?author=李白&fields=title,paragraphs&page=2

```
Default setting is 20 items on each page, except route / 40 items on each page.


