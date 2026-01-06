import User from "../../models/User.js";

// GET all companies (only employer role)
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await User.find(
      { role: "employer" }, // filter only employers
      {
        companyName: 1,
        companyWebsite: 1,
        companyDescription: 1,
        industry: 1,
        companySize: 1,
        foundedYear: 1,
      }
    );

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await User.findById(
      req.params.id,
      {
        companyName: 1,
        companyWebsite: 1,
        companyDescription: 1,
        industry: 1,
        companySize: 1,
        foundedYear: 1,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};