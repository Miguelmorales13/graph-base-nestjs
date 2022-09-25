import { GeneralModel } from "./General.model";

export interface ISequelizeCrudService<P extends GeneralModel<any>, C = any, U = any> {
  create(itemCreate: C): Promise<P>;

  findAll(): Promise<P[]>;

  findOne(id: number): Promise<P>;

  update(id: number, itemUpdate: U): Promise<P>;

  remove(id: number): Promise<number>;
}
