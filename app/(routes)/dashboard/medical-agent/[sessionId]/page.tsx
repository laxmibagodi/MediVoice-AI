"use client";
import axios from "axios";
import { useParams, } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: Report,
  selectedDoctor: doctorAgent,
  createdOn: string
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router=useRouter();




  // ✅ Fetch session details
  useEffect(() => {
    if (sessionId) GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

   const StartCall = () => {
    if (!sessionDetail?.selectedDoctor) {
      toast.error("Doctor info not loaded yet.");
      return;
    }

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const assistantId = process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;
    if (!assistantId) {
      toast.error("Voice Assistant ID not configured.");
      return;
    }

    const agentConfig = {
      name: sessionDetail.selectedDoctor.specialist,
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. How are you feeling today?",
      transcriber: { provider: "assembly-ai", language: "en" },
      voice: { provider: "openai", voiceId: sessionDetail.selectedDoctor.voiceId },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          { role: "system", content: sessionDetail.selectedDoctor.agentPrompt },
        ],
      },
    };

    try {
      // Pass both assistant ID and agent config
      //@ts-ignore
      vapi.start(assistantId);

      vapi.on("call-start", () => {
        setCallStarted(true);
        console.log("✅ Call started");
      });

      vapi.on("call-end", async () => {
        setCallStarted(false);
        console.log("🔴 Call ended");
        await EndCall(); // Automatically generate report on call-end
      });

      vapi.on("message", (msg) => {
        if (msg.type === "transcript") {
          if (msg.transcriptType === "partial") {
            setLiveTranscript(msg.transcript);
            setCurrentRole(msg.role);
          } else if (msg.transcriptType === "final") {
            setMessages((prev) => [...prev, { role: msg.role, text: msg.transcript }]);
            setLiveTranscript("");
            setCurrentRole(null);
          }
        }
      });

      //@ts-ignore
      vapi.on("speech-start", () => setCurrentRole("assistant"));
      vapi.on("speech-end", () => setCurrentRole("user"));
    } catch (err) {
      console.error("Failed to start call:", err);
      toast.error("Call failed to start.");
    }
  };

  // End Call
const EndCall = async() => {
  if (!vapiInstance) return;
  setLoading(true);  // show loader
  try {
    console.log("🔴 Ending call...");
    await vapiInstance.stop();
  } catch (err) {
    console.error("Meeting ended in error:", err);
  } finally {
    setCallStarted(false);
    setVapiInstance(null);
    setLiveTranscript("");
    setCurrentRole(null);
    await GenerateReport();  // generate report
    toast.success('Your report is generated!');
    setLoading(false);
    router.replace('/dashboard');
  }
};


  // Generate Report API call
  const GenerateReport = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/medical-report", {
        sessionId,
        sessionDetail,
        messages,
      });
      console.log("✅ Generated report:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error generating report:", err);
      toast.error("Failed to generate report.");
      return null;
    } finally {
      setLoading(false);
    }
  };
// const StartCall = () => {
//   if (!sessionDetail?.selectedDoctor) {
//     toast.error("Doctor info not loaded yet.");
//     return;
//   }

//   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//   setVapiInstance(vapi);

//   const assistantId = process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;
//   if (!assistantId) {
//     console.error("Missing VAPI assistant ID");
//     toast.error("Voice Assistant ID not configured.");
//     return;
//   }

//   const VapiAgentConfig = {
//     name: sessionDetail.selectedDoctor.specialist,
//     firstMessage: "Hi there! I'm your AI Medical Assistant...",
//     transcriber: { provider: 'assembly-ai', language: 'en' },
//     voice: { provider: 'openai', voiceId: sessionDetail.selectedDoctor.voiceId },
//     model: { provider: 'openai', model: 'gpt-4', messages: [{ role:'system', content: sessionDetail.selectedDoctor.agentPrompt }] }
//   };

//   try {
//     vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    
//     vapi.on('call-start', () => setCallStarted(true));
//     vapi.on('call-end', () => setCallStarted(false));
//     vapi.on('message', (msg) => {
//       if (msg.type === 'transcript') {
//         if (msg.transcriptType === 'partial') setLiveTranscript(msg.transcript);
//         else setMessages(prev => [...prev, { role: msg.role, text: msg.transcript }]);
//       }
//     });
//     //@ts-ignore
//     vapi.on('speech-start', () => setCurrentRole('assistant'));
//     vapi.on('speech-end', () => setCurrentRole('user'));
//   } catch (err) {
//     console.error("Failed to start call", err);
//     toast.error("Call failed to start.");
//   }
// };

// const EndCall = async () => {
//   if (!vapiInstance) return;
//   setLoading(true);
//   try {
//     vapiInstance.stop();
//     vapiInstance.off('call-start');
//     vapiInstance.off('call-end');
//     vapiInstance.off('message');
//     vapiInstance.off('speech-start');
//     vapiInstance.off('speech-end');

//     setCallStarted(false);
//     setVapiInstance(null);
//     setLiveTranscript("");
//     setCurrentRole(null);

