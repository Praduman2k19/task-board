import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(req: Request, context: { params: any }) {
  try {
    const userId = (await cookies()).get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    const resolvedParams = await context.params;
    const id = resolvedParams?.id;

    const { count } = await prisma.task.updateMany({
      where: { id, userId },
      data: { status },
    });

    if (count === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
