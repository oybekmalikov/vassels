const adminData = [{ dataValues: {id:1,email:"palonchi",is_creator:false} }];

const payload = {
  id: adminData[0].dataValues.id,
  email: adminData[0].dataValues.email,
  role: adminData[0].dataValues.is_creator ? "creator" : "admin",
};
console.log(payload)