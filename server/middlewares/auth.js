import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme tokeni eksik' });
    }

    // Token doğrulama
    const decodedData = jwt.verify(token, 'emre-secret-key');
    req.userId = decodedData?.id;

    next(); // İşleme devam et
  } catch (error) {
    // Hata durumunda yanıt döndür
    console.log(error)
  }
};

export default auth;
