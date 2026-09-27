import User from "../models/User.js";

const getActiveUsersLastMonth = async (req,res) => {
  const now = new Date();//new Date(2026, 8, 27, 16, 30, 0) = 2026/8/27 16:30:00
  //                                                   Get te last month | Is the first day
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)//Date of first day in last month 
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)//Day of end of last month

  try {
    const activeUsersCount = await User.countDocuments({
      lastLogin: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth
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
            msg: "Acitveusers and number of all users and new users",
            data: activeUsersCount, nbOfUsers, nbNewUsers})
  } catch (error) {
    console.error("Failed to load active users", error);
    return res.status(400).json({success: false, msg: "Something went wrong" })
  }
};

export { getActiveUsersLastMonth}