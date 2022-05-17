import admin from 'firebase-admin'

import serviceAccount from './backendcoder-8133d-firebase-adminsdk-fmjb3-4a3f0cfda2.js'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const config = {
    mongoDb: {
        url: 'mongodb+srv://MarcosLabra:34851809a@coderback.pfiz1.mongodb.net/ecommerce?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    fileSystem: {
        dirProducts: './src/controllers/files/productos.json',
        dirCarts: './src/controllers/files/carts.json'
    },
}

export default config;