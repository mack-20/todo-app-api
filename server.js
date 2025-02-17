const app = require('./app')

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on http://127.0.0.1:3000')
})