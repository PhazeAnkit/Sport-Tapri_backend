-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(20) NOT NULL,
    "lastName" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
