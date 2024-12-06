import SidebarChatAdmin from "./SidebarChatAdmin";
import ChatAdmin from "./ChatAdmin";

/**
 * AllChatAdmin: คอมโพเนนต์หลักที่รวม Sidebar และหน้าจอแชท
 * - แสดงรายการผู้ใช้ใน Sidebar
 * - แสดงเนื้อหาแชทในหน้าจอหลัก
 */
export default function AllChatAdmin({ chatBoxList, setChatOpen }) {
    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center"
            style={{ overflow: "hidden" }} // ป้องกันเนื้อหาดันออก
        >
            <div
                className="bg-white w-3/4 rounded-lg shadow-lg flex flex-col"
                style={{ maxHeight: "90vh" }} // กำหนดความสูงสูงสุดของเนื้อหา
            >
                <button
                    onClick={() => setChatOpen(false)}
                    className="text-gray-600 p-2 hover:bg-gray-100 transition rounded-full self-end"
                >
                    Close
                </button>

                <div className="flex flex-1 overflow-hidden">
                    <SidebarChatAdmin chatBoxList={chatBoxList} />
                    <ChatAdmin />
                </div>
            </div>
        </div>
    );

}











// import SidebarChatAdmin from "./SidebarChatAdmin";
// import ChatAdmin from "./ChatAdmin";

// /**
//  * AllChatAdmin: คอมโพเนนต์หลักที่รวม Sidebar และหน้าจอแชท
//  * - แสดงรายการผู้ใช้ใน Sidebar
//  * - แสดงเนื้อหาแชทในหน้าจอหลัก
//  */
// export default function AllChatAdmin({ chatBoxList, setChatOpen }) {
//     return (
//         <div
//             className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center"
//             style={{ overflow: "hidden" }} // ป้องกันเนื้อหาดันออก
//         >
//             <div
//                 className="bg-white w-3/4 rounded-lg shadow-lg flex flex-col"
//                 style={{ maxHeight: "90vh" }} // กำหนดความสูงสูงสุดของเนื้อหา
//             >
//                 <button
//                     onClick={() => setChatOpen(false)}
//                     className="text-gray-600 p-2 hover:bg-gray-100 transition rounded-full self-end"
//                 >
//                     Close
//                 </button>

//                 <div className="flex flex-1 overflow-hidden">
//                     <SidebarChatAdmin chatBoxList={chatBoxList} />
//                     <ChatAdmin />
//                 </div>
//             </div>
//         </div>
//     );

// }











