import usermodel from "../models/auth.model.js";
import { sendmail } from "../services/mail.service.js";
import jwt from 'jsonwebtoken'
import redis from "../config/cache.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const register = async (req, res,next) => {

    try {

        const { username, email, password } = req.body;

        const isuseralreadyexists = await usermodel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isuseralreadyexists) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const verificationLink = `${process.env.BACKLINK}/api/auth/verify/${email}`;

await sendmail({
  to: email,
  subject: "Confirm your email – Khanplexity",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background:#f0efe9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e0e0da;">

        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a; padding:32px 40px 28px;">
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="width:30px; height:30px; background:#fff; border-radius:7px; text-align:center; vertical-align:middle;">
                  <span style="font-size:15px; font-weight:700; color:#0a0a0a;">K</span>
                </td>
                <td style="padding-left:10px;">
                  <span style="color:#fff; font-size:15px; font-weight:500;">Khanplexity</span>
                </td>
              </tr>
            </table>
            <h1 style="margin:0 0 8px; font-size:24px; font-weight:500; color:#ffffff; letter-spacing:-0.4px; line-height:1.25;">
              Confirm your<br/>email address
            </h1>
            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.5); line-height:1.6;">One click and you're in.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 28px; font-size:15px; color:#444; line-height:1.75;">
              Hey there! Thanks for signing up. We just need to make sure this email address belongs to you — tap the button below to verify and get started.
            </p>

            <!-- CTA -->
            <a href="${verificationLink}"
               style="display:block; background:#0a0a0a; color:#ffffff; text-align:center; padding:14px 24px;
                      border-radius:10px; text-decoration:none; font-size:15px; font-weight:500; margin-bottom:20px;">
              Verify my email
            </a>

            <!-- Expiry notice -->
            <p style="text-align:center; font-size:13px; color:#999; margin:0 0 32px;">
              &#9679; &nbsp;This link expires in 24 hours
            </p>

            <hr style="border:none; border-top:1px solid #ebebeb; margin:0 0 28px;" />

            <p style="margin:0; font-size:13px; color:#aaa; line-height:1.7; text-align:center;">
              Didn't sign up for Khanplexity? You can safely ignore this email — nothing will happen.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f7f7f5; border-top:1px solid #ebebeb; padding:24px 40px;">
            <p style="margin:0 0 4px; font-size:14px; color:#555; line-height:1.6;">Thank you for joining us.</p>
            <p style="margin:0; font-size:14px; color:#888; line-height:1.6;">— The Khanplexity team</p>
          </td>
        </tr>

      </table>

      <!-- Below card -->
      <p style="font-size:12px; color:#bbb; margin-top:14px; text-align:center;">
        &copy; 2025 Khanplexity &nbsp;&middot;&nbsp;
        <a href="#" style="color:#bbb; text-decoration:none;">Unsubscribe</a>
      </p>

    </td></tr>
  </table>
</body>
</html>
  `
})


        const user = await usermodel.create({
            username,
            email,
            password
        })


        res.status(201).json({
            success: true,
            message: "User created successfully",
            // user:{
            //     username:user.username,
            //     email:user.email,
            //     isverified:user.isverified
            // }
        })

    } catch (error) {
        next(error);
    }

}

export const verify = async (req, res, next) => {
    try {
        const email = req.params.id;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const loginUrl = "https://khanplexity-ai.onrender.com/login"; // Adjust this to your frontend URL

const htmlResponse = (type) => {
  const states = {
    success: {
      iconBg: "#eaf3de",
      iconStroke: "#3B6D11",
      iconPath: `<polyline points="20 6 9 17 4 12"/>`,
      title: "You're verified",
      subtitle: "Your email has been confirmed.<br/>Your account is ready to go.",
      btnClass: "btn-dark",
      btnText: "Go to login",
      footer: "Thank you for joining us — the Khanplexity team",
    },
    already: {
      iconBg: "#f0efe9",
      iconStroke: "#888780",
      iconPath: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
      title: "Already verified",
      subtitle: "This account is already confirmed.<br/>You can go straight to login.",
      btnClass: "btn-outline",
      btnText: "Go to login",
      footer: "The Khanplexity team",
    },
  };

  const s = states[type];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Khanplexity</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f0efe9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
    }
    .card {
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e0e0da;
      width: 100%;
      max-width: 420px;
      overflow: hidden;
    }
    .header {
      background: #0a0a0a;
      padding: 24px 36px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo {
      width: 28px; height: 28px;
      background: #fff;
      border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 700; color: #0a0a0a;
      flex-shrink: 0;
    }
    .wordmark { color: #fff; font-size: 14px; font-weight: 500; }
    .body { padding: 44px 36px 36px; text-align: center; }
    .icon {
      width: 52px; height: 52px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 24px;
      background: ${s.iconBg};
    }
    h1 {
      font-size: 22px; font-weight: 500;
      color: #0a0a0a;
      letter-spacing: -0.3px;
      line-height: 1.25;
      margin-bottom: 10px;
    }
    p.sub {
      font-size: 14px; color: #888;
      line-height: 1.75;
      margin-bottom: 28px;
    }
    .btn {
      display: block;
      padding: 12px 24px;
      border-radius: 9px;
      font-size: 14px; font-weight: 500;
      text-decoration: none;
      text-align: center;
      transition: opacity 0.15s;
    }
    .btn:hover { opacity: 0.82; }
    .btn-dark  { background: #0a0a0a; color: #fff; }
    .btn-outline { background: transparent; color: #0a0a0a; border: 1px solid #d0d0ca; }
    .footer {
      padding: 18px 36px 22px;
      border-top: 1px solid #ebebeb;
      text-align: center;
    }
    .footer p { font-size: 13px; color: #aaa; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">K</div>
      <span class="wordmark">Khanplexity</span>
    </div>
    <div class="body">
      <div class="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="${s.iconStroke}" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          ${s.iconPath}
        </svg>
      </div>
      <h1>${s.title}</h1>
      <p class="sub">${s.subtitle}</p>
      <a href="${loginUrl}" class="btn ${s.btnClass}">${s.btnText}</a>
    </div>
    <div class="footer">
      <p>${s.footer}</p>
    </div>
  </div>
</body>
</html>`;
};

