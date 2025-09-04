import { PrismaClient } from "./generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prismaClient = new PrismaClient().$extends(withAccelerate());
