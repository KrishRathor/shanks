/*
  Warnings:

  - The primary key for the `analytics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `automations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `campaigns` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `segments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AutomationToContact" DROP CONSTRAINT "_AutomationToContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_AutomationToContact" DROP CONSTRAINT "_AutomationToContact_B_fkey";

-- DropForeignKey
ALTER TABLE "_CampaignToContact" DROP CONSTRAINT "_CampaignToContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_CampaignToContact" DROP CONSTRAINT "_CampaignToContact_B_fkey";

-- DropForeignKey
ALTER TABLE "_SegmentToContact" DROP CONSTRAINT "_SegmentToContact_A_fkey";

-- DropForeignKey
ALTER TABLE "_SegmentToContact" DROP CONSTRAINT "_SegmentToContact_B_fkey";

-- DropForeignKey
ALTER TABLE "analytics" DROP CONSTRAINT "analytics_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "analytics" DROP CONSTRAINT "analytics_userId_fkey";

-- DropForeignKey
ALTER TABLE "automations" DROP CONSTRAINT "automations_userId_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_userId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "segments" DROP CONSTRAINT "segments_userId_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_userId_fkey";

-- AlterTable
ALTER TABLE "_AutomationToContact" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CampaignToContact" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_SegmentToContact" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "analytics" DROP CONSTRAINT "analytics_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "campaignId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "analytics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "analytics_id_seq";

-- AlterTable
ALTER TABLE "automations" DROP CONSTRAINT "automations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "automations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "automations_id_seq";

-- AlterTable
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "campaigns_id_seq";

-- AlterTable
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "contacts_id_seq";

-- AlterTable
ALTER TABLE "segments" DROP CONSTRAINT "segments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "segments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "segments_id_seq";

-- AlterTable
ALTER TABLE "templates" DROP CONSTRAINT "templates_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "templates_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "templates_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "segments" ADD CONSTRAINT "segments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automations" ADD CONSTRAINT "automations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToContact" ADD CONSTRAINT "_CampaignToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToContact" ADD CONSTRAINT "_CampaignToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SegmentToContact" ADD CONSTRAINT "_SegmentToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SegmentToContact" ADD CONSTRAINT "_SegmentToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "segments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutomationToContact" ADD CONSTRAINT "_AutomationToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "automations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutomationToContact" ADD CONSTRAINT "_AutomationToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
