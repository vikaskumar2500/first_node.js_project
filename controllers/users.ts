import { Response, Request, NextFunction } from "express";
import { Users } from "../models/schema";

export const getAdduser = (req: Request, res: Response, next: NextFunction) => {
  return res.redirect("/");
};

export const postAdduser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Users.create({ ...req.body });
  res.redirect("/");
};

export const getEdituser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  // const data = await users.findOne({
  //   where: {
  //     id: userId,
  //   },
  // });
  // res.render("admin/edit-user", {
  //   pageTitle: "Edit users",
  //   path: "/admin/edit-user",
  //   formsCSS: true,
  //   userCSS: true,
  //   activeAdduser: true,
  //   user: data,
  // });
};

export const postEdituser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // await users.update(
  //   { title, imageUrl, price, description },
  //   { where: { id: userId } }
  // );
  // await Carts.update(
  //   { title, imageUrl, price, description },
  //   { where: { userId } }
  // );

  res.redirect("/");
};

export const postDeleteuser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.userId;
  console.log(id);
  // await users.destroy({ where: { id: userId } });
  // await Carts.destroy({ where: { userId } });
  await Users.destroy({ where: { id: id } });
  res.redirect("/");
};
export const getDeleteuser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.redirect("/");
};

export const getusers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await Users.findAll();
  res.json(data);
};
