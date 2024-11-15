const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// Cấu hình các thông tin VNPay
const config = {
  vnp_TmnCode: process.env.vnp_TmnCode,
  vnp_HashSecret: process.env.vnp_HashSecret,
  vnp_Url: process.env.vnp_Url,
  vnp_ReturnUrl: process.env.vnp_ReturnUrl,
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

// Endpoint tạo URL thanh toán
router.post("/create_payment_url", (req, res) => {
  const { amount, orderInfo, orderType, locale, bankCode } = req.body;
  const date = new Date();
  const vnp_OrderId = date.getTime().toString();
  const vnp_TxnRef = vnp_OrderId;

  let params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: config.vnp_TmnCode,
    vnp_Amount: amount * 100,
    vnp_CurrCode: "VND",
    vnp_TxnRef: vnp_TxnRef,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Locale: locale || "vn",
    vnp_ReturnUrl: config.vnp_ReturnUrl,
    vnp_IpAddr: req.ip,
    vnp_CreateDate: date
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14),
  };
  params = sortObject(params);

  let querystring = require("qs");
  let signData = querystring.stringify(params, { encode: false });
  let hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  params["vnp_SecureHash"] = signed;

  let paymentUrl = `${config.vnp_Url}?${querystring.stringify(params, {
    encode: false,
  })}`;
  res.json({ paymentUrl });
});

router.get("/payment_return", (req, res) => {
  const queryParams = req.query;
  const info = queryParams.vnp_OrderInfo.split("_");
  // Kiểm tra secure hash và xử lý trạng thái thanh toán
  // Tùy chỉnh phản hồi cho frontend sau khi thanh toán thành công hoặc thất bại
  const url = `http://localhost:3000/payment-result?status=${
    queryParams.vnp_ResponseCode === "00" ? "success" : "failed"
  }&username=${info[0]}&project=${info[1]}&amount=${
    Number(queryParams.vnp_Amount) / 100
  }`;
  res.redirect(url);
});

module.exports = router;
