/*
  Warnings:

  - You are about to drop the `_ArtistToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SongToUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Playlist` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `url` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToUser" DROP CONSTRAINT "_ArtistToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToUser" DROP CONSTRAINT "_ArtistToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_SongToUser" DROP CONSTRAINT "_SongToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SongToUser" DROP CONSTRAINT "_SongToUser_B_fkey";

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ArtistToUser";

-- DropTable
DROP TABLE "_SongToUser";

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
