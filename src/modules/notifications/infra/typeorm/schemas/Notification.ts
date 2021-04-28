import {ObjectID, Entity, Column,Index, CreateDateColumn, UpdateDateColumn, ObjectIdColumn} from "typeorm"

@Entity("notifications")
class Notification{
  @ObjectIdColumn()
  id: ObjectID;
  //create index
  //@Index({})
  @Column()
  content: string;
  
  @Column('uuid')
  receipt_id: string;
  
  @Column()
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export {Notification}