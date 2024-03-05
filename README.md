npm install mongoose body-parser bcrypt ejs

//index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin_user_db', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// User schema
const userSchema = new mongoose.Schema({
username: { type: String, required: true },
password: { type: String, required: true },
role: { type: String, required: true, default: 'user' }
});

// User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for user login
app.post('/login', async (req, res) => {
const { username, password } = req.body;

// Find user in the database
const user = await User.findOne({ username });

if (!user) {
return res.status(404).send('User not found');
}

// Compare passwords
const validPassword = await bcrypt.compare(password, user.password);

if (!validPassword) {
return res.status(400).send('Invalid password');
}

// Redirect based on user role
if (user.role === 'admin') {
res.redirect('/admin');
} else {
res.redirect('/user');
}
});

// Route for admin page
app.get('/admin', (req, res) => {
res.render('admin', { username: req.query.username });
});

// Route for user page
app.get('/user', (req, res) => {
res.render('user', { username: req.query.username });
});

// Set up view engine and start server
app.set('view engine', 'ejs');
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

//admin.ejs

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Page</title>
</head>
<body>
    <h1>Welcome <%= username %>!</h1>
    <p>This is the admin page.</p>
</body>
</html>

// user.ejs
                       


<script>
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', async (ev) => {
            ev.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;


            const response = await axios.post('/login', {
                username,
                password
            });


            if (response.ok) {
                const data = await response.json();
                const token = data.token;


                const profileResponse = await axios.get('/profile', {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    }
                });
                
                console.log(profileResponse);


            } else {
                console.error(response.statusText);
            }
        });
    </script>
                    



                    <!-- <h1>Welcome <%= username %>!</h1> -->