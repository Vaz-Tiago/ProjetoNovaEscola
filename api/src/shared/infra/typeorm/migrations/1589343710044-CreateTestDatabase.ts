import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTestDatabase1589343710044
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('novaescola_testes', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('novaescola_testes');
  }
}
