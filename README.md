## Running

Define a file called `.env` in this same directory with the following values:

```bash
AUTH0_DOMAIN=<YOUR_AUTH0_DOMAIN>
AUTH0_AUDIENCE=<YOUR_AUTH0_AUDIENCE>
PORT=3000
HOST=localhost
SSL=false
```

Make sure you replace `<YOUR_AUTH0_DOMAIN>` and `<YOUR_AUTH0_AUDIENCE>` with your own Auth0 values. You can, of course modify the other environment variables as well.

Then, start the server:

```bash
npm start
```

## Testing

```bash
curl -H 'Authorization: Bearer '$ACCESS_TOKEN http://localhost:3000/todo

curl -H 'Authorization: Bearer '$ACCESS_TOKEN -H 'Content-Type: application/json' -d '{
  "item": "Buy pizza"
}' http://localhost:3000/todo

curl -H 'Authorization: Bearer '$ACCESS_TOKEN http://localhost:3000/todo

curl -X DELETE -H 'Authorization: Bearer '$ACCESS_TOKEN -H 'Content-Type: application/json' -d '{
  "index": 0
}' http://localhost:3000/todo

curl -H 'Authorization: Bearer '$ACCESS_TOKEN http://localhost:3000/todo
```
