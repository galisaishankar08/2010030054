const companyModel = require('../models/companyModel')

module.exports.register = async function(companyName, ownerName, rollNo, ownerEmail, accessCode){
        const existingCompany = await companyModel.findOne({ companyName });
    
        if (existingCompany) {
          return res.status(400).json({ message: "Company already registered" });
        }
    
        if (accessCode !== "FKDLjg") {
          return res.status(400).json({ message: "Invalid access code" });
        }
    
        const clientID = uuidv4();
        const clientSecret = uuidv4();
    
        const newCompany = new companyModel({
          companyName,
          ownerName,
          rollNo,
          ownerEmail,
          clientID,
          clientSecret
        });
    
        return await newCompany.save();
}