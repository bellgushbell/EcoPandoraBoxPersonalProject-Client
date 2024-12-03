import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BoxGallery from "./BoxGallery";

function CameraZoomIn() {
    const { camera } = useThree();

    useEffect(() => {
        // ตั้งค่าให้กล้องซูมเข้าหาวัตถุ (ลดค่า z)
        camera.position.set(0, 0, 15); // เริ่มต้น
        const zoomInterval = setInterval(() => {
            if (camera.position.z > 4) {
                camera.position.z -= 0.2; // ลดตำแหน่ง z เรื่อยๆ
            } else {
                clearInterval(zoomInterval); // หยุดเมื่อถึงตำแหน่งที่ต้องการ
            }
        }, 30);

        return () => clearInterval(zoomInterval); // ล้างการทำงานเมื่อ component ถูกถอด
    }, [camera]);

    return null; // ไม่ต้อง render อะไร
}

function HomepageSlide() {
    return (
        <div
            className="w-full h-[500px] bg-cover bg-center relative"
            style={{
                backgroundImage: `url("https://images.pexels.com/photos/8805584/pexels-photo-8805584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
            }}
        >
            {/* ข้อความเชิญชวนบริจาค */}
            <div className="absolute top-5 left-0 w-full text-center">
                <h1 className="text-4xl font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
                    ร่วมบริจาคเพื่อสร้างการเปลี่ยนแปลง
                </h1>
                <p className="text-lg mt-3 font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
                    พร้อมลุ้นรับของรางวัลสุดพิเศษ! ทุกการบริจาคมีโอกาสได้รับของขวัญตอบแทนจากใจเรา
                </p>
            </div>


            {/* Canvas สำหรับ Gallery */}
            <div className="absolute inset-0">
                <Canvas style={{ background: "transparent" }}>
                    {/* เพิ่มฟังก์ชันซูม */}
                    <CameraZoomIn />
                    {/* กล้องสามารถหมุนและซูมได้ */}
                    <OrbitControls />
                    {/* ไฟ */}
                    <ambientLight intensity={4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    {/* Gallery */}
                    <BoxGallery />
                </Canvas>
            </div>

            {/* ปุ่มบริจาค */}
            <div className="absolute bottom-5 left-0 w-full text-center">
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                    บริจาคเลย
                </button>
            </div>
        </div>
    );
}




export default HomepageSlide;
