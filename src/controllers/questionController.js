import questionModel from "../models/questionModel.js";

export const getCompanies=async(req,res)=>{
  try {
    const companies=await questionModel.distinct("company");
    res.json({companies});
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
}

export const getTopicsByCompany=async(req,res)=>{
  try {
    const {company}=req.query;//as we send from frontend in query string the company
    const companyTrimmed=company?.trim();
    const topics=await questionModel.distinct("topic",{company:companyTrimmed});
    res.json({topics});
  } catch (error) {
    res.status(500).json({ message: "Error fetching topics", error: error.message });
  }
}

export const getQuestionsByCompanyAndTopic =async(req,res)=>{
  try {
    let { company, topic, page = 1, limit = 1 } = req.query;
    company=company?.trim();
    topic=topic?.trim();
    if(!company || !topic) return res.status(400).json({message:"Company and topic are required"});
    
    const questions=await questionModel.find({company,topic}).skip((page-1)*limit).limit(parseInt(limit));
    const total = await questionModel.countDocuments({ company, topic });
    res.json({ questions, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
}