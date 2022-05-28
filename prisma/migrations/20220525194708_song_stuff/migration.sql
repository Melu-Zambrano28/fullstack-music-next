/*
  Warnings:

  - You are about to drop the `PlayLists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayListsToSong` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `duration` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayLists" DROP CONSTRAINT "PlayLists_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PlayListsToSong" DROP CONSTRAINT "_PlayListsToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayListsToSong" DROP CONSTRAINT "_PlayListsToSong_B_fkey";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "PlayLists";

-- DropTable
DROP TABLE "_PlayListsToSong";

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistToSong" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToSong_AB_unique" ON "_PlaylistToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToSong_B_index" ON "_PlaylistToSong"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
