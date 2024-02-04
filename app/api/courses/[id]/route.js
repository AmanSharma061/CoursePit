import connectToDatabase from "../../../../database/route";
import Course from "../../../../database/models/courseModel";
import { NextResponse } from "next/server";

export async function PATCH(request, params) {
  const {  courseId, values } = await request.json();

  console.log(courseId);
  try {
    await connectToDatabase();
    const course = await Course.findByIdAndUpdate(courseId, {
      ...values
    });

    await course.save();

    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
