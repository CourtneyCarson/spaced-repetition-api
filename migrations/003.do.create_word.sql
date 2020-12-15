CREATE TABLE "word" (
  "id" SERIAL PRIMARY KEY,
  "original" TEXT NOT NULL,
  "translation" TEXT NOT NULL,
  --  memory value multiplies by 2 so has to be set at 1 so something
  --  to multiply by
  "memory_value" SMALLINT DEFAULT 1,
  "correct_count" SMALLINT DEFAULT 0,
  "incorrect_count" SMALLINT DEFAULT 0,
  "language_id" INTEGER REFERENCES "language"(id)
    ON DELETE CASCADE NOT NULL,
  "next" INTEGER REFERENCES "word"(id)
    ON DELETE SET NULL
);

ALTER TABLE "language"
  ADD COLUMN "head" INTEGER REFERENCES "word"(id)
    ON DELETE SET NULL;
