<h1 align="center">
  World Cup
</h1>
<p align="center">
  <img src="./.screens/code.png" alt="world cup" title="world cup"/>
</p>


# 💻 Project
<p>
World Cup: é um App para criar bolões e dá palpites para os jogos da copa do mundo.
</p>

##  ✨ Technologies used
  - [Node](https://nodejs.org)
  - [Typescript](https://www.typescriptlang.org)
  - [Fastify](https://www.fastify.io/)
  - [Prisma](https://www.prisma.io/)

# 🚀 How to run
## Install dependencies
  yarn install

## create the tables in the database
  npx prisma migrate

## Run the app
  yarn dev

### Request

<p>Auth</p>

```bash
POST /users
```
<span>Datas</span>

```bash
	{
	  "access_token": "ya29.a0AeTM1if4Bqr2RZjK8HTvW_u6NwvV2hNFFOaLDV2UvIH_OivCrG7EiKEyk8BngM9-aslRTnMT_NbQnoF_8d7cSj7BM1VGamFoEW4jX     TODyyPs8gu6d14mSw75Nj6FuA6T_0krQ6K0lnp--NXNhWOZs8tSLz6p1QaCgYKAZgSAQ8SFQHWtWOmV8RE5dU3wJy03Qu8zrfxyQ0165"
  }
``` 

<span>Get user</span>

```bash
GET /me
``` 
<span>Count user</span>
```bash
GET /users/count
```

<p>Polls</p>

```bash
POST /pools
```
<span>Datas</span>
```bash
{
	"title": "Friends"
}
```
<span>List Polls</span>
```bash
GET /pools/:game_id/games
```
<span>Get Poll</span>
```bash
GET /pools/:pool_id
```
<span>Count Poll</span>
```bash:
GET /pools/:pool_id/games
```

<p>List Games</p>

```bash
GET /pools/:pool_id/games
```

<p>Guesses</>

```bash
POST /pools/:pool_id/games/:game_id/guesses
```
<span>Datas</span>
```bash
{
	"firstTeamPoints": 2,
	"secondTeamPoints": 1
}
```
<span>Count Guesses</span>
```bash
GET /guesses/count
```

## 📄 Licença

This project is under the MIT license. See the file [LICENSE](LICENSE.md) for more details