//     await GenerateReport(); // generate report
//     toast.success("Report generated!");
//   } catch (err) {
//     console.error("Error ending call", err);
//   } finally {
//     setLoading(false);
//     router.replace("/dashboard");
//   }
// };


// const StartCall = () => {
//   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//   setVapiInstance(vapi);

//   const VapiAgentConfig = {
//     name: 'AI Medical Doctor Voice Agent',
//     firstMessage:
//       "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
//     transcriber: {
//       provider: 'assembly-ai',
//       language: 'en',
//     },
//     voice: {
//       provider: 'openai',
//       voiceId: sessionDetail?.selectedDoctor?.voiceId,
//     },
//     model: {
//       provider: 'openai',
//       model: 'gpt-4',
//       messages: [
//         {
//           role: 'system',
//           content: sessionDetail?.selectedDoctor?.agentPrompt,
//         },
//       ],
//     },
//   };

//   const assistantId = process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;

//   if (!assistantId) {
//     console.error("❌ Missing NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID in .env.local");
//     toast.error("Voice Assistant ID not configured.");
//     return;
//   }

//   try {
//     // ✅ Pass both assistant ID and agent config
//     //@ts-ignore
//     vapi.start(assistantId, VapiAgentConfig);

//     vapi.on('call-start', () => {
//       console.log('✅ Call started');
//       setCallStarted(true);
//     });

//     vapi.on('call-end', () => {
//       console.log('🔴 Call ended');
//       setCallStarted(false);
//     });

//     vapi.on('message', (message) => {
//       if (message.type === 'transcript') {
//         const { role, transcriptType, transcript } = message;
//         console.log(`${role}: ${transcript}`);
//         if (transcriptType === 'partial') {
//           setLiveTranscript(transcript);
//           setCurrentRole(role);
//         } else if (transcriptType === 'final') {
//           setMessages((prev) => [...prev, { role, text: transcript }]);
//           setLiveTranscript('');
//           setCurrentRole(null);
//         }
//       }
//     });

//     vapi.on('speech-start', () => {
//       console.log('Assistant started speaking');
//       setCurrentRole('assistant');
//     });

//     vapi.on('speech-end', () => {
//       console.log('Assistant stopped speaking');
//       setCurrentRole('user');
//     });
//   } catch (error) {
//     console.error('❌ Failed to start call:', error);
//     toast.error('Failed to start call. Check your Vapi credentials.');
//   }
// };

 
//   // ✅ End Call
// const EndCall = async() => {
//   setLoading(false);
//   if (!vapiInstance) return;
//   try {
//     console.log("🔴 Ending call...");
//     vapiInstance.stop();
//   } catch (err) {
//     console.error("Meeting ended in error:", err);
//   } finally {
//     setCallStarted(false);
//     setVapiInstance(null);
//     setLiveTranscript("");
//     setCurrentRole(null);
//     const result=await GenerateReport();  // ✅ call to generate report
//     setLoading(false);
//     toast.success('Your report is generated!') 
//     router.replace('/dashboard');
//   }
// };

//  const GenerateReport = async () => {
//   try {
//     setLoading(true);
//     const result = await axios.post('/api/medical-report', {
//       messages: messages,           // conversation messages
//       sessionDetail: sessionDetail, // details like selected doctor
//       sessionId: sessionId
//     });
//     console.log("Generated Report:", result.data);
//     return result.data;
//   } catch (err) {
//     console.error("Error generating report:", err);
//     toast.error("Failed to generate report.");
//     return null;
//   } finally {
//     setLoading(false);
//   }
// };

  
  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center mt-3">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex flex-col items-center mt-10">
          <Image
            src={sessionDetail.selectedDoctor.image}
            alt={sessionDetail.selectedDoctor.specialist}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">{sessionDetail.selectedDoctor.specialist}</h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          {/* <div className="mt-12 flex flex-col items-center w-full max-h-[400px] overflow-y-auto space-y-3"> */}
            <div className="mt-10 w-full flex justify-center">
  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-3 w-full max-w-2xl min-h-[100px] shadow-lg flex flex-col items-center overflow-y-auto space-y-4">
            {messages?.slice(-4).map((msg:messages, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.role === "assistant"
                    ? "text-blue-400 p-1"
                    : "text-green-400"
                }`}
              >
                <strong>{msg.role}:</strong> {msg.text}
              </div>
            ))}
            {liveTranscript && liveTranscript?.length>0 && (
              <div className="italic text-gray-300 bg-gray-700 px-3 py-2 rounded-lg text-center w-fit max-w-[80%]">
                {currentRole}: {liveTranscript}
             </div>
            )}
          </div> </div>
       


          {!callStarted ? (
            <Button className="mt-10" onClick={StartCall} disabled={loading}>
              {loading ? <Loader className='animate-spin'/> : <PhoneCall /> }
              Start Call
            </Button>
          ) : (
            <Button               
              variant="destructive"
              className="mt-10"
              onClick={EndCall} disabled={loading}
            >
               {loading ? <Loader className='animate-spin'/> :<PhoneOff />} Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;





