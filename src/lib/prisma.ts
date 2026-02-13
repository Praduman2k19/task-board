import { PrismaClient } from "@prisma/client"

const prisma = globalThis && (globalThis as any).prisma ? (globalThis as any).prisma : new PrismaClient()

if (typeof globalThis !== "undefined") {
  ;(globalThis as any).prisma = prisma
}

export { prisma }
