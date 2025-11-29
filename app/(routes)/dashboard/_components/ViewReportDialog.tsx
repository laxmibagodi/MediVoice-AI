
// "use client";
// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { SessionDetail } from "../medical-agent/[sessionId]/page";
// import moment from "moment";

// type Props = {
//   record: SessionDetail;
// };

// function ViewReportDialog({ record }: Props) {
//   const report = record?.report as any;

//   // Helper to render multilingual fields safely
//   const renderMultilingualField = (field: any) => {
//     if (!field) return <p>N/A</p>;
//     if (typeof field === "string") return <p>{field}</p>;
//     return (
//       <div className="space-y-1">
//         {field.English && <p><strong>English:</strong> {field.English}</p>}
//         {field.Kannada && <p><strong>Kannada:</strong> {field.Kannada}</p>}
//         {field.Hindi && <p><strong>Hindi:</strong> {field.Hindi}</p>}
//       </div>
//     );
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="link" size="sm">
//           View Report
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh] rounded-2xl border border-gray-300">
//         <DialogHeader>
//           <DialogTitle asChild>
//             <h2 className="text-center text-2xl font-bold text-blue-700">
//               🩺 Medical AI Voice Agent Report
//             </h2>
//           </DialogTitle>
//         </DialogHeader>

//         <DialogDescription asChild>
//           <div className="mt-6 space-y-4 text-sm">
//             {/* Session Info */}
//             <div className="border-b pb-3">
//               <h2 className="font-semibold text-blue-700 mb-1">Session Info</h2>
//               <p><strong>Doctor:</strong> {report?.agent || record.selectedDoctor?.specialist}</p>
//               <p><strong>User:</strong> {report?.user || "Anonymous"}</p>
//               <p><strong>Consulted On:</strong> {moment(record?.createdOn).format("MMMM Do YYYY, h:mm a")}</p>
//             </div>

//             {/* Chief Complaint */}
//             <div className="border-b pb-3">
//               <h2 className="font-semibold text-blue-700 mb-1">Chief Complaint</h2>
//               {renderMultilingualField(report?.chiefComplaint)}
//             </div>

//             {/* Summary */}
//             <div className="border-b pb-3">
//               <h2 className="font-semibold text-blue-700 mb-1">Summary</h2>
//               {renderMultilingualField(report?.summary)}
//             </div>

//             {/* Symptoms */}
//             {/* {report?.symptoms?.length > 0 && (
//               <div className="border-b pb-3">
//                 <h2 className="font-semibold text-blue-700 mb-1">Symptoms</h2>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {report.symptoms.map((sym: string, i: number) => <li key={i}>{sym}</li>)}
//                 </ul>
//               </div>
//             )} */}
//             {/* Symptoms  */}
//  {report?.symptoms?.length > 0 && (
//   <div className="border-b pb-3">
//     <h2 className="font-semibold text-blue-700 mb-1">Symptoms</h2>
//     {report?.symptoms?.length > 0 && (
//   <ul>
//     {report.symptoms.map((sym: any, i: number) => (
//       <li key={i}>
//         {typeof sym === "string" ? sym : `${sym.name} ${sym.severity ? `(${sym.severity})` : ""}`}
//       </li>
//     ))}
//   </ul>
// )}
//   </div>
// )}






//             {/* Duration & Severity */}
//             <div className="border-b pb-3">
//               <h2 className="font-semibold text-blue-700 mb-1">Duration & Severity</h2>
//               <p><strong>Duration:</strong> {report?.duration || "Not specified"}</p>
//               <p><strong>Severity:</strong> {report?.severity || "Not specified"}</p>
//             </div>
            
// {/* Medications */}
// {report?.medicationsMentioned?.length > 0 && (
//   <div className="border-b pb-3">
//     <h2 className="font-semibold text-blue-700 mb-1">Medications Mentioned</h2>
//     <ul className="list-disc list-inside text-gray-700">
//       {report.medicationsMentioned.map((med: any, i: number) => (
//         <li key={i}>{med.name || med}</li>
//       ))}
//     </ul>
//   </div>
// )}

// {/* Recommendations */}
// {/* {report?.recommendations?.length > 0 && (
//   <div className="border-b pb-3">
//     <h2 className="font-semibold text-blue-700 mb-1">Recommendations</h2>
//     <ul className="list-disc list-inside text-gray-700">
//       {report.recommendations.map((rec: any, i: number) => (
//         <li key={i}>{rec.name || rec}</li>
//       ))}
//     </ul>
//   </div>
// )} */}

