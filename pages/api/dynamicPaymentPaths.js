import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../public/firebase";

export default async function handler(req, res) {

    const {propertyid} = req.headers

    const unpaidCol = query(collection(db, "payments"), where("status", "==", "unpaid"), where("propertyID", "==", propertyid))

    const paths = await getDocs(unpaidCol).then( snapshot => {
        let returnArray = []
        snapshot.forEach(currentItem => returnArray.push({params: {href: currentItem.get("href")}}));
        return returnArray
 })
    res.status(200).json(paths)
//

}