-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DONE', 'PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "universityLocation" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "prevStep" INTEGER NOT NULL,
    "currStep" INTEGER NOT NULL,
    "nextStep" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Application_phone_key" ON "Application"("phone");
