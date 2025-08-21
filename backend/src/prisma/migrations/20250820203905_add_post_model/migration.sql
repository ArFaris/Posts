-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_nick_key" ON "public"."Post"("nick");
