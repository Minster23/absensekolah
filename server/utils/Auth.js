const KoaRouter = require('koa-router');
const router = new KoaRouter();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('your_secret_key');
const pool = require('../database/db');


router.post('/Login', async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    if(username.length > 0 && password.length >0){
      const userAuth = await pool.query('SELECT * FROM siswa WHERE Nama = ? AND Password = ?', [username, password]);
      if (userAuth.length > 0) {
  
        // Encrypt the username and password
        const encryptedUsername = cryptr.encrypt(username);
        const encryptedPassword = cryptr.encrypt(password);
  
        // Return the encrypted values as a response
        await pool.query('UPDATE siswa SET Token = ? WHERE Nama = ?', [encryptedUsername, username]);
        ctx.body = {
          encryptedUsername,
          encryptedPassword
        };
        
      }else{
        ctx.status = 401;
        ctx.body = {
          message: "Siswa tidak ada",
        };
      }
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Error reciving login",
    };
  }
});

router.post('/verify', async (ctx) => {
  // Extract encrypted username and password from the request body
  const { encryptedUsername, encryptedPassword } = ctx.request.body;

  // Decrypt the username and password
  const decryptedUsername = cryptr.decrypt(encryptedUsername);
  const decryptedPassword = cryptr.decrypt(encryptedPassword);
  const checkToken = await pool.query('SELECT * FROM siswa WHERE Token = ?', [encryptedUsername]);
  if(checkToken.length > 0 ){
    ctx.body = {
      decryptedUsername,
      decryptedPassword,
      isLogin: true
    };
  }
});

router.post('/getInfo', async (ctx) => {
  // Extract encrypted username and password from the request body
  const { encryptedUsername, encryptedPassword } = ctx.request.body;
  const checkToken = await pool.query('SELECT Nama, Kelas FROM siswa WHERE Token = ?', [encryptedUsername]);
  if(checkToken.length > 0 ){
    const nama = checkToken[0].Nama
    const kelas = checkToken[0].Kelas
    ctx.body = {
      nama,
      kelas,
      isLogin: true
    };
  }
});

router.post('/absen', async (ctx) => {
  const { encryptedUsername, absen } = ctx.request.body;
  if(absen && encryptedUsername.length > 0){
    const AbsenUpdate = await pool.query('UPDATE siswa SET Absen = ? WHERE Token = ?', ['Masuk', encryptedUsername]);
    if(absen && AbsenUpdate){
      const absenCheck = await pool.query('SELECT Absen FROM siswa WHERE Token = ?', [encryptedUsername]);
      const Status = absenCheck[0].Absen;
      if(absenCheck[0].Absen == 'Masuk'){
        ctx.body = {
          message:"Absen berhasil",
          Status,
          setAbsen: true
        };
      }
    }
  }else{
    ctx.body = {
      message:"Absen Gagal",
      setAbsen: false
    };
  }
});

// Export the router
module.exports = router;