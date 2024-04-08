export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { email, password, secretCode } = req.body;
    const serverSideSecret = process.env.SIGNUP_SECRET_CODE;
  
    //validating secret
    if (secretCode !== serverSideSecret) {
        return res.status(401).json({ error: "401 - Invalid secret code." });
    }
  
    try {
      return res.status(200).json({ success: true, message: "Signup successful" });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ error: "Signup failed" });
    }
  }
  