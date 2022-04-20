module.exports = class Init1650474781868 {
  name = 'Init1650474781868'

  async up(db) {
    await db.query(`CREATE TABLE "remarks" ("id" character varying NOT NULL, "remarks" text, CONSTRAINT "PK_d2fb9d856201fedb9767195bb73" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "batch_all" ("id" character varying NOT NULL, "calls" text array, CONSTRAINT "PK_626b68babc5892ee8be93f5c50a" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "collections" ("changes" text array, "block" integer NOT NULL, "max" integer NOT NULL, "issuer" text NOT NULL, "symbol" text NOT NULL, "id" character varying NOT NULL, "metadata" text NOT NULL, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "base" ("id" character varying NOT NULL, "block" integer NOT NULL, "symbol" text NOT NULL, "type" text NOT NULL, "issuer" text NOT NULL, "parts" jsonb NOT NULL, CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "properties" ("id" character varying NOT NULL, "royalty_info" jsonb, "attributes" jsonb, "item_attributes" jsonb, "base_attributes" jsonb, "nft_properties_id" character varying NOT NULL, CONSTRAINT "REL_a8d250bda9090353d2deb871ee" UNIQUE ("nft_properties_id"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`)
    await db.query(`CREATE UNIQUE INDEX "IDX_a8d250bda9090353d2deb871ee" ON "properties" ("nft_properties_id") `)
    await db.query(`CREATE TABLE "nfts" ("changes" text array, "children" jsonb, "resources" jsonb, "block" integer NOT NULL, "collection" text NOT NULL, "symbol" text NOT NULL, "transferable" integer NOT NULL, "sn" text NOT NULL, "metadata" text NOT NULL, "priority" text array, "owner" text NOT NULL, "rootowner" text NOT NULL, "forsale" text NOT NULL, "burned" text, "pending" boolean NOT NULL, "id" character varying NOT NULL, CONSTRAINT "PK_65562dd9630b48c4d4710d66772" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_a8d250bda9090353d2deb871eea" FOREIGN KEY ("nft_properties_id") REFERENCES "nfts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "remarks"`)
    await db.query(`DROP TABLE "batch_all"`)
    await db.query(`DROP TABLE "collections"`)
    await db.query(`DROP TABLE "base"`)
    await db.query(`DROP TABLE "properties"`)
    await db.query(`DROP INDEX "public"."IDX_a8d250bda9090353d2deb871ee"`)
    await db.query(`DROP TABLE "nfts"`)
    await db.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_a8d250bda9090353d2deb871eea"`)
  }
}
