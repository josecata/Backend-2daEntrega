
import admin from "firebase-admin";

import serviceAccount from "../configs/backendcoder-8133d-firebase-adminsdk-fmjb3-4a3f0cfda2.js";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

class firebaseController {

    constructor() {
        this.db = db;
        this.query = db.collection('products');
    }
    
    save = async (element) => {
        try {
            const elements = await this.getAll();
            if (elements.length == 0) {
                element.id = 1;
            } else {
                element.id = elements[elements.length - 1].id + 1;
            }
            element.timestamp = new Date().toISOString()
            let doc = this.query.doc()
            await doc.create(element)
            return doc.id
        } catch (err) {
            console.log(err)
            throw new Error('falla en el guardado')
        }
    }

    getAll = async () => {
        try {
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs
            const response = docs.map((doc) => (doc.data()))
            return response
        } catch (err) {
            console.log(err)
            throw new Error('no se pudo obtener los productos')
        }
    }

    getById = async (id) => {
        try {
            console.log(id)
			const doc = this.query.doc(`${id}`)
			const item = await doc.get()
			return item.data()
		} catch (err) {
			console.log(err)
			throw new Error('Error pidiendo los datos')
		}
    }

    updateById = async (newElement, id) => {
        try {
            const product = this.getById(id)
            const toModify = this.query.doc(`${id}`)
            if (product != undefined) {
                if (newElement.nombre != undefined || '') {
                    await toModify.update({
                        nombre: newElement.nombre,
                    })
                }
                if (newElement.descripcion != undefined || '') {
                    await toModify.update({
                        descripcion: newElement.descripcion,
                    })
                }
                if (newElement.url != undefined || '') {
                    await toModify.update({
                        url: newElement.url,
                    })
                }
                if (newElement.precio != undefined || '') {
                    await toModify.update({
                        precio: newElement.precio,
                    })
                }
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
            throw new Error('Error updating')
        }
    }

    deleteById = async (id) => {
        try {
            const productToDelete = this.query.doc(`${id}`)
            if (productToDelete) {
                await productToDelete.delete()
                return true
            } else {
                return false
            }
        } catch {
            throw new Error('Error al borrar el producto')
        }
    }

    deleteAll = async () => {
        try {
            const snapshot = await this.query.get()

            const batchSize = snapshot.size
            const deleteCollection = async (batchSize) => {
                const orderCollections = this.query.orderBy('id').limit(batchSize)

                return new Promise((resolve, reject) => {
                    deleteQueryBatch(resolve).catch(reject)
                })
            }
            const deleteQueryBatch = async (resolve) => {
                if (batchSize === 0) {
                    resolve()
                    return
                }

                const batch = this.db.batch()
                snapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref)
                })
                await batch.commit()

                process.nextTick(() => {
                    deleteQueryBatch(resolve)
                })
            }

            deleteCollection(batchSize)
        } catch {
            throw new Error('Error borrando')
        }
    }
}

export default firebaseController;