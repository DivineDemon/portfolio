-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "documents" (
    "id" BIGSERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "embedding" vector(3072),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "industry" TEXT,
    "projectType" TEXT,
    "status" TEXT,
    "role" TEXT NOT NULL,
    "engagementModel" TEXT,
    "teamSize" INTEGER,
    "durationInMonths" INTEGER,
    "problem" TEXT NOT NULL,
    "context" TEXT,
    "strategy" TEXT NOT NULL,
    "architecture" TEXT NOT NULL,
    "execution" TEXT NOT NULL,
    "challenges" TEXT,
    "solution" TEXT NOT NULL,
    "measurableImpact" TEXT NOT NULL,
    "metrics" JSONB,
    "techStack" TEXT[],
    "infrastructure" TEXT[],
    "integrations" TEXT[],
    "coverImage" TEXT NOT NULL,
    "galleryImages" TEXT[],
    "demoUrl" TEXT,
    "repositoryUrl" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "keywords" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "image" TEXT,
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_documents_created_at" ON "documents"("created_at");

-- CreateIndex
CREATE INDEX "idx_documents_metadata" ON "documents" USING GIN ("metadata");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
