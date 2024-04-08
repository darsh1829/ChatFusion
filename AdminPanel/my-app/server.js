const express = require('express');
const admin = require('./services/firebaseAdmin'); 
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json()); 

app.get('/allUsers', async (req, res) => {
  try {
    let users = [];
    let nextPageToken;
    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      users = users.concat(listUsersResult.users.map(userRecord => {
        return {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          lastSignInTime: userRecord.metadata.lastSignInTime,
          creationTime: userRecord.metadata.creationTime,
          disabled: userRecord.disabled
        };
      }));
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    
    res.json({ users });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/totalUsers', async (req, res) => {
  try {
    let totalUsers = 0;
    let listUsersResult = await admin.auth().listUsers();
    totalUsers = listUsersResult.users.length;
    res.json({ total: totalUsers });
  } catch (error) {
    console.error("Failed to fetch total users", error);
    res.status(500).send("Error fetching total users");
  }
});

app.get('/recentSignIns', async (req, res) => {
  try {
    const signInLogsRef = admin.firestore().collection('sign_in_logs');
    const snapshot = await signInLogsRef.orderBy('timestamp', 'desc').limit(10).get();
    const recentSignIns = snapshot.docs.map(doc => doc.data());
    res.json({ recentSignIns });
  } catch (error) {
    console.error('Error fetching recent sign-ins:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.delete('/deleteUser/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send({ success: true, message: `User ${uid} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/updateUser', async (req, res) => {
  const { uid, email, password, displayName } = req.body;
  try {
    const userRecord = await admin.auth().updateUser(uid, {
      email: email,
      password: password,
      displayName: displayName
    });
    res.status(200).send({ success: true, message: `User ${uid} updated successfully.`, userRecord: userRecord });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ success: false, message: 'Failed to update user.' });
  }
});

app.post('/toggleUserStatus', async (req, res) => {
  const { uid, disabled } = req.body; 

  try {
    await admin.auth().updateUser(uid, { disabled });
    res.status(200).json({ success: true, message: `User status updated successfully.` });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle user status.' });
  }
});

app.post('/createUser', async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    res.status(200).send({ success: true, uid: userRecord.uid, email: userRecord.email, displayName: userRecord.displayName });
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).send({ success: false, message: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
