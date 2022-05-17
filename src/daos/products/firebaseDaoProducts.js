import firebaseController from  '../../controllers/firebase/firebaseController.js';


class DaoFirebaseProduct extends firebaseController{
    constructor(db){
        super(db)
    }
}

export default DaoFirebaseProduct