// import {NextRequest, NextResponse } from "next/server";
// import { openai } from "@/config/OpenAiModel";
// import { AIDoctorAgents } from "@/shared/list";
// import { SessionChatTable } from "@/config/schema";
// import { db } from "@/config/db";
// import { eq } from "drizzle-orm";

// const REPORT_GEN_PROMPT=`You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and Conversation between AI medical agent and user, generate a structured report with the following fields:
// 1. sessionId: a unique session identifier
// 2. agent: the medical specialist name (e.g., "General Physician AI")
// 3. user: name of the patient or "Anonymous" if not provided
// 4. timestamp: current date and time in ISO format
// 5. chiefComplaint: one-sentence summary of the main health concern
// 6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations in 3 languages like English,kannada and hindi
// 7. symptoms: list of symptoms mentioned by the user
// 8. duration: how long the user has experienced the symptoms
// 9. severity: mild, moderate, or severe
// 10. medicationsMentioned: list of any medicines mentioned
// 11. recommendations: list of AI suggestions (e.g., rest, see a doctor)

// Return the result in this JSON format:
// {
//   "sessionId": "string",
//   "agent": "string",
//   "user": "string",
//   "timestamp": "ISO Date string",
//   "chiefComplaint": "string",
//   "summary": "string",
//   "symptoms": ["symptom1", "symptom2"],
//   "duration": "string",
//   "severity": "string",
//   "medicationsMentioned": ["med1", "med2"],
//   "recommendations": ["rec1", "rec2"]
// }

// Only include valid fields. Respond with nothing else.
// `
// export async function POST(req:NextRequest){
// const {sessionId,sessionDetail,messages}=await req.json();
// try {
//     const UserInput="AI Doctor Agent Info:"+JSON.stringify(sessionDetail)+", Conversation:"+JSON.stringify(messages);
//     const completion = await openai.chat.completions.create({
//         model: "google/gemini-2.5-flash",
//         messages: [
//             {role:'system',content:REPORT_GEN_PROMPT},
//           { role: "user", content:UserInput }
//         ],
//       })
    
//       const rawResp=completion.choices[0].message;
//       //@ts-ignore
//       const Resp=rawResp.content.trim().replace('```json','').replace('```','')
//       const JSONResp=JSON.parse(Resp);

//       //save to database
//       const result = await db.update(SessionChatTable).set({
//           report:JSONResp,
//           conversation:messages
//       }).where(eq(SessionChatTable.sessionId,sessionId));
//       return NextResponse.json(JSONResp)
// } catch (error) {
//     return NextResponse.json(error)
// }
// }
// import { NextRequest, NextResponse } from "next/server";
// import { openai } from "@/config/OpenAiModel";
// import { SessionChatTable } from "@/config/schema";
// import { db } from "@/config/db";
// import { eq } from "drizzle-orm";

// // Report generation prompt
// const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. 
// Based on doctor AI agent info and Conversation between AI medical agent and user, generate a structured report with the following fields:
// 1. sessionId: a unique session identifier
// 2. agent: the medical specialist name (e.g., "General Physician AI")
// 3. user: name of the patient or "Anonymous" if not provided
// 4. timestamp: current date and time in ISO format
// 5. chiefComplaint: one-sentence summary of the main health concern
// 6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations in 3 languages like English, Kannada and Hindi
// 7. symptoms: list of symptoms mentioned by the user
// 8. duration: how long the user has experienced the symptoms
// 9. severity: mild, moderate, or severe
// 10. medicationsMentioned: list of any medicines mentioned
// 11. recommendations: list of AI suggestions (e.g., rest, see a doctor)

// Return the result in this JSON format:
// {
//   "sessionId": "string",
//   "agent": "string",
//   "user": "string",
//   "timestamp": "ISO Date string",
//   "chiefComplaint": "string",
//   "summary": "string",
//   "symptoms": ["symptom1", "symptom2"],
//   "duration": "string",
//   "severity": "string",
//   "medicationsMentioned": ["med1", "med2"],
//   "recommendations": ["rec1", "rec2"]
// }

// Only include valid fields. Respond with nothing else.
// `;

