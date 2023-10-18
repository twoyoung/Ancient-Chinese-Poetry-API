# Chinese-Poetry-API

This is a simple API that user can get Chinese ancient poetries.

database: MongoDB
technical stack: Node.js, ExpressJS, Mongoose

Different models are created based on the gerne because poetries and songs as different gernes have different structures.
A list of the models (collections):
- Poetry
- Song
- Author

Available routes:
/: get all the poetry and songs 
/random: get a random poetry or song from database
/
