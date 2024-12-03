import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei"; // เพิ่ม Text สำหรับแสดงข้อความ

function Box({ position, imageUrl, isSelected, onClick, name }) {
    const meshRef = useRef();

    // เพิ่มการหมุนกล่องถ้าไม่ได้ถูกเลือก
    useFrame(() => {
        if (meshRef.current && !isSelected) {
            meshRef.current.rotation.y += 0.01; // หมุนตามแกน Y
        }
    });

    // โหลดพื้นผิวภาพ
    const texture = new THREE.TextureLoader().load(imageUrl);
    texture.wrapS = THREE.ClampToEdgeWrapping; // กำหนดการขยายขอบภาพ
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return (
        <group position={position}>
            {/* กล่อง */}
            <mesh
                ref={meshRef}
                onClick={onClick}
                scale={isSelected ? [3, 3, 3] : [1, 1, 1]} // ทำให้บางลงเมื่อเลือก
                rotation={isSelected ? [0, 0, 0] : undefined} // หมุนให้คงที่เมื่อเลือก
            >
                {/* รูปแบบกล่อง */}
                <boxGeometry args={[1, 1, 1]} />
                {/* ใส่พื้นผิวภาพ */}
                <meshStandardMaterial
                    map={texture}
                    attach="material"
                    side={THREE.DoubleSide} // เพิ่มแสดงผลทั้งสองด้าน
                />
            </mesh>

            {/* เพิ่มข้อความใต้กล่อง */}
            <Text
                color="white"
                fontSize={0.2}
                position={[0, -1, 0]}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="black"
            >
                {name}
            </Text>

        </group>
    );
}

export default Box;
