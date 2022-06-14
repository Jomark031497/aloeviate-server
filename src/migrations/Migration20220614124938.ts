import { Migration } from '@mikro-orm/migrations';

export class Migration20220614124938 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "email" varchar(255) not null;');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_email_unique";');
    this.addSql('alter table "users" drop column "email";');
  }

}
