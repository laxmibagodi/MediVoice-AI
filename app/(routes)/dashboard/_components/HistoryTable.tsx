
// import React from 'react'
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { SessionDetail } from '../medical-agent/[sessionId]/page'
// import moment from 'moment'
// import ViewReportDialog from './ViewReportDialog'

// type Props = {
//   historyList: SessionDetail[]
// }

// function HistoryTable({ historyList }: Props) {
//   return (
//     <div>
//       <Table>
//         <TableCaption>Previous Consultation Reports</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>AI Medical Specialist</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {historyList.map((record, index) => (
//             <TableRow key={record.id || index}>
//               <TableCell className="font-medium">{record.selectedDoctor?.specialist}</TableCell>
//               {/* <TableCell>{record.notes}</TableCell> */}
//               <TableCell>
//   {record.notes && typeof record.notes === "object" 
//     ? JSON.stringify(record.notes) 
//     : record.notes}
// </TableCell>

//               <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
//               <TableCell className="text-right">
//                 <ViewReportDialog record={record} />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// export default HistoryTable

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";
import ViewReportDialog from "./ViewReportDialog";

type Props = {
  historyList: SessionDetail[];
};

function HistoryTable({ historyList }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-cyan-500/20 p-4 overflow-x-auto">
      <Table className="text-white">
        <TableCaption className="text-cyan-300">
          Previous Consultation Reports
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-white/10">
            <TableHead className="text-cyan-400">AI Medical Specialist</TableHead>
            <TableHead className="text-cyan-400">Description</TableHead>
            <TableHead className="text-cyan-400">Date</TableHead>
            <TableHead className="text-cyan-400 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList.map((record, index) => (
            <TableRow
              key={record.id || index}
              className="hover:bg-white/10 transition-colors duration-200"
            >
              <TableCell className="font-medium text-white">
                {record.selectedDoctor?.specialist}
              </TableCell>
              <TableCell className="text-white">
                {record.notes && typeof record.notes === "object"
                  ? JSON.stringify(record.notes)
                  : record.notes}
              </TableCell>
              <TableCell className="text-white">
                {moment(new Date(record.createdOn)).fromNow()}
              </TableCell>
              <TableCell className="text-right">
                <ViewReportDialog record={record} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;
