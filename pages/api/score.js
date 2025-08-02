import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import dbConnect from "../../lib/mongodb";
import Score from "../../models/Score";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { score } = req.body;

    if (typeof score !== "number") {
      return res.status(400).json({ error: "Score must be a number" });
    }

    await dbConnect();

    const scoreRecord = new Score({
      userId: session.user.id,
      userEmail: session.user.email,
      score,
      totalQuestions: 4, // Based on your quiz questions
    });

    await scoreRecord.save();

    res.status(201).json({ message: "Score saved successfully", score });
  } catch (error) {
    console.error("Score save error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
