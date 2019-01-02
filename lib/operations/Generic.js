class GenericOperations {
    constructor(name, model) {
        this.modelName = name;
        this.Model = model;
    }

    async create(data, { populate } = {}) {
        const instance = new this.Model(data);
        await instance.save();

        if (populate) {
            await instance.populate(populate).execPopulate();
        }

        return instance;
    }

    async findOne(conditions, { select, populate } = {}) {
        const instance = await this.Model.findOne(conditions)
            .select(select)
            .populate(populate)
            .exec();

        if (!instance) {
            throw new Error(`${this.modelName} not found`);
        }

        return instance;
    }

    async findById(id, { conditions, select, populate }) {
        const allConditions = Object.assign({}, conditions, { _id: id });
        return this.findOne(allConditions, { select, populate });
    }

    async list(conditions = {}, { select, populate } = {}) {
        return this.Model.find(conditions)
            .populate(populate)
            .select(select)
            .exec();
    }

    async update(id, updates, { select, populate, conditions } = {}) {
        const allConditions = Object.assign({}, conditions, { _id: id });
        const instance = await this.Model.findOneAndUpdate(allConditions, { $set: updates }, { new: true })
            .select(select)
            .populate(populate)
            .exec();

        if (!instance) {
            throw new Error(`${this.modelName} not found`);
        }

        return instance;
    }

    async markDeleted(id, { select, populate, conditions } = {}) {
        return this.update(id, { deleted: true }, { conditions, select, populate });
    }

    async remove(id) {
        const instance = await this.Model.findByIdAndRemove(id).exec();
        if (!instance) {
            throw new Error(`${this.modelName} do not exist`);
        }
        return instance;
    }
}

module.exports = GenericOperations;
