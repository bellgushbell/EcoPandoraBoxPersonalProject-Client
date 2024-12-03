import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import Swal from "sweetalert2";
import axios from "axios";
import useDonationStore from "../../stores/useDonationStore"; // ดึง Zustand store

const API = import.meta.env.VITE_API;

function Box3D({ campaignImageUrl }) {
    const meshRef = useRef();
    const lidRef = useRef();
    const [isOpened, setIsOpened] = useState(false);

    // โหลด texture ของกล่อง
    const texture = new THREE.TextureLoader().load(campaignImageUrl);

    // สร้าง VideoTexture สำหรับฝาของกล่อง
    useEffect(() => {
        const video = document.createElement("video");
        video.src = "/public/assets/bg-line-box.mp4"; // ใส่ path ของไฟล์วิดีโอ
        video.loop = true;
        video.muted = true;
        video.play();

        const videoTexture = new THREE.VideoTexture(video);

        // ตั้งค่าให้ฝาของกล่องใช้ VideoTexture
        if (lidRef.current) {
            lidRef.current.material.map = videoTexture;
            lidRef.current.material.needsUpdate = true;
        }
    }, []);

    // กำหนดวัสดุสำหรับกล่อง
    const materials = [
        new THREE.MeshStandardMaterial({ map: texture }), // วัสดุด้านข้าง
        new THREE.MeshStandardMaterial({ color: "black" }), // ด้านบนสีดำ
    ];

    // สร้าง Geometry ของกล่อง
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // ตั้งกลุ่มเพื่อแยกวัสดุระหว่างด้านบนและด้านข้าง
    const assignGroups = () => {
        geometry.groups = [];
        for (let i = 0; i < geometry.index.count / 6; i++) {
            const groupMaterialIndex = i === 2 ? 1 : 0; // ด้านบนใช้วัสดุ index 1 (สีดำ)
            geometry.addGroup(i * 6, 6, groupMaterialIndex);
        }
    };
    assignGroups();

    // หมุนกล่องเล็กน้อยเมื่อไม่ได้เปิด
    useFrame(() => {
        if (meshRef.current && lidRef.current && !isOpened) {
            meshRef.current.rotation.y += 0.01; // หมุนกล่อง
            lidRef.current.rotation.y += 0.01; // หมุนฝา
        }
    });

    const handleOpen = () => {
        if (!isOpened) {
            gsap.to(meshRef.current.position, {
                y: "+=0.2",
                duration: 0.1,
                yoyo: true,
                repeat: 3,
            });

            // เปิดฝา (เลื่อนขึ้นและหมุนออก)
            gsap.to(lidRef.current.position, {
                y: 1.5,
                z: 1,
                duration: 1.2,
            });
            gsap.to(lidRef.current.rotation, {
                x: -Math.PI / 3,
                duration: 1.2,
                delay: 0.3,
                onComplete: () => {
                    setIsOpened(true);
                    Swal.fire({
                        title: "Custom width, padding, color, background.",
                        width: 600,
                        padding: "3em",
                        color: "#716add",
                        background: "#fff url(/images/trees.png)",
                        imageUrl: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif", // URL ของไฟล์ GIF
                        imageAlt: "GIF not loaded",
                        confirmButtonText: "Continue",
                        willOpen: () => {
                            // เพิ่ม CSS แบบกำหนดเองให้กับ Swal
                            const swalContainer = Swal.getPopup().parentNode;

                            // กำหนด background-image หลายตำแหน่ง
                            swalContainer.style.backgroundImage = `
            url("/public/assets/celebrate3.gif"),
            url("/public/assets/celebrate3.gif"),
            url("/public/assets/celebrate4.gif"),
            url("/public/assets/celebrate1.gif")
        `;
                            swalContainer.style.backgroundPosition = "left top, right top, left bottom, right bottom";
                            swalContainer.style.backgroundRepeat = "no-repeat, no-repeat, no-repeat, no-repeat";
                            swalContainer.style.backgroundSize = "300px 300px, 300px 300px, 300px 300px, 300px 300px";
                        },
                    });



                },
            });
        }
    };

    return (
        <group>
            {/* ตัวกล่อง */}
            <mesh ref={meshRef} position={[0, 0, 0]} onClick={handleOpen} geometry={geometry} material={materials} />

            {/* ฝาของกล่อง */}
            <mesh ref={lidRef} position={[0, 0.6, 0]}>
                <boxGeometry args={[1.1, 0.2, 1.1]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </group>
    );
}

export default function SingleBox3D() {
    const campaignId = useDonationStore((state) => state.campaignId); // ดึง campaignId จาก Zustand
    const [campaignImageUrl, setCampaignImageUrl] = useState("");

    useEffect(() => {
        const fetchCampaignImage = async () => {
            try {
                const response = await axios.get(`${API}/campaign/getlist`);
                const campaign = response.data.campaign.find((item) => item.id === campaignId);
                if (campaign) {
                    setCampaignImageUrl(campaign.image);
                }
            } catch (error) {
                console.error("Error fetching campaign image:", error);
            }
        };

        fetchCampaignImage();
    }, [campaignId]);

    if (!campaignImageUrl) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />
                <Box3D campaignImageUrl={campaignImageUrl} />
            </Canvas>
        </div>
    );
}
