import axios from "axios";
import "dotenv/config";

export default async function sendReply(
  phone,
  message,
  sessionId = process.env.DEFAULT_SESSION_ID
) {
  const apiUrl = `${process.env.WAPI_DOMAIN}/send-message`;

  try {
    const res = await axios.post(
      apiUrl,
      {
        phoneNumber: phone,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
      }
    );

    console.log(`✅ Balasan terkirim ke ${phone}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Gagal kirim balasan ke ${phone}:`, err.message);
    return null;
  }
}