// {/* Recommendations */}
// {report?.recommendations?.length > 0 && (
//   <div className="border-b pb-3">
//     <h2 className="font-semibold text-blue-700 mb-1">Recommendations</h2>
//     <ul className="list-disc list-inside text-gray-700 space-y-1">
//       {report.recommendations.map((rec: any, i: number) => (
//         <li key={i}>
//           {renderMultilingualField(rec)}
//         </li>
//       ))}
//     </ul>
//   </div>
// )}


            

//             {/* Footer */}
//             <p className="text-xs text-center text-gray-400 mt-3">
//               This report was generated by an AI Medical Assistant for informational purposes only.
//             </p>
//           </div>
//         </DialogDescription>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ViewReportDialog;
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type Props = {
  record: SessionDetail;
};

function ViewReportDialog({ record }: Props) {
  const report = record?.report as any;

  const renderMultilingualField = (field: any) => {
    if (!field) return <p className="text-gray-500">N/A</p>;
    if (typeof field === "string") return <p>{field}</p>;
    return (
      <div className="space-y-1">
        {field.English && <p><strong>English:</strong> {field.English}</p>}
        {field.Kannada && <p><strong>Kannada:</strong> {field.Kannada}</p>}
        {field.Hindi && <p><strong>Hindi:</strong> {field.Hindi}</p>}
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="text-cyan-600 hover:text-cyan-500">
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-2xl font-bold text-cyan-600">
              🩺 AI Medical Voice Agent Report
            </h2>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="mt-6 space-y-5 text-sm text-gray-800">
            {/* Session Info */}
            <div className="border-b border-gray-200 pb-3">
              <h2 className="font-semibold text-cyan-600 mb-1">Session Info</h2>
              <p><strong>Doctor:</strong> {report?.agent || record.selectedDoctor?.specialist}</p>
              <p><strong>User:</strong> {report?.user || "Anonymous"}</p>
              <p><strong>Consulted On:</strong> {moment(record?.createdOn).format("MMMM Do YYYY, h:mm a")}</p>
            </div>

            {/* Chief Complaint */}
            <div className="border-b border-gray-200 pb-3">
              <h2 className="font-semibold text-cyan-600 mb-1">Chief Complaint</h2>
              {renderMultilingualField(report?.chiefComplaint)}
            </div>

            {/* Summary */}
            <div className="border-b border-gray-200 pb-3">
              <h2 className="font-semibold text-cyan-600 mb-1">Summary</h2>
              {renderMultilingualField(report?.summary)}
            </div>

            {/* Symptoms */}
            {report?.symptoms?.length > 0 && (
              <div className="border-b border-gray-200 pb-3">
                <h2 className="font-semibold text-cyan-600 mb-1">Symptoms</h2>
                <ul className="list-disc list-inside">
                  {report.symptoms.map((sym: any, i: number) => (
                    <li key={i}>
                      {typeof sym === "string" ? sym : `${sym.name}${sym.severity ? ` (${sym.severity})` : ""}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Duration & Severity */}
            <div className="border-b border-gray-200 pb-3">
              <h2 className="font-semibold text-cyan-600 mb-1">Duration & Severity</h2>
              <p><strong>Duration:</strong> {report?.duration || "Not specified"}</p>
              <p><strong>Severity:</strong> {report?.severity || "Not specified"}</p>
            </div>

            {/* Medications */}
            {report?.medicationsMentioned?.length > 0 && (
              <div className="border-b border-gray-200 pb-3">
                <h2 className="font-semibold text-cyan-600 mb-1">Medications Mentioned</h2>
                <ul className="list-disc list-inside">
                  {report.medicationsMentioned.map((med: any, i: number) => (
                    <li key={i}>{med.name || med}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {report?.recommendations?.length > 0 && (
              <div className="pb-3">
                <h2 className="font-semibold text-cyan-600 mb-1">Recommendations</h2>
                <ul className="list-disc list-inside space-y-1">
                  {report.recommendations.map((rec: any, i: number) => (
                    <li key={i}>{renderMultilingualField(rec)}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer */}
            <p className="text-xs text-center text-gray-400 mt-3">
              Generated by AI Medical Assistant for informational purposes only.
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
