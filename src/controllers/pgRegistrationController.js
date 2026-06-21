const mongoose = require("mongoose");
const { RegistrationModel } = require("./../models/pgRegistrationModel");

const pgRegistrationController =  async (req, res) => {
  // fetch pg_name, pg_owner, pg_status => active/inactive, pg_ratings,
  // pg_type => MALE, FEMALE, BOTH, pg_state, pg_country, pg_latitude, pg_longitude
  const validateData = req.body;
  try {
    const model = await RegistrationModel.create(validateData);
    await model.save();

    res.send({ data: model });
    return 
  } catch (error) {
    res.status(500).json({ errorCode: "500", message: error.message });
    return;
  }
};

const pgListAllController = async (req, res) => {
  try {
    const pgResult = await RegistrationModel.find();

    return res.send({ data: pgResult });
  } catch (error) {
    return res.status(500).json({ errorCode: "500", message: error.message });
  }
};

// const pgViewController = () => async (req, res) => {
// };
const pgfinddbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const pgbyid = await RegistrationModel.findById(id).exec();

    return res.send({data: pgbyid});

  } catch (error)  {
    return res.status(500).json({ errorCode: "500", message: error.message });
  }
};
const pgfinddeletebyid = async (req,res) =>{
  const {id}  = req.params;
  const deletebyid = await RegistrationModel.findByIdAndDelete(id).exec();
  res.send({message: 'Deleted successfully'})


}
const updatePgById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPg = await RegistrationModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedPg,
    });
  } catch (error) {return res.status(500).json({ errorCode: "500", message: error.message });};
  }




module.exports = {
  pgRegistrationController,
  pgListAllController,
  pgfinddbyid,
  pgfinddeletebyid,
  updatePgById
};