if (user.isverified) {
  return res.send(htmlResponse("already"));
}

user.isverified = true;
await user.save();

return res.send(htmlResponse("success"));
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ email })

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        if (!user.isverified) {
            return next(new ErrorHandler("User not verified", 401));
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid password", 401));
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token)


        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                isverified: user.isverified
            }
        })
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.token
        res.clearCookie("token")
        redis.set(token, Date.now(), "EX", 60 * 60)

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getme = async (req, res) => {
    try {
        const user = await usermodel.findById(req.user.id);
        res.status(200).json({
            success: true,
            message: "your data fetched successfully",
            user: {
                username: user.username,
                email: user.email,
                isverified: user.isverified
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const resend = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("This user not Exist", 404));
        }
        if (user.isverified) {
            return next(new ErrorHandler("This user already verified", 400));
        }
        const verificationLink = `${process.env.LINK}/api/auth/verify/${email}`;
      await sendmail({
  to: email,
  subject: "Confirm your email – Khanplexity",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background:#f0efe9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e0e0da;">

        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a; padding:32px 40px 28px;">
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="width:30px; height:30px; background:#fff; border-radius:7px; text-align:center; vertical-align:middle;">
                  <span style="font-size:15px; font-weight:700; color:#0a0a0a;">K</span>
                </td>
                <td style="padding-left:10px;">
                  <span style="color:#fff; font-size:15px; font-weight:500;">Khanplexity</span>
                </td>
              </tr>
            </table>
            <h1 style="margin:0 0 8px; font-size:24px; font-weight:500; color:#ffffff; letter-spacing:-0.4px; line-height:1.25;">
              Confirm your<br/>email address
            </h1>
            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.5); line-height:1.6;">One click and you're in.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 28px; font-size:15px; color:#444; line-height:1.75;">
              Hey there! Thanks for signing up. We just need to make sure this email address belongs to you — tap the button below to verify and get started.
            </p>

            <!-- CTA -->
            <a href="${verificationLink}"
               style="display:block; background:#0a0a0a; color:#ffffff; text-align:center; padding:14px 24px;
                      border-radius:10px; text-decoration:none; font-size:15px; font-weight:500; margin-bottom:20px;">
              Verify my email
            </a>

            <!-- Expiry notice -->
            <p style="text-align:center; font-size:13px; color:#999; margin:0 0 32px;">
              &#9679; &nbsp;This link expires in 24 hours
            </p>

            <hr style="border:none; border-top:1px solid #ebebeb; margin:0 0 28px;" />

            <p style="margin:0; font-size:13px; color:#aaa; line-height:1.7; text-align:center;">
              Didn't sign up for Khanplexity? You can safely ignore this email — nothing will happen.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f7f7f5; border-top:1px solid #ebebeb; padding:24px 40px;">
            <p style="margin:0 0 4px; font-size:14px; color:#555; line-height:1.6;">Thank you for joining us.</p>
            <p style="margin:0; font-size:14px; color:#888; line-height:1.6;">— The Khanplexity team</p>
          </td>
        </tr>

      </table>

      <!-- Below card -->
      <p style="font-size:12px; color:#bbb; margin-top:14px; text-align:center;">
        &copy; 2025 Khanplexity &nbsp;&middot;&nbsp;
        <a href="#" style="color:#bbb; text-decoration:none;">Unsubscribe</a>
      </p>

    </td></tr>
  </table>
</body>
</html>
  `
})
        res.status(200).json({
            success: true,
            message: "Verification email sent successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("This user not Exist", 404));
        }
       
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.isotp = otp;
        await user.save();
 
await sendmail({
  to: email,
  subject: "Reset your password – Khanplexity",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background:#f0efe9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e0e0da;">

        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a; padding:32px 40px 28px;">
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="width:30px; height:30px; background:#fff; border-radius:7px; text-align:center; vertical-align:middle;">
                  <span style="font-size:15px; font-weight:700; color:#0a0a0a;">K</span>
                </td>
                <td style="padding-left:10px;">
                  <span style="color:#fff; font-size:15px; font-weight:500;">Khanplexity</span>
                </td>
              </tr>
            </table>
            <h1 style="margin:0 0 8px; font-size:24px; font-weight:500; color:#ffffff; letter-spacing:-0.4px; line-height:1.25;">
              Reset your<br/>password
            </h1>
            <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.5); line-height:1.6;">
              Use the OTP below to continue.
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 28px; font-size:15px; color:#444; line-height:1.75;">
              We received a request to reset your password. Use the one-time password (OTP) below to proceed.
            </p>

            <!-- OTP Box -->
            <div style="text-align:center; margin-bottom:28px;">
              <span style="
                display:inline-block;
                background:#0a0a0a;
                color:#ffffff;
                font-size:28px;
                letter-spacing:6px;
                padding:14px 24px;
                border-radius:12px;
                font-weight:600;
              ">
                ${otp}
              </span>
            </div>

            <!-- Expiry notice -->
            <p style="text-align:center; font-size:13px; color:#999; margin:0 0 32px;">
              &#9679; &nbsp;This OTP expires in 10 minutes
            </p>

            <hr style="border:none; border-top:1px solid #ebebeb; margin:0 0 28px;" />

            <p style="margin:0; font-size:13px; color:#aaa; line-height:1.7; text-align:center;">
              If you didn’t request a password reset, you can safely ignore this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f7f7f5; border-top:1px solid #ebebeb; padding:24px 40px;">
            <p style="margin:0 0 4px; font-size:14px; color:#555; line-height:1.6;">
              Stay secure 🔒
            </p>
            <p style="margin:0; font-size:14px; color:#888; line-height:1.6;">
              — The Khanplexity team
            </p>
          </td>
        </tr>

      </table>

      <!-- Below card -->
      <p style="font-size:12px; color:#bbb; margin-top:14px; text-align:center;">
        &copy; 2025 Khanplexity &nbsp;&middot;&nbsp;
        <a href="#" style="color:#bbb; text-decoration:none;">Unsubscribe</a>
      </p>

    </td></tr>
  </table>
</body>
</html>
  `
})

        res.status(200).json({
            success: true,
            message: "Forgot password email sent successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const verifyotp = async (req, res, next) => {
    try {
        const { otp } = req.body;
        const user = await usermodel.findOne({ isotp: otp });
        if (!user) {
            return next(new ErrorHandler("Invalid otp", 400));
        }
        user.isotp = null;
        await user.save();
        res.status(200).json({
            success: true,
            email:user.email,
            message: "Otp verified successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { password,email } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("This user not Exist", 404));
        }
        user.password = password;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        next(error);
    }
}