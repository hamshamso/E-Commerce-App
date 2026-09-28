import User from "../models/user.js";

const getAllUsers = async(req,res) => {
  try {
  const allUsers = await User.find({},{name:1, email:1, phone:1, role:1, createdAt:1, lastLogin:1})
  
    if(allUsers.length != 0){
      return res.status(200).json({success:true,allUsers, msg:"Succefully getall users"})
    }
    return res.stauts(404).json({success:false,msg:"No users found"})
  } catch (error) {
    return res.status(500).json({success:false, error})
  }
}

const getUsersStatistics = async (req,res) => {
  const now = new Date();//new Date(2026, 8, 27, 16, 30, 0) = 2026/8/27 16:30:00
  //                                                   Get te last month | Is the first day
  const startOfLastMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth() - 1, 1))//Date of first day in last month 
  const endOfLastMonth = new Date(Date.UTC((now.getFullYear(), now.getMonth(), 0, 23, 59, 59)))//Day of end of last month

  try {
    const activeUsersCount = await User.countDocuments({
      lastLogin: {
        $gte: startOfLastMonth
      }
    });
    const unactiveUsersCount = await User.countDocuments({
      lastLogin: {
        $lt: startOfLastMonth
      }
    });
    const nbOfUsers = await User.countDocuments()
    const nbNewUsers = await User.countDocuments({
        createdAt:{
            $gte:startOfLastMonth,
            $lte: endOfLastMonth
        }
    });

    return res.status(200).json({
            success: true,
            msg: "Acitve and unactive users  and number of all users and new users",
            activeUsersCount, unactiveUsersCount, nbOfUsers, nbNewUsers})
    }catch (error) {
    console.error("Failed to load active users", error);
    return res.status((500).json({success: false, msg: "Something went wrong" }))
  }
};

export { getAllUsers, getUsersStatistics}
