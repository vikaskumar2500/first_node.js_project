import express from "express";

import {
  getEdituser,
  getusers,
  postAdduser,
  postDeleteuser,
  postEdituser,
  getDeleteuser,
} from "../controllers/users";
const router = express.Router();

// /admin/edit-user/:userId => GET
router.get("/edit-user/:userId", getEdituser);

// /admin/edit-user/:userId => POST
router.post("/edit-user/:userId", postEdituser);

router.get("/delete-user/:userId", getDeleteuser);

// /admin/delete-user/:userId => POST
router.post("/delete-user/:userId", postDeleteuser);

// /admin/add-user => GET

// /admin/add-user => POST
router.post("/add-user", postAdduser);

// /admin/users => GET
router.get("/", getusers);

export default router;
