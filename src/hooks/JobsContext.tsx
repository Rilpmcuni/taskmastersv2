// "use client"
// import {
//     createContext,
//     useContext,
//     useEffect,
//     useState,
//     ReactNode,
// } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// interface Job {
//     id: string;
//     title: string;
//     // Agrega otras propiedades que tenga tu objeto Job si las tienes definidas
// }

// const JobsContext = createContext<Job[]>([]);

// interface JobsProviderProps {
//     children: ReactNode;
// }

// export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
//     const [Jobs, setJobs] = useState<Job[] | null>(null); // Tipo explícito para Jobs

//     const supabase = createClientComponentClient();

//     useEffect(() => {
//         async function getJobs() {
//             const { data } = await supabase.from("empleos").select();
//             setJobs(data);
//         }

//         getJobs();
//     }, []);

//     return <JobsContext.Provider value={jobs}>{children}</JobsContext.Provider>;
// };

// export const useJobs = (): Job[] => useContext(JobsContext);
