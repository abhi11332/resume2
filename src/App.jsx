import { motion } from "motion/react"
import ResumeFile from "./component/ResumeFile"
function App() {
  

  return (
    <>
    <motion.h1 className="flex text-blue-400 text-center items-center justify-center font-bold text-2xl mt-4" initial={{
      scale:0}} animate={{scale:1}} transition={{duration:1}}>
      Resume Builder
      </motion.h1>
      <ResumeFile/>
    </>
  )
}

export default App
