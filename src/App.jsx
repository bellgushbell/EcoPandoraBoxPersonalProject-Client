import './index.css'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"  // ปรับตำแหน่งที่ต้องการ เช่น "top-right", "bottom-left"
        autoClose={2000}      // ตั้งเวลาอัตโนมัติ (ms)
        hideProgressBar={false} // แสดง/ซ่อน progress bar
        newestOnTop={false}   // Toast ใหม่อยู่ด้านบนหรือไม่
        closeOnClick          // ปิด Toast เมื่อคลิก
        rtl={false}           // รองรับการจัดข้อความจากขวาไปซ้าย
        pauseOnFocusLoss      // หยุดอัตโนมัติเมื่อเสียโฟกัส
        draggable             // รองรับการลาก Toast ไปยังตำแหน่งอื่น
        pauseOnHover          // หยุดอัตโนมัติเมื่อเลื่อนเมาส์ไปที่ Toast
        theme="light"         // ธีม เช่น "light", "dark", หรือ "colored"
      />
    </>
  )
}

export default App
