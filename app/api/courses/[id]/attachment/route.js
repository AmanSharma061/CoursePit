import { NextResponse } from "next/server";
import Attachment from "../../../../../database/models/attachmentModel";
import Course from "../../../../../database/models/courseModel";
export async function POST(request) {
  const { values, courseId } = await request.json();

  try {
    const attachment = Attachment.create({
      name: values.url.split("/").pop(),
      url: values.url,
      courseId: courseId
    });
  const id= await attachment;
  console.log(id,"id")
    const course = await Course.findByIdAndUpdate(courseId);
    console.log(attachment._id);
    await course.attachments.push(attachment._id);

    await course.save();
    console.log("course", course);

    return NextResponse.json({ course, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", status: 401 });
  }
}
