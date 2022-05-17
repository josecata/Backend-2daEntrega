import 'dotenv/config'

// import admin from 'firebase-admin'

// import serviceAccount from './firebaseKey.json'

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// })

// const db = admin.firestore()

let productsDao
let cartDao

switch (process.env.PERSISTENCIA) {
	case 'json':
		const { default: fileDaoCarts } = await import('../daos/carts/fileDaoCarts.js')
		const { default: fileDaoProducts } = await import('../daos/products/fileDaoProducts.js')

		cartDao = new fileDaoCarts()
		productsDao = new fileDaoProducts()
		break
	case 'mongodb':
		const { default: mongoDbDaoCarts } = await import('./carts/mongoDbDaoCarts.js')
		const { default: mongoDbDaoProducts } = await import('./products/mongoDbDaoProducts.js')

		cartDao = new mongoDbDaoCarts()
		productsDao = new mongoDbDaoProducts()
		break
	case 'firebase':
		const { default: firebaseDaoCarts } = await import('./cart/firebaseDaoCarts.js')
		const { default: firebaseDaoProducts } = await import('./products/firebaseDaoProducts.js')

		cartDao = new firebaseDaoCarts()
		productsDao = new firebaseDaoProducts()
		break
	default:
		const { default: memoryDaoCarts } = await import('../daos/carts/memoryDaoCarts.js')
		const { default: memoryDaoProducts } = await import('../daos/products/memoryDaoProducts.js')

		cartDao = new memoryDaoCarts()
		productsDao = new memoryDaoProducts()
		break
}

export { productsDao, cartDao }