"use server";
import Course from '../../database/models/courseModel'
import connectToDatabase from "../../database/route"
import { NextResponse } from "next/server";

export const getCourseById = async (id) => {
  await connectToDatabase();
  try {
    const res = await Course.findById(id).populate().exec();
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};
