// pages/api/allUsers.js
import admin from '../../services/firebaseAdmin'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
      
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
