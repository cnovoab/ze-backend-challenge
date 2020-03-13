import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { MultiPolygon, Point } from 'geojson';

@Entity()
export default class Partner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  tradingName: string;

  @Column({ nullable: false })
  ownerName: string;

  @Column({ nullable: false, unique: true })
  document: string;

  @Column({ type: 'json', nullable: false })
  coverageArea: MultiPolygon;

  @Column({ type: 'json', nullable: false })
  address: Point;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
