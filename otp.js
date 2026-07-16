(async () => {
  const SECRET = "MY_SECRET_KEY_123"; // Dono browser me same rakho

  async function generateOTP(secret) {
    const encoder = new TextEncoder();

    // 30-second time step
    const counter = Math.floor(Date.now() / 1000 / 30);

    // Counter ko 8-byte ArrayBuffer me convert karo
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setUint32(4, counter);

    // Secret import karo
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    );

    // HMAC generate
    const hmac = await crypto.subtle.sign("HMAC", key, buffer);
    const bytes = new Uint8Array(hmac);

    // Dynamic truncation
    const offset = bytes[19] & 0xf;

    const code =
      ((bytes[offset] & 0x7f) << 24) |
      ((bytes[offset + 1] & 0xff) << 16) |
      ((bytes[offset + 2] & 0xff) << 8) |
      (bytes[offset + 3] & 0xff);

    return String(code % 1000000).padStart(6, "0");
  }

  async function update() {
    const otp = await generateOTP(SECRET);
    const remaining = 30 - (Math.floor(Date.now() / 1000) % 30);

    console.clear();
    console.log("OTP:", otp);
    console.log("Expires in:", remaining, "seconds");
  }

  update();
  setInterval(update, 1000);
})();