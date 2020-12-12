import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  constructor(name: string, key: string, state: any) {
    this.name = name;
    this.key = key;
    this.state = state;
  }
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column('jsonb')
  state: any;
}
