import Course from "../../../../database/models/courseModel";
import connectToDatabase from "../../../../database/route";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = auth();
  const { title } = await request.json();

  try {
    await connectToDatabase();

    if (!title) {
      console.log("Title is required");
      return NextResponse.json({ error: "Title is required" });
    }
    if (!userId) {
      console.log("Unauthorized");
      return NextResponse.json({ error: "Unauthorized" });
    }
    const course = new Course({
      title,
      clerkId: userId
    });
    await course.save();
    return NextResponse.json(course);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
