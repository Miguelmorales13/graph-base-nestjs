import { ISequelizeCrudService } from "./i-sequelize-crud-service";
import { FindOptions } from "sequelize";
import { GeneralModel } from "./General.model";
import { SequelizeException } from "../exceptions/sequelize.exception";

export class SequelizeCrudService<P extends GeneralModel<any>, C = any, U = any> implements ISequelizeCrudService<P, C, U> {
  constructor(private readonly provider: P | any) {
  }


  async create(itemCreate: C): Promise<P> {
    try {
      const itemCreated = await this.provider.create(itemCreate);
      return this.findOne(itemCreated.id);

    } catch (e) {
      console.log(e);
      throw new SequelizeException(e.errors);
    }
  }

  async findAll(options?: FindOptions): Promise<P[]> {
    return await this.provider.findAll(options || null);
  }

  async findOne(id: number, options?: FindOptions): Promise<P> {
    return await this.provider.findByPk(id, options);
  }

  async remove(id: number): Promise<number> {
    return await this.provider.destroy({ where: { id }, limit: 1 });
  }

  async update(id: number, itemUpdate: U): Promise<P> {
    try {
      await this.provider.update(itemUpdate, { where: { id }, limit: 1 });
      return await this.findOne(id);
    } catch (e) {
      throw new SequelizeException(e.errors);
    }
  }

}
