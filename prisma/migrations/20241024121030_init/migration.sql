/*
  Warnings:

  - A unique constraint covering the columns `[cuil]` on the table `ciudadanos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `ciudadanos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ciudadanos_cuil_key" ON "ciudadanos"("cuil");

-- CreateIndex
CREATE UNIQUE INDEX "ciudadanos_email_key" ON "ciudadanos"("email");
