import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import UserModel from "../database/models/userModel";
import { comparePassword} from "../utils/password";


export default class loginController {

static login = async (req: Request, res: Response) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const user = await UserModel.findOne({ email: userEmail }).select("+password");
    
    if (user) {
      let userInf = {id: user.id, username: user.username, email: user.email, role:user.role };

      let token = generateToken(userInf);
      let isValidPass = await comparePassword(userPassword, user.password);
      const { password, ...userWithoutPassword } = user.toObject();
      res.setHeader('Authorization', `Bearer ${token}`)
      
      if (isValidPass) {
        return res.status(200).json({
          message: "Login successful",
          token: `${token}`,
          data: userWithoutPassword,
        });
      } 
    } else {
      return res.status(401).json({
        message: `user with ${userEmail} not found`,
        data: null,
      });
    }
};

    
 static googleLogin = async (req: any, res: Response) => {
  try {
    if (!req.user) return res.redirect("/");

    const googleUser = req.user as any;

    const tokenData = {
      id: googleUser.id,
      username: googleUser.username,
      email: googleUser.email,
      role: googleUser.role,
    };

    const token = generateToken(tokenData);
    res.setHeader('Authorization', `Bearer ${token}`);

    res.redirect(`/dashboard?token=${token}`);
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

}
 