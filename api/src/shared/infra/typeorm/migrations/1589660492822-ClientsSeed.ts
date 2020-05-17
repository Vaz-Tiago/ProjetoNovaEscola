import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import clientsSeed from '../seeds/ClientsSeed';

export default class ClientsSeed1589660492822 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    const clients = getRepository('Client').create(clientsSeed);
    await getRepository('Client').save(clients);
  }

  public async down(_: QueryRunner): Promise<void> {
    // nothing
  }
}
