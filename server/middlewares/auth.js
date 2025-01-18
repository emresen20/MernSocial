import jwt from 'jsonwebtoken';

const auth = (req, res, next) => { //authorizationda baerer token kullanarak işlemlerimiizi gerçekkleştirdiğimizden dolayı headerste token bilgisi yüklü olmalı
  //kullancı bilgisini artık diğer fonksiyonlarımıza da aktarmış olduk
  
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme tokeni eksik' });
    }

    // Token doğrulama
    const decodedData = jwt.verify(token, 'emre-secret-key'); //token doğrulama
    req.userId = decodedData?.id; // isteğin içerisine userId bilgisini aktarıyoruz

    next(); // İşleme devam et token yok ise dönemez
  } catch (error) {
    // Hata durumunda yanıt döndür
    console.log(error)
  }
};

export default auth;
