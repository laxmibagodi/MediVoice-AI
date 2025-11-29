
// "use client";

// import { motion } from "motion/react";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { FeatureBentoGrid } from "./components/FeatureBentoGrid";
// // import FeatureBentoGrid from "./components/FeatureBentoGrid";

// export default function Home() {
//   return (
//     <div className="relative my-10 flex flex-col items-center justify-center">
//       <Navbar />

//       {/* Page Borders */}
//       <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80" />
//       <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80" />
//       <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80" />

//       {/* HERO SECTION */}
//       <div className="px-4 py-10 md:py-20">
//         <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
//           {"Revolutionize Patient Care with AI Voice Agents"
//             .split(" ")
//             .map((word, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                 animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
//                 className="mr-2 inline-block"
//               >
//                 {word}
//               </motion.span>
//             ))}
//         </h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3, delay: 0.8 }}
//           className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
//         >
//           Provide intelligent AI-powered medical support, multilingual reporting,
//           specialist suggestions, automated consultation flow, and seamless patient interaction.
//         </motion.p>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3, delay: 1 }}
//           className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
//         >
//           <Link href="/dashboard">
//             <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//               Get Started
//             </button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* NEW FEATURE GRID SECTION */}
//       <FeatureBentoGrid />
//     </div>
//   );
// }

// const Navbar = () => {
//   const { user } = useUser();
//   return (
//     <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
//       <div className="flex items-center gap-2">
//         <div className="size-7 rounded-full bg-gradient-to-br from-blue-500 to-teal-500" />
//         <h1 className="text-base font-bold md:text-2xl">MediVoice AI</h1>
//       </div>

//       {!user ? (
//         <Link href="/sign-in">
//           <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//             Login
//           </button>
//         </Link>
//       ) : (
//         <div className="flex gap-5 items-center">
//           <UserButton />
//           <Link href="/dashboard">
//             <Button>Dashboard</Button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };
"use client";
import { IconStethoscope } from "@tabler/icons-react";
import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureBentoGrid } from "./components/FeatureBentoGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-200 overflow-x-hidden">

      <Navbar />

      {/* Page Borders */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-white/20" />
      <div className="absolute inset-y-0 right-0 h-full w-px bg-white/20" />
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-white/20" />

      {/* HERO SECTION */}
      <div className="px-4 py-16 md:py-28 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-40xl font-bold md:text-400xl lg:text-8xl text-gradient-to-r from-cyan-400 to-blue-500">
           
          {" 🩺 Revolutionize Patient Care with AI Voice Agents"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg text-slate-300"
        >
          Provide intelligent AI-powered medical support, multilingual reporting,
          specialist suggestions, automated consultation flow, and seamless patient interaction.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <button className="w-60 transform rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg hover:scale-[1.03] hover:shadow-cyan-500/40 transition-all duration-300">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>

      {/* FEATURE GRID SECTION */}
      <div className="w-full px-6 md:px-12 py-16">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
          <FeatureBentoGrid />
        </div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex w-full items-center justify-between backdrop-blur-md bg-white/10 dark:bg-slate-900/40 border border-white/20 rounded-2xl px-4 py-4 shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-md" />
        <h1 className="text-lg md:text-2xl font-bold text-white">MediVoice AI</h1>
      </div>

      {!user ? (
        <Link href="/sign-in">
          <button className="w-24 md:w-32 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium shadow-md hover:scale-[1.03] transition-transform px-6 py-2">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex gap-4 items-center">
          <UserButton />
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white border-none hover:opacity-90">
              Dashboard
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

