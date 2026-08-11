import transporter from "../config/email.js";

const sendEmail = async ({to,subject,html})=>{
    try{

        const info = await transporter.sendMail({
            from:`Food Dish"mohink71320@gmail.com"`,
            to,
            subject,
            html
        })

        console.log("email send to this id",info.messageId);
        

    }catch(error){
        console.log(error.message);
        
    }
}

export default sendEmail;