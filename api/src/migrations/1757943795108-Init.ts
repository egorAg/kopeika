import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1757943795108 implements MigrationInterface {
  name = 'Init1757943795108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "currency" character varying NOT NULL DEFAULT 'RUB', "balance" numeric NOT NULL DEFAULT '0', "creditLimit" numeric, "currentDebt" numeric, "gracePeriodDays" integer, "goalAmount" numeric, "goalDeadline" TIMESTAMP WITH TIME ZONE, "monthlyPayment" numeric, "percent" numeric, "endDate" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "guildId" uuid, CONSTRAINT "PK_aeef5deff10ac719289c4f6b43b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chests" ADD CONSTRAINT "FK_d00d615e6a4810d6d822adff1de" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chests" DROP CONSTRAINT "FK_d00d615e6a4810d6d822adff1de"`,
    );
    await queryRunner.query(`DROP TABLE "chests"`);
  }
}
