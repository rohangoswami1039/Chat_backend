const admin = require("firebase-admin");
//const serviceAccount = require("./firebase_sdk.json");
const serviceAccount = {
  type: "service_account",
  project_id: "chatbackend-328a4",
  private_key_id: "2108ce39c646532d9d0a45b26328be9cf39adbec",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcjN4D9KxOlVjX\nUKfIC1bYFo6sA9rIThYlHwrRnHOFVkRCgTPkk1o8qTytxHW09Wm5/vUU5HOszHRj\n9CObegXqNnhJPIitUgPfEUGGtaur07qHQcGhZuGttKQASuw3w0BLzNydD45Fcvsi\nTNOcrq5HTeLRnC5/yCpjEq5MDpkoiSYE7QejlPasdJ+R9gqDElbrHWQjTJmmVdFM\n4pdoVVZGJwefjdQTR6cBx8ocrIUuND4/aoAl/4FBNoq8/NF6ASvfC2Txu6xGiq/R\n7YyYmaPkmyYhrKBiPcJMZXxYlHemy45iPUCXOKyrgVsAIHhspAhpceU2pjK1jxVA\nwYAxvYVxAgMBAAECggEAFxE/rowJLqwdct6Y1mZrVbxfKfQIcw7kfvRHwxKfSASp\n2rXQiGv49irGvOEPqgomWch6Yul1rP7UYJ0K+SAeCoCbsUjo58cHuIEBq4CN6uvw\nFnmHN0niU5bkOoHPtDjCOtkVIdR2tX+HhyqUXMg1eF6+3v15MY10R3Rrd9wHz9vI\njoN2D9tSofU8jaS355a74Km3oVJKqt51Lqnkj6XPFInxPlwkyDCyjGfTgRqyM2jz\nkjvOCy2xPPvDSO9wUjv4QCBMxtT1j9qiimar5J5yGmuLIsHKcJqMcWbNyq4Ez3Lo\nt+f1xpIMSVQUIY7gWno753gxX7yhT3B+w+dN87pJNQKBgQDRc4Eq2ctMEmr280U0\nac27OXE0mD55D8qnrfreILsk4eyoQpMHNh1FUc1dyrcpFjtftBFmoS7zUFi3cL4G\nlmDRA1QUJJErYU7wKlJRbhIANrBqgboXuzzspyUukQYjV6d6JCUWc+pl01wuPQT8\nStgYbpAEVXEGuiKbzrI8zSQdpQKBgQC/V59eihZfjRxoVG3e85ZJRv54skWoyQqv\n9pyCUR2/yYI6FQqR5Z27u3yiwptvv3pWeiIT2k2SK9MaA7b5qVEQZVkJGg1JJLFo\nxHNAwIVTvf3HYXBZ+Jua5ObT3gc3CVCEwXWxixcdAh0ySSy0mHCKdhx9TbZ8cdKE\n37/UeyjW3QKBgHgoODi5+zvn8P887j20WPcIbB5NHMHcwljRoXKe+l2dUmPw1WI0\ntDQZSqR87/idLXCo37atzz58oHiUMB+dU2t06l4n4DQvvdZfoRvf9mmy9iATzgth\nOgFVnioJvqi113lllPU9iIHj8CUCkoKd+TyC6RHjZlUCoWoa+PuSgB6VAoGAMTi+\nM5i8NqpbQ29ssCzjXUhZD/10M/47tJZxHoj1aS/SQ1TEWlHCKNgLMOd1CuMr+nEC\nsS64Q8DoVkncWQ84XkpkBBZiko1Q4g2fRGoCIk++p/ql508v4EHAK4JzQrIvt2b4\n+so4EOtJTXVLfc21LblCjO1f41V4fVv9whBIqjUCgYAkHBJESaSfS5WxaBF9QhJR\nNEmWk0g1TnCjfPakTK1kkjBbxdwWDqSPD4ZZfDGYd93dimfTAtOflCCd3h5KpIB8\nRT9iT7rTT2sYc2v8dyjrTjQueyNp3unserC2O62c93ckL3z1fgrVLADg2sKVSpqo\nFswFU0B7UABZICzw6dKsFA==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-ps2tl@chatbackend-328a4.iam.gserviceaccount.com",
  client_id: "111504843550584163317",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ps2tl%40chatbackend-328a4.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

//const serviceAccount = require("../../../../etc/secrets/firebase_sdk.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
module.exports = auth;
