-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'App';

-- AlterTable
ALTER TABLE "apps" ALTER COLUMN "image" DROP NOT NULL;
