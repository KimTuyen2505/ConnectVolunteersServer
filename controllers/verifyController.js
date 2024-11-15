const verifyModel = require("../models/verifyModel");
const nodemailer = require("nodemailer");

exports.getAll = (req, res) => {
  verifyModel
    .find()
    .then((data) => {
      res.status(200).json({
        success: true,
        dataVerifies: data,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};

exports.getVerify = async (req, res) => {
  verifyModel
    .findOne({ email: req.params.email })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Verify not found",
        });
      }
      return res.status(200).json({
        success: true,
        dataVerifies: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.addVerify = async (req, res) => {
  const { email } = req.body;

  const verifyCode = Math.floor(100000 + Math.random() * 900000);

  const sender = `Volunteerwork <${process.env.USER_AUTH}>`;
  const subject = "Xác thực tài khoản Volunteerwork";
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Verify Your Email Address</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
            }
            .header h1 {
                margin: 0;
                color: #333333;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content p {
                font-size: 16px;
                color: #666666;
            }
            .verify-code {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                font-size: 12px;
                color: #999999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Xác thực tài khoản</h1>
            </div>
            <div class="content">
                <p>Cảm ơn bạn đã đăng ký tham gia VolunteerWork. Vui lòng sử dụng mã sau để xác minh địa chỉ email của bạn:</p>
                <div class="verify-code">${verifyCode}</div>
                <p>Nếu bạn không yêu cầu xác minh này, vui lòng bỏ qua email này.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Volunteerwork.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  // Configure the mail options object
  const mailOptions = {
    from: sender,
    to: email,
    subject: subject,
    html: htmlContent,
  };

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_EMAIL,
    auth: {
      user: process.env.USER_AUTH,
      pass: process.env.PASS_AUTH,
    },
  });

  // Send the email
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    } else {
      const verify = new verifyModel({
        email,
        verifyCode,
      });
      await verify
        .save()
        .then((data) => {
          return res.status(201).json({
            success: true,
            message: "Created verify successfully",
            data: data,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: error.message,
          });
        });
    }
  });
};

exports.deleteVerify = (req, res) => {
  verifyModel
    .findOneAndDelete({ email: req.params.email }, {})
    .then(() => {
      return res.status(204).json({
        success: true,
        message: "Delete verify successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};
