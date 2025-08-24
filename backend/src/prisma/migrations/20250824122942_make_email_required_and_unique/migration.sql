UPDATE "User" SET email = 'user_' || id || '@example.com' WHERE email IS NULL;
ALTER TABLE "User" ALTER COLUMN email SET NOT NULL;
ALTER TABLE "User" ADD CONSTRAINT "User_email_key" UNIQUE (email);