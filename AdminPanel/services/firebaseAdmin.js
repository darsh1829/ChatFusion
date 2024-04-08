//Using Firebase SDK for operations managing users
const admin = require('firebase-admin');

const serviceAccount = {
    "type": "service_account",
    "project_id": "chatfusion-9104b",
    "private_key_id": "096d075acf0996fb50509a46cc3802a2708c2b9c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/UqHueuXopapJ\nHsLzF3cSled8Keq/V/NI0GWSLz/T7MIhvO9TepcKdCfGO5rEoxtVOedhD7EWRFa4\n6kM/0Cj2m41oOhYyjboSPrZozua3cr568F2ISTImMLwuFaqfL1Yf7PMXjrayPuw8\nMfIrI4Y9qEcX/nJSSUJPkLq8thluWqEPo9H7tlxunyEEog8GgKxWko5ON8UiAGeH\ne3cN4SgufmrjyklKCok811ita7V6bTK7cW+tcCE64wrHet0jCqQtzQgPAMMPqFiw\nKB+AfAyZyv6ODKJcA7LHY6aB67QkMbJ7s5dvKYVWDL3c+0mY8pKuDM2RX2O5GgSk\nsiQQle+/AgMBAAECggEASVeA8e204slXDO645v1QzRQgCA39ilpJzdjthuuL+U6i\nYNKPoB23du9uK+S/gK/SE4q98wxT42hRIlPTccv3WAnrXFAgIEMKWGIoBOeDtEFN\nWc143XzJt7ApAzWVEa7Qwi5QRfCUgqHyZ2TyI61bkZlHn6AP7RFeVSfzHdJkz1NN\nrULAsl9rNkEz71kpkXIrjEYdAJPU+2QIezuDXNUHDu/ZPZYcD87qLxslLaoOgqTS\n7zJBZL82rMtkhkNncHTaW7swNyui4xclAFd92bfvbOcR//k4jkKOnlvM799k8uBk\najD37cQKtJy9kr4tF8L8lHfWEENYaAlMQ1R6dToweQKBgQD7PhqMTSkUwTGM2DW3\njBKPUsPy5x+jsYmz36i8pRCoWsNrvx+aoIFiM3olaxIU1kxhGg54VIdpOzK5oAV4\nVajb44Pw7cYJyWdIcxcgSQXXEvH8eKaHS20Dt6RXtNZ18RnYClfQHqE8Vj1uZauJ\nEuqOsQpGDf16+B/xy7b6aLoIlQKBgQDC8hFt+0KP2widnSmzakrDxxbPQxhb+lJ9\nAS2bAsy67bxmqvcw/dD9ugW82tloGcGwycwzfOS67vIzkPcVTWeKorKJHsPT6dzA\n4pXmwkKV9IGHdVLxgXCyfxE7ODIKlcyG3qlKqicMdGCYe1GWgE3FnIxh882WwIgQ\n/JOybVT+AwKBgQDwIAoloDWsVX1zPM4ScHjorNUFGms9+5g9530RV74U+jKej1u4\nYMFoRwTuMGhmq+7yO4Iq9bc6F09C5LN1sIEkME5Rfh/yCKGDOCSZQdGoHr5TbEjV\nNHyrueADx53VuarWtgP5sNyvm0k5c0jASOkPmhvUmthyqCV35xkqOd/cBQKBgFIa\nxcB+fHA+HgjT8oZAFDEUnsS4S4Ahk7BWWLDaowNvsVPEWcvmeqkCOfxqZ/pyLqOY\nukpNJcCddqDFQ2tTaHJ5R5x8upl7+5+5Ts0bsBOcIRm+DirtC1wCLG22o0zV/ogn\nK0HpG/0g3rYZ6ijq7NZ3sqBmoIYHnMcaudICPjOlAoGABGGETS/cCFrvGWijB+wt\n+uzbrVE3+AQ8dvkjjkHCYioi+AwW+6eP2KfjfGFBbWsp1ABiu9hwpgqXtzoTLv1A\nklJ3VrpZrgNLNcqfT7Sux+TdDujgSD708zvmZtNsKlV1dqEtW/ykp0UljBp7EM9y\nYw+ojoVbyjM5tJYHe8DpEx8=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ti9b4@chatfusion-9104b.iam.gserviceaccount.com",
    "client_id": "102345241546012854956",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ti9b4%40chatfusion-9104b.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log("Firebase Admin initialized successfully.");
      
      const firestore = admin.firestore();
      console.log("Firestore has been accessed successfully, indicating the Admin SDK was initialized correctly.");
}

module.exports = admin;



