import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { response } from "express";

export const register = async (req, res, next) => {
  try {
    const userEmail = await Users.find({ email: req.body.email });
    const userName = await Users.find({ username: req.body.username });
    if (!req.body.username || !req.body.email || !req.body.password) {
      return next(createError(400, "Vui lòng nhập đầy đủ thông tin"));
    }
    if (userEmail.length === 0 && userName.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.status(200).send("User has been created");
    } else {
      console.log("abc");
      return next(
        createError(400, "Email hoặc tên tài khoản này đã được đăng ký")
      );
    }
  } catch (error) {
    next(error);
  }
};
let arr_refreshToken = []
export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (!req.body.username || !req.body.password) {
      return next(createError(400, "Vui lòng nhập đầy đủ thông tin"));
    }
    if (!user) {
      return next(createError(404, "Không tìm thấy tên tài khoản"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Sai tên đăng nhập hoặc mật khẩu"));
    }
    const token = jwt.sign(
      { id: user._id, isadmin: user.isadmin },
      process.env.JWT_ACCESS,
      {expiresIn: '15d'}
    );
    const refresh_token = jwt.sign({id:user._id, isadmin: user.isadmin},process.env.JWT_REFRESH,{expiresIn: '30d'})
    arr_refreshToken.push(refresh_token)
    const { password, isadmin, ...otherDetails } = user._doc;
    res
      .cookie("refresh_token", refresh_token)
      .status(200)
      .json({ details: { ...otherDetails }, isadmin, accessToken: token});
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie('refresh_token')
    arr_refreshToken.filter(token => token !== req.cookies.refresh_token)
    // const token = "";
    // res.cookie("refresh_token", token);
    res.status(200).json("Logout success");
  } catch (error) {
    next(error);
  }
};
export const changePassword = async (req, res, next) => {
  const user = await Users.findOne({ _id: req.user.id });
  try {
    if(req.body.oldpassword === "" || req.body.newpassword === "" || req.body.confirmpassword ==""){
      return next(createError(400, "Vui lòng điền vào các mục"));
    }
    const checkOldPassword = await bcrypt.compare(
      req.body.oldpassword,
      user.password
    );
    if (!checkOldPassword) {
      return next(createError(400, "Mật khẩu hiện tại không chính xác"));
    }
    if(req.body.newpassword !== req.body.confirmpassword){
      return next(createError(400, "Mật khẩu mới không khớp"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newpassword, salt);
    const newpass =  await Users.findByIdAndUpdate(user._id,{password: hash})
    res.status(200).json(newpass)
  } catch (error) {
    next(error);
  }
};
export const refreshToken = async (req,res,next) =>{
  try {
    const refresh_token = req.cookies.refresh_token
    console.log(refresh_token)
    if(!refresh_token) return res.status(401).json('You are not authenticated')
    console.log(arr_refreshToken.includes(refresh_token))
    if(!arr_refreshToken.includes(refresh_token)){
      return res.status(403).json('Refresh token is not valid')
    }
    jwt.verify(refresh_token, process.env.JWT_REFRESH,(err,user)=>{
      if(err) console.log(err)
      arr_refreshToken = arr_refreshToken.filter(token=> token !== refresh_token )
      const newAccessToken =  jwt.sign(
        { id: user._id, isadmin: user.isadmin },
        process.env.JWT_ACCESS,
        {expiresIn: '1d'}
      );
      const newRefreshToken = jwt.sign({id:user._id, isadmin: user.isadmin},process.env.JWT_REFRESH,{expiresIn: '30d'})
      arr_refreshToken.push(newRefreshToken)
      res
      .cookie("refresh_token", newRefreshToken)
      .status(200).json({accessToken: newAccessToken})
    })
 
  } catch (error) {
    next(error)
  }
}
