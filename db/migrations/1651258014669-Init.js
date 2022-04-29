module.exports = class Init1651258014669 {
  name = 'Init1651258014669'

  async up(db) {
    await db.query(`CREATE TABLE "remarks" ("id" character varying NOT NULL, "remarks" text, CONSTRAINT "PK_d2fb9d856201fedb9767195bb73" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "collections" ("changes" text array, "block" integer NOT NULL, "max" integer NOT NULL, "issuer" text NOT NULL, "symbol" text NOT NULL, "id" character varying NOT NULL, "metadata" text NOT NULL, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "base" ("id" character varying NOT NULL, "block" integer NOT NULL, "symbol" text NOT NULL, "type" text NOT NULL, "issuer" text NOT NULL, "parts" jsonb NOT NULL, CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "nft_resource" ("id" character varying NOT NULL, "resources" jsonb NOT NULL, "priority" text array NOT NULL, "rootowner" text NOT NULL, CONSTRAINT "PK_c5314532893503e54045df0916c" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "nfts" ("id" character varying NOT NULL, "collection" text NOT NULL, "sn" text NOT NULL, "block" integer NOT NULL, "owner" text NOT NULL, "rootowner" text NOT NULL, "changes" jsonb, "priority" text array, "children" jsonb, "pending" boolean NOT NULL, "metadata" text NOT NULL, "transferable" integer NOT NULL, "forsale" text NOT NULL, "burned" text NOT NULL, "symbol" text NOT NULL, CONSTRAINT "PK_65562dd9630b48c4d4710d66772" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "properties" ("id" character varying NOT NULL, "royalty_info" text NOT NULL, "base_attributes" text, "item_attributes" text, "rootowner" text, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "remarks"`)
    await db.query(`DROP TABLE "collections"`)
    await db.query(`DROP TABLE "base"`)
    await db.query(`DROP TABLE "nft_resource"`)
    await db.query(`DROP TABLE "nfts"`)
    await db.query(`DROP TABLE "properties"`)
  }
}
