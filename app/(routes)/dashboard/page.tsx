// import React from 'react'
// import HistoryList from './_components/HistoryList'
// import DoctorsAgentList from './_components/DoctorsAgentList'
// import { Button } from '@/components/ui/button'
// import AddNewSessionDialog from './_components/AddNewSessionDialog'

// function Dashboard() {
    

//     return (
//         <div>
//             <div className='flex justify-between items-center'>
//             <h2 className='font-bold text-2xl'>My Dashboard</h2>
//             {/* <Button>+ Consult with Doctor</Button> */}
//             <AddNewSessionDialog/>
//             </div>
//             <HistoryList />

//             <DoctorsAgentList/>
//         </div>
//     )
// }

// export default Dashboard
import React from "react";
import HistoryList from "./_components/HistoryList";
import DoctorsAgentList from "./_components/DoctorsAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c23] via-[#1a1a3d] to-[#0c0c23] text-white font-sans px-6 md:px-12 lg:px-24 py-10 flex flex-col gap-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 drop-shadow-lg">
          My Dashboard
        </h2>
        <AddNewSessionDialog />
      </div>

      {/* History Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-300 p-6">
        <h3 className="text-2xl font-semibold mb-4 text-cyan-400 drop-shadow-md">
          Consultation History
        </h3>
        <HistoryList />
      </div>

      {/* Doctors / AI Agents Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-400/40 transition-all duration-300 p-6">
        <h3 className="text-2xl font-semibold mb-4 text-indigo-400 drop-shadow-md">
          Doctors & AI Agents
        </h3>
        <DoctorsAgentList />
      </div>
    </div>
  );
}

export default Dashboard;
