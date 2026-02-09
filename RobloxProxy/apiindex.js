const axios = require('axios');

module.exports = async (req, res) => {
  // بنجيب الرابط من الباراميترز زي ما كنا بنعمل
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing 'q' parameter. Example: ?q=https://roblox.com..." });
  }

  try {
    // بنعمل الطلب لروبلوكس
    const response = await axios.get(q, {
      headers: {
        // بنحط User-Agent عشان روبلوكس مايعرفش انه بوت
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    // بنرجع النتيجة للملف اللوا بتاعك
    res.status(200).json(response.data);

  } catch (error) {
    // لو حصل خطأ بنرجع تفاصيله
    res.status(500).json({
      error: "Failed to fetch",
      details: error.message,
      roblox_response: error.response ? error.response.data : null
    });
  }
};