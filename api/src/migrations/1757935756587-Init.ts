import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757935756587 implements MigrationInterface {
    name = 'Init1757935756587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "guild_balance_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "balance" numeric NOT NULL, "guildId" uuid, CONSTRAINT "PK_b5521e12374bf831f38ca602841" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guilds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dailyMinAmount" integer NOT NULL DEFAULT '1000', "balance" numeric NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7e7f2a51bd6d96a9ac2aa560f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guild_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "guildId" uuid, "userId" uuid, CONSTRAINT "PK_b7c193a6ff9298b40b684af968f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "guild_balance_history" ADD CONSTRAINT "FK_a02605ad60c2fae86aa51b633ec" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guild_users" ADD CONSTRAINT "FK_7d09c2cd15867f8482a88b70c55" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guild_users" ADD CONSTRAINT "FK_3fabcb4a767c5d9cb607cd5ea24" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild_users" DROP CONSTRAINT "FK_3fabcb4a767c5d9cb607cd5ea24"`);
        await queryRunner.query(`ALTER TABLE "guild_users" DROP CONSTRAINT "FK_7d09c2cd15867f8482a88b70c55"`);
        await queryRunner.query(`ALTER TABLE "guild_balance_history" DROP CONSTRAINT "FK_a02605ad60c2fae86aa51b633ec"`);
        await queryRunner.query(`DROP TABLE "guild_users"`);
        await queryRunner.query(`DROP TABLE "guilds"`);
        await queryRunner.query(`DROP TABLE "guild_balance_history"`);
    }

}
