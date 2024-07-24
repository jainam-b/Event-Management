import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";

export const transactionRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

transactionRouter.get("/",authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  if (!c.user?.role) {
    c.status(403);
    return c.json({
      error: "Forbidden",
    });
  }
  try {
    const allTransacton = await prisma.transaction.findMany();
    return c.json(allTransacton);
  } catch (error) {
    c.status(403);
    return c.json({
      error: "error in retrieving ",
    });
  }
});



transactionRouter.get("/:transactionId",authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
     const transactionId = c.req.param("transactionId")
    try {
      const Transacton = await prisma.transaction.findMany({
        where :{
            id:transactionId
        }
      });
      return c.json(Transacton);
    } catch (error) {
      c.status(403);
      return c.json({
        error: "error in retrieving ",
      });
    }
  });