// export async function POST(req: NextRequest) {
//   const { sessionId, sessionDetail, messages } = await req.json();

//   try {
//     const UserInput =
//       "AI Doctor Agent Info:" +
//       JSON.stringify(sessionDetail) +
//       ", Conversation:" +
//       JSON.stringify(messages);

//     const completion = await openai.chat.completions.create({
//       model: "google/gemini-2.5-flash",
//       messages: [
//         { role: "system", content: REPORT_GEN_PROMPT },
//         { role: "user", content: UserInput },
//       ],
//     });

//     const rawResp = completion.choices[0].message;
//     //@ts-ignore
//     const Resp = rawResp.content.trim().replace("```json", "").replace("```", "");
//     let JSONResp = JSON.parse(Resp);

//     // ✅ Fill missing fields with defaults
//     JSONResp.sessionId = JSONResp.sessionId || sessionId;
//     JSONResp.agent = JSONResp.agent || sessionDetail.selectedDoctor?.specialist || "Unknown";
//     JSONResp.user = JSONResp.user || "Anonymous";
//     JSONResp.timestamp = JSONResp.timestamp || new Date().toISOString();
//     JSONResp.chiefComplaint = JSONResp.chiefComplaint || "Not specified";
//     JSONResp.summary = JSONResp.summary || "No summary available";
//     JSONResp.symptoms = JSONResp.symptoms || [];
//     JSONResp.duration = JSONResp.duration || "Not specified";
//     JSONResp.severity = JSONResp.severity || "Not specified";
//     JSONResp.medicationsMentioned = JSONResp.medicationsMentioned || [];
//     JSONResp.recommendations = JSONResp.recommendations || [];

//     // Save to database
//     await db.update(SessionChatTable)
//       .set({
//         report: JSONResp,
//         conversation: messages,
//         createdOn: new Date().toISOString(), // Ensure timestamp
//       })
//       .where(eq(SessionChatTable.sessionId, sessionId));

//     return NextResponse.json(JSONResp);
//   } catch (error) {
//     console.error("Error generating report:", error);
//     return NextResponse.json({ error: "Failed to generate report", details: error });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a conversation with a user. 
Generate a JSON report with fields: sessionId, agent, user, timestamp, chiefComplaint, summary (English, Kannada, Hindi), symptoms, duration, severity, medicationsMentioned, recommendations (English, Kannada, Hindi).
Always must include medicationsMentioned and recommendations based on chiefComplaint and symptoms.Do not omit these keys.Respond only with valid JSON.`;

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetail, messages } = await req.json();

  try {
    // ✅ Limit messages to last 20 to reduce tokens
    const recentMessages = messages.slice(-20);

    const userPrompt = `Doctor Info: ${JSON.stringify(sessionDetail)}, Conversation: ${JSON.stringify(recentMessages)}`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1000, // ✅ Limit tokens to avoid 402
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const Resp = rawResp.content.trim().replace(/```json|```/g, "");
    let JSONResp = JSON.parse(Resp);

    // ✅ Fill missing fields with defaults
    JSONResp.sessionId = JSONResp.sessionId || sessionId;
    JSONResp.agent = JSONResp.agent || sessionDetail.selectedDoctor?.specialist || "Unknown";
    JSONResp.user = JSONResp.user || "Anonymous";
    JSONResp.timestamp = JSONResp.timestamp || new Date().toISOString();
    JSONResp.chiefComplaint = JSONResp.chiefComplaint || "Not specified";
    JSONResp.summary = JSONResp.summary || "No summary available";
    JSONResp.symptoms = JSONResp.symptoms || [];
    JSONResp.duration = JSONResp.duration || "Not specified";
    JSONResp.severity = JSONResp.severity || "Not specified";
    JSONResp.medicationsMentioned = JSONResp.medicationsMentioned || [];
    JSONResp.recommendations = JSONResp.recommendations || [];

    // Save to DB
    await db.update(SessionChatTable)
      .set({
        report: JSONResp,
        conversation: recentMessages,
        createdOn: new Date().toISOString(),
      })
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(JSONResp);
  } catch (error) {
    console.error("❌ Error generating report:", error);
    return NextResponse.json({ error: "Failed to generate report", details: error });
  }
}

