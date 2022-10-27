/*
  Warnings:

  - You are about to drop the column `followers_id` on the `Followers` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `Following` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followers_profileName` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_profileName` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_profileName` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Followers" DROP CONSTRAINT "Followers_followers_id_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_following_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_fkey";

-- AlterTable
ALTER TABLE "Followers" DROP COLUMN "followers_id",
ADD COLUMN     "followers_profileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" DROP COLUMN "following_id",
ADD COLUMN     "following_profileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "author_id",
ADD COLUMN     "author_profileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profileName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_profileName_key" ON "users"("profileName");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_profileName_fkey" FOREIGN KEY ("author_profileName") REFERENCES "users"("profileName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_followers_profileName_fkey" FOREIGN KEY ("followers_profileName") REFERENCES "users"("profileName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_following_profileName_fkey" FOREIGN KEY ("following_profileName") REFERENCES "users"("profileName") ON DELETE RESTRICT ON UPDATE CASCADE;
