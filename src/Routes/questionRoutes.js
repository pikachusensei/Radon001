import express from "express";
import { getCompanies } from "../controllers/questionController.js";
import { getTopicsByCompany } from "../controllers/questionController.js";
import { getQuestionsByCompanyAndTopic } from "../controllers/questionController.js";

const router = express.Router();

router.get("/getCompanies", getCompanies);
router.get("/getTopics",getTopicsByCompany);
router.get("/getQuestions",getQuestionsByCompanyAndTopic);
export default router;
