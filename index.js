const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.route('/api/users/:id')
  .get((req, res) => {
    const id1 = Number(req.params.id);
    const user = users.find(user => user.id === id1);
    res.send(user);
  })
  .post((req, res) => {
    const body = req.body;
    const newUser = {
      id: users.length + 1,
      ...body,
    };
    users.push(newUser);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Failed to write to file" });
      }
      return res.json({ status: "success", id: newUser.id });
    });
  })
  .patch((req, res) => {
    res.json({ status: 'pending' });
  })
  .delete((req, res) => {
    res.json({ status: 'pending' });
  });

app.get('/users', (req, res) => {
  const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
  </ul>`;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
