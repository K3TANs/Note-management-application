import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    console.log(userId)
    const ntoken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
    const decoded = jwt.verify(ntoken, process.env.JWT_SECRET);
    console.log(";)" , decoded.userId);
    
    
    res.cookie("ntoken", ntoken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    })
}

export default generateTokenAndSetCookie;