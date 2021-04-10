import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date?: number;

  @Column()
  end_date?: string;

  @Column()
  expected_return_date: Date;

  @Column()
  total?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
