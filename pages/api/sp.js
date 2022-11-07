import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../public/firebase";

export default async function handler(req,res){

    const {href, propertyid} = req.headers

    const returnArray = []

    const querySnapshot = await getDocs(query(collection(db, "payments"), where("href", "==", href), where("propertyID", "==", propertyid)));
    querySnapshot.forEach((doc) => {
        returnArray.push(doc.data())
    });

    res.status(200).json(returnArray)

}