import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import {
  MultiPolygon
  , Point
} from 'geojson';

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

  @Column('geometry', {
    nullable: false,
    spatialFeatureType: 'MultiPolygon'
  })
  @Index({
    spatial: true
  })
  coverageArea: MultiPolygon;

  @Column('geometry', {
    nullable: false,
    spatialFeatureType: 'Point'
  })
  address: Point;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
