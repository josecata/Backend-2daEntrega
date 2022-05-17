import mongoose from "mongoose";
import config from "../../configs/config.js";

try {
    mongoose.connect(config.mongoDb.url, config.mongoDb.options)
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error)
};


class ProdMongoController {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    async save(element) {
        try {
            
            const carrito = { id: this.container.length + 1, timestamp: Date.now(), productos: [] }
            element.timestamp = new Date().toISOString();
            const newElement = new this.collection(element);
            const result = await newElement.save();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

      getAll = async ()=> {
        try {
            const elements = await this.collection.find();
            console.log(elements);
            return elements;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return await this.collection.findById({ _id: id });
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateById(id, element) {
        try {
            const result = await this.collection.findByIdAndUpdate({ _id: id }, element);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {

            const result = await this.collection.findByIdAndDelete({ _id: id });
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            const result = await this.collection.deleteMany({});
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProdMongoController;
